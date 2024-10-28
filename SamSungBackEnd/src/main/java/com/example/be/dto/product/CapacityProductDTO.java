package com.example.be.dto.product;

import com.example.be.model.Capacity;
import com.example.be.model.Product;
import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

public class CapacityProductDTO {

    private Integer id;
    private Product product;
    private Capacity capacity;
    private String price;
    private String priceSale;
    private String quantity;

    public CapacityProductDTO() {
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public Capacity getCapacity() {
        return capacity;
    }

    public void setCapacity(Capacity capacity) {
        this.capacity = capacity;
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getPriceSale() {
        return priceSale;
    }

    public void setPriceSale(String priceSale) {
        this.priceSale = priceSale;
    }

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }
}
