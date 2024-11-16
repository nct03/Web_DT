package com.example.be.dto.mailDTO;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

public class MailDTO {
    @NotBlank(message = "Không được để trống")
    @Email(message = "Vui lòng nhập đúng định dạng Email VD: abc123@codegym.com")
    private String email;

    public MailDTO() {
        // TODO document why this constructor is empty
    }


    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}