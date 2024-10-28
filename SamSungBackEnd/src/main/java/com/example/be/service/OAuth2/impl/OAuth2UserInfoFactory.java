package com.example.be.service.OAuth2.impl;

import com.example.be.exception.OAuth2AuthenticationProcessingException;
import com.example.be.model.OAuthProvider;
import com.example.be.security.OAuth2.FacebookOAuth2;
import com.example.be.security.OAuth2.GoogleOAuth2UserInfo;
import com.example.be.security.OAuth2.OAuth2UserInfo;

import java.util.Map;

public class OAuth2UserInfoFactory {

    public static OAuth2UserInfo getOAuth2UserInfo(String registrationId, Map<String, Object> attributes) {
        if(registrationId.equalsIgnoreCase(OAuthProvider.facebook.toString())) {
            return new FacebookOAuth2(attributes);
        }else if (registrationId.equalsIgnoreCase(OAuthProvider.google.toString())) {
            return new GoogleOAuth2UserInfo(attributes);
        } else  {
            throw new OAuth2AuthenticationProcessingException("Sorry! Login with " + registrationId + " is not supported yet.");
        }
    }
}