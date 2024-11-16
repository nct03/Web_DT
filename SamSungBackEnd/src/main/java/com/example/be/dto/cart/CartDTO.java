package com.example.be.dto.cart;


public class CartDTO {
    private Integer id;
    private String quantity;
    private String price;
    private Integer idCapacityProduct;
    public CartDTO() {
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
    public String getPrice() {
        return price;
    }
    public void setPrice(String price) {
        this.price = price;
    }

    public Integer getIdCapacityProduct() {
        return idCapacityProduct;
    }

    public void setIdCapacityProduct(Integer idCapacityProduct) {
        this.idCapacityProduct = idCapacityProduct;
    }
}
