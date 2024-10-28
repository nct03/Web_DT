package com.example.be.dto.customer;

import com.example.be.dto.role.RoleDTO;
import com.example.be.model.Cart;
import com.example.be.model.OderProduct;
import com.example.be.model.Role;

import java.util.HashSet;
import java.util.Set;
import java.util.TreeSet;

public class CustomerDetailDTO {
    private Integer id;
    private String code;
    private String name;
    private Boolean gender;
    private String dateOfBirth;
    private String address;
    private String email;
    private String phoneNumber;
    private String userName;
    private String avatar;
    private Set<OderProduct> oderProducts = new TreeSet<>();
    private Set<Cart> cartSet = new TreeSet<>();
    private Set<RoleDTO> roleSet = new TreeSet<>();
    public CustomerDetailDTO() {
    }


    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
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

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public Set<OderProduct> getOderProducts() {
        return oderProducts;
    }

    public void setOderProducts(Set<OderProduct> oderProducts) {
        this.oderProducts = oderProducts;
    }

    public Set<Cart> getCartSet() {
        return cartSet;
    }

    public void setCartSet(Set<Cart> cartSet) {
        this.cartSet = cartSet;
    }

    public Set<RoleDTO> getRoleSet() {
        return roleSet;
    }

    public void setRoleSet(Set<RoleDTO> roleSet) {
        this.roleSet = roleSet;
    }
}
