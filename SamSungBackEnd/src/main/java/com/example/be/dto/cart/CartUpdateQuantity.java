package com.example.be.dto.cart;

public class CartUpdateQuantity {
    private Integer id;
    private String quantity;
    
    public CartUpdateQuantity() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
