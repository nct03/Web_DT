package com.example.be.security.OAuth2;

import java.util.Map;

public class FacebookOAuth2 extends OAuth2UserInfo{
    public FacebookOAuth2(Map<String, Object> attributes) {
        super(attributes);
    }
    @Override
    public String getId() {return (String) attributes.get("id");}
    @Override
    public String getName() {return (String) attributes.get("name");}
    @Override
    public String getEmail() {
        return (String) attributes.get("email");
    }
    @Override
    public String getAvatar() {
        if(attributes.containsKey("picture")) {
            Map<String, Object> pictureObj = (Map<String, Object>) attributes.get("picture");
            if(pictureObj.containsKey("data")) {
                Map<String, Object>  dataObj = (Map<String, Object>) pictureObj.get("data");
                if(dataObj.containsKey("url")) {
                    return (String) dataObj.get("url");
                }
            }
        }
        return "https://firebasestorage.googleapis.com/v0/b/quannla.appspot.com/o/files%2Fanh-avatar-trang-fb-mac-dinh.jpg?alt=media&token=17d3e562-3bb4-4860-87c7-5454d56d2df4";
    }
}
