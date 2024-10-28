package com.example.be.dto.request;

import com.example.be.model.Role;
import org.hibernate.validator.constraints.Length;

import javax.persistence.Column;
import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.Period;
import java.util.HashSet;
import java.util.Set;

public class RegisterForm {
    @NotBlank(message = "Không được bỏ trống")
    @Pattern(regexp = "^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+)$",message = "Tên phải nhập đúng định dạng. VD: Nguyễn Văn A")
    @Length(min = 5,max = 30,message = "Trường này ít nhất 5 ký tự và nhiều nhất 30 ký tự")
    private String name;
    @NotNull(message = "Không được bỏ trống")
    private boolean gender;
    @NotBlank(message = "Không được bỏ trống")
    private String dateOfBirth;
    @NotBlank(message = "Không được bỏ trống")
    private String address;
    @NotBlank(message = "Không được bỏ trống")
    @Email(message = "Vui lòng nhập đúng định dạng Email")
    private String email;
    @NotBlank(message = "Không được bỏ trống")
    @Pattern(regexp = "^(0?)(3[2-9]|5[6|8|9]|7[0|6-9]|8[0-6|8|9]|9[0-4|6-9])[0-9]{7}$",message = "Nhập đúng định dạng SĐT. VD: 0905.223.XXX (X là chữ số)")
    private String phoneNumber;
    @NotBlank(message = "Không được bỏ trống")
    @Pattern(regexp = "^[a-zA-Z0-9\\+]*$",message = "Tài khoản không được chứa kí tự đặc biệt")
    @Length(min = 5,max = 30,message = "Trường này ít nhất 5 ký tự và nhiều nhất 30 ký tự")
    private String username;
    @NotBlank(message = "Không được bỏ trống")
    @Length(min = 5,max = 30,message = "Trường này ít nhất 5 ký tự và nhiều nhất 30 ký tự")
    private String password;
    @NotBlank(message = "Không được bỏ trống")
    @Length(min = 5,max = 30,message = "Trường này ít nhất 5 ký tự và nhiều nhất 30 ký tự")
    private String confirmPassword;
    private String avatar;
    Set<String> roles = new HashSet<>();

    public RegisterForm() {
    }

    public int getAge() {
        LocalDate currentDate = LocalDate.now();
        LocalDate birthDate = LocalDate.parse(dateOfBirth);
        return Period.between(birthDate, currentDate).getYears();
    }
    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean getGender() {
        return gender;
    }

    public void setGender(boolean gender) {
        this.gender = gender;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
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

    public String getConfirmPassword() {
        return confirmPassword;
    }

    public void setConfirmPassword(String confirmPassword) {
        this.confirmPassword = confirmPassword;
    }

    public Set<String> getRoles() {
        return roles;
    }

    public void setRoles(Set<String> roles) {
        this.roles = roles;
    }
}
