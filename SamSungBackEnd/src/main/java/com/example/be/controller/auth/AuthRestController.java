package com.example.be.controller.auth;
import com.example.be.dto.mailDTO.MailDTO;
import com.example.be.dto.mailDTO.OtpDTO;
import com.example.be.dto.request.ChangePasswordRequest;
import com.example.be.dto.request.RegisterForm;
import com.example.be.dto.request.ResetPasswordRequest;
import com.example.be.dto.request.SignInForm;
import com.example.be.dto.response.JwtResponse;
import com.example.be.dto.response.ResponseMessage;
import com.example.be.model.OAuthProvider;
import com.example.be.model.Role;
import com.example.be.model.RoleName;
import com.example.be.model.User;
import com.example.be.security.JwtTokenProvider;
import com.example.be.security.UserPrinciple;
import com.example.be.service.mail.IEmailService;
import com.example.be.service.role.IRoleService;
import com.example.be.service.user.IUserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@CrossOrigin("*")
public class AuthRestController {

    @Autowired
    private IUserService iUserService;
    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private IEmailService iEmailService;
    @Autowired
    PasswordEncoder passwordEncoder;
    @Autowired
    IRoleService iRoleService;
    @PostMapping("/register")
    public ResponseEntity<?>register(@Validated @RequestBody RegisterForm registerForm,BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        int age = registerForm.getAge();
        if (age < 15) {
            return new ResponseEntity<>(new ResponseMessage("Người dùng đăng ký tài khoản phải từ 15 tuổi trở lên"),HttpStatus.BAD_REQUEST);
        }
        if (Boolean.TRUE.equals(iUserService.existsByUsername(registerForm.getUsername()))) {
            return new ResponseEntity<>(new ResponseMessage("Tài khoản đã tồn tại"), HttpStatus.BAD_REQUEST);
        }
        if (Boolean.TRUE.equals(iUserService.existsByEmail(registerForm.getEmail()))) {
            return new ResponseEntity<>(new ResponseMessage("Email đã tồn tại"), HttpStatus.BAD_REQUEST);
        }
//        if(registerForm.getAvatar() == null || registerForm.getAvatar().trim().isEmpty()){
//            registerForm.setAvatar("https://i.pinimg.com/736x/c6/e5/65/c6e56503cfdd87da299f72dc416023d4.jpg");
//        }
        User user = new User(
                registerForm.getName(),
                registerForm.getAddress(),
                registerForm.getDateOfBirth(),
                registerForm.getEmail(),
                registerForm.getGender(),
                registerForm.getPhoneNumber(),
                registerForm.getUsername(),
                passwordEncoder.encode(registerForm.getPassword()));
        if (!registerForm.getPassword().equals(registerForm.getConfirmPassword())) {
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu xác nhận không trùng khớp"), HttpStatus.BAD_REQUEST);
        }
        Set<String> strRoles = registerForm.getRoles();
        Set<Role> roles = new HashSet<>();
        strRoles.forEach(role ->{
            switch (role){
                case "admin":
                    Role adminRole = iRoleService.findByName(RoleName.ROLE_ADMIN).orElseThrow( ()-> new RuntimeException("Không tìm thấy quyền"));
                    roles.add(adminRole);
                    break;
                default:
                    Role userRole = iRoleService.findByName(RoleName.ROLE_USER).orElseThrow( ()-> new RuntimeException("Không tìm thấy quyền"));
                    roles.add(userRole);
            }
        });
        user.setRoles(roles);
        int id = iUserService.getTotalCodeAmount() + 1000;
        user.setCode("KH-" + id);
        user.setoAuthProvider(OAuthProvider.local);
        user.setAvatar("https://firebasestorage.googleapis.com/v0/b/quannla.appspot.com/o/files%2Fanh-avatar-trang-fb-mac-dinh.jpg?alt=media&token=fae9b400-ca65-4568-9808-b5e18f1f3d65");
        iUserService.save(user);
        return new ResponseEntity<>(new ResponseMessage("Đăng ký thành công"),HttpStatus.CREATED);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@Validated @RequestBody SignInForm signInForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        } else if (Boolean.FALSE.equals(iUserService.existsByUsername(signInForm.getUsername()))) {
            return new ResponseEntity<>(new ResponseMessage("Tài khoản không tồn tại"), HttpStatus.BAD_REQUEST);
        } else {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(signInForm.getUsername(), signInForm.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtTokenProvider.createToken(authentication);
            UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
            return ResponseEntity.ok(new JwtResponse(token, userPrinciple.getUsername(), userPrinciple.getAvatar(), userPrinciple.getAuthorities(),userPrinciple.getName()));
        }
    }

    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(HttpServletRequest request, @Validated @RequestBody ChangePasswordRequest changePasswordRequest, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        final String requestTokenHeader = request.getHeader("Authorization");
        String username;
        String jwtToken;
        if (requestTokenHeader != null && requestTokenHeader.startsWith("Bearer ")) {
            jwtToken = requestTokenHeader.substring(7);
            try {
                username = jwtTokenProvider.getUserNameFromToken(jwtToken);
            } catch (ExpiredJwtException e) {
                throw new JwtException("Mã thông báo JWT đã hết hạn", e);
            }
        } else {
            return new ResponseEntity<>(new ResponseMessage("Mã JWT không chính xác"), HttpStatus.BAD_REQUEST);
        }
        User user = iUserService.findByUsername(username).orElseThrow(() -> new UsernameNotFoundException("Tài khoản không tồn tại"));
        if (Boolean.FALSE.equals(iUserService.checkIfValidOldPassword(user, changePasswordRequest.getOldPassword()))) {
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu hiện tại không đúng"), HttpStatus.BAD_REQUEST);
        }
        if (changePasswordRequest.getNewPassword().equals(changePasswordRequest.getOldPassword())) {
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu mới không được trùng với mật khẩu cũ"), HttpStatus.BAD_REQUEST);
        }
        if (!changePasswordRequest.getNewPassword().equals(changePasswordRequest.getConfirmPassword())) {
            return new ResponseEntity<>(new ResponseMessage("Mật khẩu xác nhận không trùng khớp"), HttpStatus.BAD_REQUEST);
        }
        iUserService.changeUserPassword(user, changePasswordRequest.getNewPassword());
        return ResponseEntity.ok(new ResponseMessage("Đổi mật khẩu thành công!"));
    }

    @PutMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@Validated @RequestBody ResetPasswordRequest resetPasswordRequest, BindingResult bindingResult) {
        if (!bindingResult.hasErrors()) {
            User user = iUserService.findByEmailUser(resetPasswordRequest.getEmail());
            if(user != null){
                if (!resetPasswordRequest.getNewPassword().equals(resetPasswordRequest.getConfirmPassword())) {
                    return new ResponseEntity<>(new ResponseMessage("Mật khẩu xác nhận không trùng khớp"), HttpStatus.BAD_REQUEST);
                } else {
                    iUserService.changeUserPassword(user, resetPasswordRequest.getNewPassword());
                    return ResponseEntity.ok(new ResponseMessage("Đổi mật khẩu thành công!"));
                }
            }else {
                return new ResponseEntity<>(new ResponseMessage("Không tìm thấy email"), HttpStatus.BAD_REQUEST);
            }
        } else {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> processForgotPassword(@Validated @RequestBody MailDTO mailDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        User user = iUserService.findByEmailUser(mailDTO.getEmail());
        if (user == null) {
            return new ResponseEntity<>(new ResponseMessage("Không tìm thấy email"), HttpStatus.BAD_REQUEST);
        }
        String otp = iEmailService.generateOtp(user);
        iEmailService.sendResetPasswordEmail(mailDTO.getEmail(), otp);
        return new ResponseEntity<>(mailDTO.getEmail(), HttpStatus.OK);
    }
    @PutMapping("/check-otp")
    public ResponseEntity<?> confirmForgotPassword(@Validated @RequestBody OtpDTO employeeOtpDTO, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        if (iEmailService.validateOtp(employeeOtpDTO.getCode(), employeeOtpDTO.getEmail())) {
            return new ResponseEntity<>(new ResponseMessage("Xác thực mã OTP thành công"), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(new ResponseMessage("Mã OTP không chính xác"), HttpStatus.BAD_REQUEST);
        }
    }
}