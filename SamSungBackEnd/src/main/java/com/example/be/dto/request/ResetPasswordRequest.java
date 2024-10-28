package com.example.be.dto.request;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotBlank;

public class ResetPasswordRequest {
    @NotBlank(message = "Không được bỏ trống")
    @Length(min = 5, max = 20, message = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự")
    private String newPassword;
    @Length(min = 5, max = 20, message = "Mật khẩu ít nhất 5 ký tự và nhiều nhất 20 ký tự")
    @NotBlank(message = "Không được bỏ trống")
    private String confirmPassword;
    private String email;

    public ResetPasswordRequest() {
        // TODO document why this constructor is empty
    }

    public String getNewPassword() {
        return newPassword;
    }

    public void setNewPassword(String newPassword) {
        this.newPassword = newPassword;
    }

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}