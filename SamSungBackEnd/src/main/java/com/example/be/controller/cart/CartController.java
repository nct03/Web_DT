package com.example.be.controller.cart;

import com.example.be.dto.cart.CartDTO;
import com.example.be.dto.cart.CartPaymentForm;
import com.example.be.dto.cart.CartUpdateQuantity;
import com.example.be.dto.response.ResponseMessage;
import com.example.be.model.*;
import com.example.be.security.JwtAuthenticationFilter;
import com.example.be.security.JwtTokenProvider;
import com.example.be.service.cart.ICartService;
import com.example.be.service.cart.IOderDetailService;
import com.example.be.service.cart.IOderProductService;
import com.example.be.service.mail.IEmailService;
import com.example.be.service.product.ICapacityProductService;
import com.example.be.service.product.IProducerService;
import com.example.be.service.product.IProductService;
import com.example.be.service.user.IUserService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/cart")
public class CartController {
    @Autowired
    private ICartService iCartService;
    @Autowired
    private JwtAuthenticationFilter jwtAuthenticationFilter;
    @Autowired
    private JwtTokenProvider jwtTokenProvider;
    @Autowired
    private IUserService iUserService;
    @Autowired
    private IProductService iProductService;
    @Autowired
    private ICapacityProductService iCapacityProductService;
    @Autowired
    private IOderDetailService iOderDetailService;
    @Autowired
    private IOderProductService iOderProductService;
    @Autowired
    private IEmailService iEmailService;
    @GetMapping("")
    public ResponseEntity<?> findAllCart(HttpServletRequest request,@PageableDefault Pageable pageable){
        String token = jwtAuthenticationFilter.getJwt(request);
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUserNameFromToken(token);
            if (Boolean.FALSE.equals(iUserService.existsByUsername(username))) {
                return new ResponseEntity<>(new ResponseMessage("Tên người dùng không tồn tại"), HttpStatus.BAD_REQUEST);
            }
            User user = iUserService.findByUsername(username).get();
            return new ResponseEntity<>(iCartService.findAllCart(user.getId(),pageable), HttpStatus.OK);
        }
        return new ResponseEntity<>(new ResponseMessage("JWT không tồn tại"), HttpStatus.BAD_REQUEST);
    }
    @PostMapping("")
    public ResponseEntity<?> createCart(HttpServletRequest request, @RequestBody CartDTO cartDTO) {
        String token = jwtAuthenticationFilter.getJwt(request);
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUserNameFromToken(token);
            if (Boolean.FALSE.equals(iUserService.existsByUsername(username))) {
                return new ResponseEntity<>(new ResponseMessage("Tên người dùng không tồn tại"), HttpStatus.BAD_REQUEST);
            }
            LocalDateTime currentDate = LocalDateTime.now();
            User user = iUserService.findByUsername(username).get();
            CapacityProduct capacityProduct = iCapacityProductService.findById(cartDTO.getIdCapacityProduct());
            if(Integer.parseInt(cartDTO.getQuantity()) > Integer.parseInt(capacityProduct.getQuantity())){
                return new ResponseEntity<>(new ResponseMessage("Sản phẩm đã hết hàng"), HttpStatus.BAD_REQUEST);
            }
            Cart existingCart = iCartService.findCartByUserAndProduct(user, capacityProduct);
            if (existingCart != null) {
                if(Integer.parseInt(cartDTO.getQuantity()) + Integer.parseInt(existingCart.getQuantity()) > Integer.parseInt(capacityProduct.getQuantity())){
                    return new ResponseEntity<>(new ResponseMessage("Sản phẩm đã hết hàng"), HttpStatus.BAD_REQUEST);
                }
                int currentQuantity = Integer.parseInt(existingCart.getQuantity());
                int newQuantity = currentQuantity + Integer.parseInt(cartDTO.getQuantity());
                existingCart.setQuantity(String.valueOf(newQuantity));
                existingCart.setCreateDate(String.valueOf(currentDate));
                iCartService.createCart(existingCart);
                return new ResponseEntity<>(new ResponseMessage("Cập nhật sản phẩm vào giỏ hàng thành công"), HttpStatus.CREATED);
            }else {
                Cart newCart = new Cart();
                newCart.setUser(user);
                newCart.setPrice(cartDTO.getPrice());
                newCart.setCapacityProduct(capacityProduct);
                newCart.setQuantity(cartDTO.getQuantity());
                newCart.setCreateDate(String.valueOf(currentDate));
                iCartService.createCart(newCart);
                return new ResponseEntity<>(new ResponseMessage("Thêm sản phẩm vào giỏ hàng thành công"), HttpStatus.CREATED);
            }
        }
        return new ResponseEntity<>(new ResponseMessage("JWT không tồn tại"), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("")
    public ResponseEntity<?> cartUpdate(@RequestBody List<CartUpdateQuantity> cartUpdateQuantityList){
        boolean flag = false;
        for (CartUpdateQuantity cartUpdateQuantity: cartUpdateQuantityList ) {
            Cart cart = iCartService.findByIdCart(cartUpdateQuantity.getId());
            if(cart==null){
                return new ResponseEntity<>(new ResponseMessage("Cập nhật giỏ hàng thất bại"),HttpStatus.BAD_REQUEST);
            }
            CapacityProduct capacityProduct = iCapacityProductService.findById(cart.getCapacityProduct().getId());
            if(capacityProduct==null){
                return new ResponseEntity<>(new ResponseMessage("Cập nhật giỏ hàng thất bại"),HttpStatus.BAD_REQUEST);
            }
            if(Integer.parseInt(cartUpdateQuantity.getQuantity()) > Integer.parseInt(capacityProduct.getQuantity())){
                cart.setQuantity(capacityProduct.getQuantity());
                iCartService.updateCart(cart);
                flag = true;
            }else{
                cart.setQuantity(cartUpdateQuantity.getQuantity());
                iCartService.updateCart(cart);
            }
        }
        if(flag){
            return new ResponseEntity<>(new ResponseMessage("Số lượng sản phẩm trong kho không đủ"), HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(new ResponseMessage("Cập nhật giỏ hàng thành công"),HttpStatus.OK);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteCart(@PathVariable int id){
        Cart cart = iCartService.findByIdCart(id);
        if(cart==null){
            return new ResponseEntity<>(new ResponseMessage("Cập nhật giỏ hàng thất bại"),HttpStatus.BAD_REQUEST);
        }
        iCartService.deleteCart(cart);
        return new ResponseEntity<>(new ResponseMessage("Xóa sản phẩm trong giỏ hàng thành công"),HttpStatus.OK);
    }
    @PostMapping("payment")
    public ResponseEntity<?> cartPayment(HttpServletRequest request,@RequestBody CartPaymentForm cartPaymentForm){
        if(cartPaymentForm.getCartIds().isEmpty()){
            return new ResponseEntity<>(new ResponseMessage("Không có đơn hàng được chọn"),HttpStatus.BAD_REQUEST);
        }
        boolean flag = false;
        for(Integer cartId: cartPaymentForm.getCartIds()){
           Cart cart  =  iCartService.findByIdCart(cartId);
            CapacityProduct capacityProduct = cart.getCapacityProduct();
            if(cart==null){
                return new ResponseEntity<>(new ResponseMessage("Giỏ hàng không tồn tại"),HttpStatus.BAD_REQUEST);
            }
            if(Integer.parseInt(capacityProduct.getQuantity())<Integer.parseInt(cart.getQuantity())){
                cart.setQuantity(capacityProduct.getQuantity());
                iCartService.updateCart(cart);
                flag = true;
            }
        }
        if(flag){
            return new ResponseEntity<>(new ResponseMessage("Số lượng sản phẩm trong kho không đủ"),HttpStatus.BAD_REQUEST);
        }
        String token = jwtAuthenticationFilter.getJwt(request);
        if (token != null && jwtTokenProvider.validateToken(token)) {
            String username = jwtTokenProvider.getUserNameFromToken(token);
            if (Boolean.FALSE.equals(iUserService.existsByUsername(username))) {
                return new ResponseEntity<>(new ResponseMessage("Tên người dùng không tồn tại"), HttpStatus.BAD_REQUEST);
            }
            User user = iUserService.findByUsername(username).get();
            int id = iOderProductService.getTotalCodeAmount() + 1000;
            LocalDateTime currentDate = LocalDateTime.now();
            OderProduct oderProduct = new OderProduct();
            oderProduct.setCode("DH-" + id);
            oderProduct.setOderDate(String.valueOf(currentDate));
            oderProduct.setUser(user);
            oderProduct.setPhoneNumber(cartPaymentForm.getPhoneNumber());
            oderProduct.setShippingAddress(cartPaymentForm.getShippingAddress());
            oderProduct.setPaymentMethod(cartPaymentForm.getPaymentMethod());
            oderProduct.setTotalPay(cartPaymentForm.getTotalPay());
            iOderProductService.createOderProduct(oderProduct);
            OderProduct oderProduct1 = iOderProductService.findByIdOderProduct(oderProduct.getId());
            Cart cart;
            List<OderDetail> oderDetailList = new ArrayList<>();
            for(Integer cartId: cartPaymentForm.getCartIds()){
                cart  =  iCartService.findByIdCart(cartId);
                CapacityProduct capacityProduct = cart.getCapacityProduct();
                OderDetail oderDetail = new OderDetail();
                oderDetail.setPrice(cart.getPrice());
                oderDetail.setQuantity(cart.getQuantity());
                oderDetail.setProduct(capacityProduct.getProduct());
                oderDetail.setSubtotal(String.valueOf(Integer.parseInt(oderDetail.getPrice())*Integer.parseInt(oderDetail.getQuantity())));
                oderDetail.setOderProduct(oderProduct1);
                capacityProduct.setQuantity(String.valueOf(Integer.parseInt(capacityProduct.getQuantity())-Integer.parseInt(cart.getQuantity())));
                OderDetail oderDetail1 = iOderDetailService.createOderDetail(oderDetail);
                oderDetailList.add(oderDetail1);
                iCapacityProductService.updateQuantityProduct(capacityProduct);
                deleteCart(cartId);
            }
            if(!oderDetailList.isEmpty()){
                iEmailService.sendPaymentSuccessEmail(user.getEmail(),oderProduct1,oderDetailList);
            }
            return new ResponseEntity<>(new ResponseMessage("Thanh toán đơn hàng thành công"), HttpStatus.CREATED);
        }
        return new ResponseEntity<>(new ResponseMessage("JWT không tồn tại"), HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/order-management")
    public ResponseEntity<?> findOderProductsByCodeOrUser_Name(@RequestParam(required = false, defaultValue = "") String search,
                                                               @RequestParam(required = false, defaultValue = "0") int page) {
        Pageable sortedPageaBle = PageRequest.of(page, 10, Sort.by("oder_date"));
        Page<OderProduct> orderProducts = iOderProductService.findOderProductsByCode(search, sortedPageaBle);
        return new ResponseEntity<>(orderProducts, HttpStatus.OK);
    }
}
