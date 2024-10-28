package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

@Entity
@Table( uniqueConstraints = {
        @UniqueConstraint(columnNames = {
                "user_name"
        }),
        @UniqueConstraint(columnNames = {
                "email"
        })
})
public class User {
    @JsonBackReference("userSetRoleReference")
    @ManyToMany(fetch = FetchType.EAGER, cascade = CascadeType.MERGE)
    @JoinTable(name = "role_user",
            joinColumns = {@JoinColumn(name = "user_id")},
            inverseJoinColumns = {@JoinColumn(name = "role_id")}
    )
    Set<Role> roles = new HashSet<>();
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String name;
    private Boolean gender;
    @Column(name = "date_of_birth")
    private String dateOfBirth;
    @Column(columnDefinition = "TEXT")
    private String address;
    private String email;
    @Column(name = "phone_number")
    private String phoneNumber;
    @Column(name = "user_name", nullable = false)
    private String userName;
    @Column(columnDefinition = "TEXT")
    private String password;
    @Lob
    private String avatar;
    private LocalDateTime expiryTime;
    private String otpSecret;
    @Enumerated(EnumType.STRING)
    private OAuthProvider oAuthProvider;
    @JsonBackReference("userOderProductRef")
    @OneToMany(mappedBy = "user")
    @OrderBy("id desc")
    private Set<OderProduct> oderProducts = new TreeSet<>();
    @JsonBackReference(value = "userCartReference")
    @OneToMany(mappedBy = "user")
    @OrderBy("capacityProduct.id ASC")
    private Set<Cart> cartSet = new TreeSet<>();
    private boolean isActived;
    public User() {
    }

    public User(Set<Role> roles, Integer id, String code, String name, Boolean gender, String dateOfBirth, String address, String email, String phoneNumber, String userName, String password, String avatar, LocalDateTime expiryTime, String otpSecret, Set<OderProduct> oderProducts) {
        this.roles = roles;
        this.id = id;
        this.code = code;
        this.name = name;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.avatar = avatar;
        this.expiryTime = expiryTime;
        this.otpSecret = otpSecret;
        this.oderProducts = oderProducts;
        this.isActived = true;
    }

    public User(String name, String address, String dateOfBirth, String email, Boolean gender, String phoneNumber, String userName, String password) {
        this.name = name;
        this.gender = gender;
        this.dateOfBirth = dateOfBirth;
        this.address = address;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.userName = userName;
        this.password = password;
        this.isActived = true;
    }

    public OAuthProvider getoAuthProvider() {
        return oAuthProvider;
    }

    public void setoAuthProvider(OAuthProvider oAuthProvider) {
        this.oAuthProvider = oAuthProvider;
    }

    public Boolean isGender() {
        return gender;
    }

    public Set<Cart> getCartSet() {
        return cartSet;
    }

    public void setCartSet(Set<Cart> cartSet) {
        this.cartSet = cartSet;
    }

    public Set<OderProduct> getOderProducts() {
        return oderProducts;
    }

    public void setOderProducts(Set<OderProduct> oderProducts) {
        this.oderProducts = oderProducts;
    }

    public Set<Role> getRoles() {
        return roles;
    }

    public void setRoles(Set<Role> roles) {
        this.roles = roles;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public void setExpiryTime(LocalDateTime expiryTime) {
        this.expiryTime = expiryTime;
    }

    public String getOtpSecret() {
        return otpSecret;
    }

    public void setOtpSecret(String otpSecret) {
        this.otpSecret = otpSecret;
    }

    public boolean isActived() {
        return isActived;
    }

    public void setActived(boolean actived) {
        isActived = actived;
    }
}
