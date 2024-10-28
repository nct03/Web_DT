package com.example.be.repository.user;

import com.example.be.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import javax.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
public interface IUserRepository extends JpaRepository<User, Integer> {
    List<User> findAll();
    @Transactional
    int deleteUserById(int id);
    Optional<User> findById(int id);
    Optional<User> findByUserName(String username);
    Boolean existsByUserName(String username);
    Boolean existsByEmail(String email);
    @Modifying
    @Transactional
    @Query(value = "UPDATE user SET password = :newPassword WHERE id = :id",nativeQuery = true)
    void updatePassword(@Param("newPassword")String newPassword,@Param("id")Integer id);
    User findByEmail( String email);
    @Modifying
    @Transactional
    @Query(value = "UPDATE user set expiry_time = :expiryTime , otp_secret = :otpSecret where email = :email",nativeQuery = true)
    void updateOtp(@Param("expiryTime") LocalDateTime expiryTime, @Param("otpSecret")String otpSecret, @Param("email")String email);
    @Query(value = "select count(id) from user", nativeQuery = true)
    Integer getTotalCodeAmount();
    @Modifying
    @Transactional
    @Query(value = "update user set name = :name, gender = :gender, date_of_birth = :dateOfBirth,address = :address,email = :email,phone_number = :phoneNumber, avatar = :avatar where id = :id",nativeQuery = true)
    void UpdateCustomer(@Param("name")String name,
                        @Param("gender")boolean gender,
                        @Param("dateOfBirth")String date,
                        @Param("address")String address,
                        @Param("email")String email,
                        @Param("phoneNumber")String phoneNumber,
                        @Param("avatar")String avatar,
                        @Param("id")Integer id);
}