package com.example.be.service.mail.impl;

import com.example.be.model.OderDetail;
import com.example.be.model.OderProduct;
import com.example.be.model.Product;
import com.example.be.model.User;
import com.example.be.service.cart.IOderProductService;
import com.example.be.service.mail.IEmailService;
import com.example.be.service.user.IUserService;
import com.warrenstrange.googleauth.GoogleAuthenticator;
import com.warrenstrange.googleauth.GoogleAuthenticatorConfig;
import com.warrenstrange.googleauth.GoogleAuthenticatorKey;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.TimeZone;
import java.util.stream.Collectors;

@Service
public class EmailService implements IEmailService {
    @Autowired
    private JavaMailSender javaMailSender;
    @Autowired
    private IUserService iUserService;
    @Autowired
    private IOderProductService iOderProductService;
    public void sendResetPasswordEmail(String email, String otp) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper message = null;
        try {
            message = new MimeMessageHelper(mimeMessage, true);
            message.setTo(email);
            message.setSubject("Xác Thực Mã OTP");
            message.setText("<html>" +
                    "<body>" +
                    "<div style=\" font-size:15px;\">" +
                    "Kính gửi Quý khách hàng," + "<br>" + "<br>" +
                    "<div style =\" font-weight:bold \"> Đây là mã OTP của bạn: [" + otp + "] </div>" + "<br>" +
                    "Mã OTP này sẽ hết hạn trong vòng 1 phút kể từ khi bạn nhận được email này. " +
                    "Vui lòng không chia sẻ mã này với bất kỳ ai, " +
                    "vì nó được sử dụng để xác thực tài khoản của bạn." +
                    "<br>" +
                    "Nếu bạn không yêu cầu mã OTP, " +
                    "vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ."
                    + "<br>" +
                    "<div style=\"font-size: 16px;font-weight: bold;\">Trân trọng,</div>\n" +
                    "<div ><img style=\"width: 150px; height: 80px;\" src=\"https://i.ytimg.com/vi/peHhLfSVueE/maxresdefault.jpg?alt=media&token=ce679fe2-2279-44f3-99df-2feb23335027\"/></div>\n" +
                    "</div>" +
                    "</body>" +
                    "</html>", true);
            javaMailSender.send(message.getMimeMessage());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    public void sendPaymentSuccessEmail(String email, OderProduct oderProduct, List<OderDetail> oderDetailList) {
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper message = null;
        SimpleDateFormat initialDateFormat = new SimpleDateFormat("yyyy-MM-dd'T'HH:mm:ss.SSS");
        initialDateFormat.setTimeZone(TimeZone.getTimeZone("UTC"));
        SimpleDateFormat newDateFormat = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
        newDateFormat.setTimeZone(TimeZone.getTimeZone("Asia/Ho_Chi_Minh"));
        String importedDateTime = oderProduct.getOderDate();
        String importedDateTimeInNewFormat = "";
        try {
            Date dateTime = initialDateFormat.parse(importedDateTime);
            importedDateTimeInNewFormat = newDateFormat.format(dateTime);
        } catch (ParseException e) {
            e.printStackTrace();
        }
        try {
            message = new MimeMessageHelper(mimeMessage, true);
            message.setTo(email);
            message.setSubject("Thanh Toán Đơn Hàng");
            String totalPayFormatted = String.format("%,.0f", Double.parseDouble(oderProduct.getTotalPay()));
            String content = "<html>\n" +
                    "<body>\n" +
                    "<div style=\"font-size: 15px;>\"\n" +
                    "<div style=\"font-size: 16px;font-weight: bold;\">Kính gửi Quý khách hàng,</div>" +
                    "<br>\n" +
                    "<div>Chúng tôi đã nhận được thanh toán thành công từ bạn. Đơn hàng của bạn sẽ được xử lý và </div>" +
                    "<div>gửi tới địa chỉ được cung cấp trong thời gian sớm nhất.</div>" +
                    "<br>\n" +
                    "<div>Chi tiết thanh toán:</div>\n" +
                    "<ul>\n" +
                    "<li>Mã đơn hàng: " + oderProduct.getCode() + "</li>\n" +
                    "<li>Ngày thanh toán: " + importedDateTimeInNewFormat + "</li>\n" +
                    "<li>Phương thức thanh toán: " + oderProduct.getPaymentMethod() + "</li>\n" +
                    "<li>Tổng thanh toán: " + totalPayFormatted + " đ</li>\n" +
                    "</ul>\n" +
                    "<div>Chi tiết đơn hàng:</div>\n" +
                    "<br>\n" +
                    "<table style=\"width:100%;\">\n" +
                    "  <thead>\n" +
                    "      <tr style=\"font-weight: bold;\" >\n" +
                    "          <td scope=\"row\">Hình ảnh</td>\n" +
                    "          <td>Mã sản phẩm</td>\n" +
                    "          <td>Dung tích</td>\n" +
                    "          <td>Đơn giá</td>\n" +
                    "          <td>Số lượng</td>\n" +
                    "          <td>Tổng</td>\n" +
                    "      </tr>\n" +
                    "  </thead> \n" +
                    " <tbody>\n" +
                    oderDetailList.stream().map((element) -> {
                        String imageSrc = element.getProduct().getImageSet().get(0).getName();
                        String capacityName = element.getProduct().getCapacityProductSet().get(0).getCapacity().getName();
                        String priceFormatted = String.format("%,.0f", Double.parseDouble(element.getPrice()));
                        String quantity = String.valueOf(element.getQuantity());
                        String subtotalFormatted = String.format("%,.0f", Double.parseDouble(element.getSubtotal()));
                        return  " <tr class=\"text-center click-detail-product\">\n" +
                                " <td scope=\"row\" style=\"height: 100px;\">\n" +
                                " <img style=\"width: 70px; height: 70px;\" src=\"" + imageSrc + "\"/></td>\n" +
                                " <td>" + element.getProduct().getCode() + "</td>\n" +
                                " <td>" + capacityName + "</td>\n" +
                                " <td>" + priceFormatted + " đ</td>\n" +
                                " <td>" + quantity + "</td>\n" +
                                " <td>" + subtotalFormatted + " đ</td>\n" +
                                " </tr>\n";
                                }).collect(Collectors.joining()) +
                    "     </tbody>\n" +
                    " </table>\n" +
                    "<br>\n" +
                    "<div style=\"font-size: 16px;\">Xin chân thành cảm ơn sự tin tưởng và ủng hộ của bạn.</div>"+
                    "<br>\n" +
                    "<div style=\"font-size: 16px;font-weight: bold;\">Trân trọng,</div>\n" +
                    "<div ><img style=\"width: 150px; height: 80px;\" src=\"https://firebasestorage.googleapis.com/v0/b/quannla.appspot.com/o/files%2FThi%E1%BA%BFt%20k%E1%BA%BF%20ch%C6%B0a%20c%C3%B3%20t%C3%AAn%20(1).png?alt=media&token=ce679fe2-2279-44f3-99df-2feb23335027\"/></div>\n" +
                    "</div>\n" +
                    "</body>\n" +
                    "</html>\n";
            message.setText(content, true);
            javaMailSender.send(message.getMimeMessage());
        } catch (MessagingException e) {
            throw new RuntimeException(e);
        }
    }

    @Override
    public boolean validateOtp(String otpCode, String email) {
        User user = iUserService.findByEmailUser(email);
        GoogleAuthenticator gAuth = new GoogleAuthenticator();
        int code = Integer.parseInt(otpCode);
        LocalDateTime expiryTime = user.getExpiryTime();
        if (expiryTime != null && LocalDateTime.now().isAfter(expiryTime)) {
            System.out.println("Mã OTP đã hết hạn");
            return false;
        }
        String secret = user.getOtpSecret();
        boolean isValid = gAuth.authorize(secret, code);
        if (Boolean.TRUE.equals(isValid)) {
            user.setOtpSecret(null);
            user.setExpiryTime(null);
            iUserService.updateOtp(user);
        } else {
            System.out.println("Mã OTP không chính xác");
        }
        return isValid;
    }

    @Override
    public String generateOtp(User user) {
        GoogleAuthenticatorConfig config = new GoogleAuthenticatorConfig
                .GoogleAuthenticatorConfigBuilder()
                .setCodeDigits(6)
                .build();
        GoogleAuthenticator gAuth = new GoogleAuthenticator(config);
        GoogleAuthenticatorKey key = gAuth.createCredentials();
        String secret = key.getKey();
        user.setExpiryTime(LocalDateTime.now().plusMinutes(1));
        user.setOtpSecret(secret);
        iUserService.updateOtp(user);
        int code = gAuth.getTotpPassword(secret);
        return Integer.toString(code);
    }
}