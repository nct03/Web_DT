package com.example.be.dto.customer;

import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Pattern;
import java.time.LocalDate;
import java.time.Period;

public class CustomerUpdateDTO {
    private Integer id;
    @NotBlank(message = "Không được bỏ trống")
    @Pattern(regexp = "^([a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\\s]+)$",message = "Tên phải nhập đúng định dạng. VD: Nguyễn Văn A")
    @Length(min = 5,max = 30,message = "Trường này ít nhất 5 ký tự và nhiều nhất 30 ký tự")
    private String name;
    @NotNull(message = "Không được bỏ trống")
    private Boolean gender;
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
//    @Pattern(regexp = "^.{0,}(.png|.jpg|.jpeg)[?](alt=media&token=).{0,}$",message = "Sai định dạng ảnh, phải có dạng đuôi .jpg, .jpeg, .png")
    private String avatar;

    public CustomerUpdateDTO() {
    }
    public int getAge() {
        LocalDate currentDate = LocalDate.now();
        LocalDate birthDate = LocalDate.parse(dateOfBirth);
        return Period.between(birthDate, currentDate).getYears();
    }
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Boolean getGender() {
        return gender;
    }

    public void setGender(Boolean gender) {
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
    public String getAvatar() {
        return avatar;
    }
    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
