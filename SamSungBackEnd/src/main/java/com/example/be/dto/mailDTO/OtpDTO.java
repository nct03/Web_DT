package com.example.be.dto.mailDTO;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;
import java.util.Hashtable;
import java.util.Map;

public class OtpDTO {
    private String email;
    @NotBlank(message = "Không được để trống")
    @Pattern(regexp = "^\\d{6}$",message = "Vui lòng nhập đúng định dạng OTP VD:XXXXXX (X là chữ số)")
    private String code;

    public OtpDTO() {
        // TODO document why this constructor is empty
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }
}