package com.example.be.dto.request;

import org.hibernate.validator.constraints.Length;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

public class SignInForm {
    @NotBlank(message = "Không được bỏ trống")
    @Length(min = 5,max = 20, message = "Tên đăng nhập ít nhất 5 ký tự và nhiều nhất 20 ký tự")
    @Pattern(regexp = "^[a-zA-Z0-9]*$",message = "Tên đăng nhập không được chứa ký tự đặc biệt")
    private String username;
    @Length(min = 5,max = 20, message = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự")
    @NotBlank(message = "Không được bỏ trống")
    private String password;

    public SignInForm() {
    }

    public SignInForm(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}