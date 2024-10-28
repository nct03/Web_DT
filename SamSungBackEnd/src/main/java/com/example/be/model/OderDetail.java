package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;

import javax.persistence.*;

@Entity
public class OderDetail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "INT")
    private String quantity;
    @ManyToOne
    @JoinColumn(columnDefinition = "id")
    private Product product;
    @ManyToOne
    @JsonBackReference("oderProductOderDetailRef")
    @JoinColumn(columnDefinition = "id")
    private OderProduct oderProduct;
    @Column(columnDefinition = "BIGINT")
    private String price;
    @Column(columnDefinition = "BIGINT")
    private String subtotal;
    public OderDetail() {
    }

    public String getPrice() {
        return price;
    }

    public void setPrice(String price) {
        this.price = price;
    }

    public String getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(String subtotal) {
        this.subtotal = subtotal;
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

    public Product getProduct() {
        return product;
    }

    public void setProduct(Product product) {
        this.product = product;
    }

    public OderProduct getOderProduct() {
        return oderProduct;
    }

    public void setOderProduct(OderProduct oderProduct) {
        this.oderProduct = oderProduct;
    }
}
