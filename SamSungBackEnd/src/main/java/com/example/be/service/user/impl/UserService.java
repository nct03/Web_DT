package com.example.be.service.user.impl;

import com.example.be.exception.OAuth2AuthenticationProcessingException;
import com.example.be.model.OAuthProvider;
import com.example.be.model.Role;
import com.example.be.model.RoleName;
import com.example.be.model.User;
import com.example.be.repository.user.IRoleRepository;
import com.example.be.repository.user.IUserRepository;
import com.example.be.security.OAuth2.FacebookOAuth2;
import com.example.be.security.OAuth2.OAuth2UserInfo;
import com.example.be.security.UserPrinciple;
import com.example.be.service.OAuth2.impl.OAuth2UserInfoFactory;
import com.example.be.service.role.IRoleService;
import com.example.be.service.user.IUserService;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.util.*;

@Service
public class UserService implements IUserService {
    @Autowired
    private IUserRepository iUserRepository;
    @Autowired
    private IRoleRepository iRoleRepository;

    @Override
    public List<User> getAllUser() {
        return iUserRepository.findAll();
    }

    @Override
    public int deleteUserById(int id) {
        return iUserRepository.deleteUserById(id);
    }

    @Override
    public Optional<User> findByIdUser(int id) {
        return iUserRepository.findById(id);
    }

    @Override
    public Optional<User> findByUsername(String name) {
        return iUserRepository.findByUserName(name);
    }


    @Override
    public Boolean existsByUsername(String username) {
        return iUserRepository.existsByUserName(username);
    }

    @Override
    public Boolean existsByEmail(String email) {
        return iUserRepository.existsByEmail(email);
    }

    @Override
    public Boolean checkIfValidOldPassword(User user, String oldPassword) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        return passwordEncoder.matches(oldPassword, user.getPassword());
    }

    @Override
    public void changeUserPassword(User user, String newPassword) {
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        user.setPassword(passwordEncoder.encode(newPassword));
        iUserRepository.updatePassword(user.getPassword(), user.getId());
    }

    @Override
    public User findByEmailUser(String email) {
        return iUserRepository.findByEmail(email);
    }

    @Override
    public void updateOtp(User user) {
        iUserRepository.updateOtp(user.getExpiryTime(), user.getOtpSecret(), user.getEmail());
    }

    @Override
    public void save(User user) {
        iUserRepository.save(user);
    }

    @Override
    public Integer getTotalCodeAmount() {
        return iUserRepository.getTotalCodeAmount();
    }

    @Override
    public void updateUser(User user) {
        iUserRepository.UpdateCustomer(user.getName(),
                user.getGender(),
                user.getDateOfBirth(),
                user.getAddress(),
                user.getEmail(),
                user.getPhoneNumber(),
                user.getAvatar(),
                user.getId());
    }

    @Override
    public OAuth2User processOAuthPostLogin(OAuth2UserRequest userRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(userRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if (StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }
        Optional<User> userOptional = Optional.ofNullable(iUserRepository.findByEmail(oAuth2UserInfo.getEmail()));
        User user;
        if (userOptional.isPresent()) {
            user = userOptional.get();
//            if (!user.getoAuthProvider().equals(OAuthProvider.valueOf(userRequest.getClientRegistration().getRegistrationId()))) {
//                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
//                        user.getoAuthProvider() + " account. Please use your " + user.getoAuthProvider() +
//                        " account to login.");
//            }
            user = updateExistUserAfterOAuthLoginSuccess(userRequest, user, oAuth2UserInfo);
        } else {
            user = registerNewUserAfterOAuthLoginSuccess(userRequest, oAuth2UserInfo);
        }
        return UserPrinciple.build(user, oAuth2User.getAttributes());
    }

    @Override
    public User registerNewUserAfterOAuthLoginSuccess(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();
        int id = iUserRepository.getTotalCodeAmount() + 1000;
        user.setCode("KH-" + id);
        user.setoAuthProvider(OAuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setName(oAuth2UserInfo.getName());
        user.setUserName(oAuth2UserInfo.getEmail());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setAvatar(oAuth2UserInfo.getAvatar());
        Set<Role> roles = new HashSet<>();
        Role adminRole = iRoleRepository.findByName(RoleName.ROLE_USER).orElseThrow(() -> new RuntimeException("Không tìm thấy quyền"));
        roles.add(adminRole);
        user.setRoles(roles);
        return iUserRepository.save(user);
    }

    @Override
    public User updateExistUserAfterOAuthLoginSuccess(OAuth2UserRequest oAuth2UserRequest, User user, OAuth2UserInfo oAuth2UserInfo) {
        user.setName(oAuth2UserInfo.getName());
        user.setUserName(oAuth2UserInfo.getEmail());
        user.setAvatar(oAuth2UserInfo.getAvatar());
        user.setoAuthProvider(OAuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        return iUserRepository.save(user);
    }
}