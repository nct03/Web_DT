package com.example.be.service.cart;

import com.example.be.dto.cart.CartDTO;
import com.example.be.model.CapacityProduct;
import com.example.be.model.Cart;
import com.example.be.model.Product;
import com.example.be.model.User;
import com.example.be.projections.ICartProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ICartService {
    Page<ICartProjection> findAllCart(int id,Pageable pageable);
    void createCart(Cart cart);
    void deleteCart(Cart cart);
    Cart findCartByUserAndProduct(User user, CapacityProduct capacityProduct);
    void updateCart(Cart cart);
    Cart findByIdCart(int id);
}
