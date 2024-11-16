package com.example.be.service.mail;

import com.example.be.model.OderDetail;
import com.example.be.model.OderProduct;
import com.example.be.model.User;

import java.util.List;

public interface IEmailService {
    void sendResetPasswordEmail(String email, String otp);
    boolean validateOtp(String otpCode, String email);
    String generateOtp(User user);
    void sendPaymentSuccessEmail(String email, OderProduct oderProduct, List<OderDetail> oderDetailList);
}