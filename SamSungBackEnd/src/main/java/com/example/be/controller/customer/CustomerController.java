package com.example.be.controller.customer;

import com.example.be.dto.customer.CustomerDetailDTO;
import com.example.be.dto.customer.CustomerUpdateDTO;
import com.example.be.dto.response.ResponseMessage;
import com.example.be.dto.role.RoleDTO;
import com.example.be.model.Role;
import com.example.be.model.User;
import com.example.be.security.JwtAuthenticationFilter;
import com.example.be.security.JwtTokenProvider;
import com.example.be.service.user.IUserService;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.*;

@RestController
@RequestMapping("/customer")
@CrossOrigin("*")
public class CustomerController {
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private IUserService iUserService;
    @GetMapping("")
    public ResponseEntity<?> getAllUser(@RequestParam(required = false, defaultValue = "")String name) {
        List<User> users = iUserService.getAllUser();
        return new ResponseEntity<>(users, HttpStatus.OK);
    }
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteUserById(@PathVariable int id) {
        return new ResponseEntity<>(iUserService.deleteUserById(id), HttpStatus.OK);
    }
    @GetMapping("/detail")
    public ResponseEntity<?> detail(HttpServletRequest request) {
        String token = jwtAuthenticationFilter.getJwt(request);
        if(token!=null &&jwtTokenProvider.validateToken(token)){
            String username = jwtTokenProvider.getUserNameFromToken(token);
            if(Boolean.FALSE.equals(iUserService.existsByUsername(username))){
                return new ResponseEntity<>(new ResponseMessage("Tên người dùng không tồn tại")
                        , HttpStatus.BAD_REQUEST);
            }
            CustomerDetailDTO customerDetailDTO = new CustomerDetailDTO();
            Optional<User> user = iUserService.findByUsername(username);
            Set<RoleDTO> roleDTOSet = new HashSet<>();
            RoleDTO roleDTO;
            for (Role role : user.get().getRoles()) {
                roleDTO = new RoleDTO();
                BeanUtils.copyProperties(role,roleDTO);
                roleDTOSet.add(roleDTO);
            }
            customerDetailDTO.setRoleSet(roleDTOSet);
            BeanUtils.copyProperties(user.get(),customerDetailDTO);
            return new ResponseEntity<>(customerDetailDTO,HttpStatus.OK);
        }else {
            return new ResponseEntity<>(new ResponseMessage("JWT không tồn tại"),HttpStatus.BAD_REQUEST);
        }
    }
    @GetMapping("/detail/{id}")
    public ResponseEntity<?> getUserById(@PathVariable int id) {
        return new ResponseEntity<>(iUserService.findByIdUser(id), HttpStatus.OK);
    }
    @PatchMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable int id, @Validated @RequestBody CustomerUpdateDTO customerUpdateDTO, BindingResult bindingResult){
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
        int age = customerUpdateDTO.getAge();
        if (age < 15) {
            return new ResponseEntity<>(new ResponseMessage("Người dùng phải từ 15 tuổi trở lên"),HttpStatus.BAD_REQUEST);
        }
        User user = iUserService.findByIdUser(id).orElseThrow(() -> new UsernameNotFoundException("Tài khoản không tồn tại"));
        BeanUtils.copyProperties(customerUpdateDTO,user);
        iUserService.updateUser(user);
        return new ResponseEntity<>(new ResponseMessage("Chỉnh sửa thông tin khách hàng thành công"),HttpStatus.OK);
    }
    @PatchMapping("")
    public ResponseEntity<?> updateUser(HttpServletRequest request, @Validated @RequestBody CustomerUpdateDTO customerUpdateDTO, BindingResult bindingResult){
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
        int age = customerUpdateDTO.getAge();
        if (age < 15) {
            return new ResponseEntity<>(new ResponseMessage("Người dùng phải từ 15 tuổi trở lên"),HttpStatus.BAD_REQUEST);
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
        if ( !user.getEmail().equals(customerUpdateDTO.getEmail()) && Boolean.TRUE.equals(iUserService.existsByEmail(customerUpdateDTO.getEmail()))) {
            return new ResponseEntity<>(new ResponseMessage("Email đã tồn tại"), HttpStatus.BAD_REQUEST);
        }
        BeanUtils.copyProperties(customerUpdateDTO,user);
        iUserService.updateUser(user);
        return new ResponseEntity<>(new ResponseMessage("Chỉnh sửa thông tin khách hàng thành công"),HttpStatus.OK);
    }
}
