package com.example.be.service.user;

import com.example.be.model.User;
import com.example.be.security.OAuth2.FacebookOAuth2;
import com.example.be.security.OAuth2.OAuth2UserInfo;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.List;
import java.util.Optional;

public interface IUserService {
    List<User> getAllUser();
    int deleteUserById(int id);
    Optional<User> findByIdUser(int id);

    Optional<User> findByUsername(String name);
    Boolean existsByUsername(String username);
    Boolean existsByEmail(String email);
    Boolean checkIfValidOldPassword(User user, String oldPassword);

    void changeUserPassword(User user,String newPassword);

    User findByEmailUser(String email);

    void updateOtp(User user);
    void save(User user);
    Integer getTotalCodeAmount();

    void updateUser(User user);
    OAuth2User processOAuthPostLogin(OAuth2UserRequest userRequest, OAuth2User oAuth2User);

    User registerNewUserAfterOAuthLoginSuccess(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo);

    User updateExistUserAfterOAuthLoginSuccess(OAuth2UserRequest oAuth2UserRequest, User user, OAuth2UserInfo oAuth2UserInfo);

}