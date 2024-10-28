package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import javax.persistence.*;

@Entity
public class Cart {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @Column(columnDefinition = "INT")
    private String quantity;
    @Column(columnDefinition = "BIGINT")
    private String price;
    @ManyToOne
    @JsonBackReference(value = "capacityProductCartBackRef")
    @JoinColumn(columnDefinition = "id")
    private CapacityProduct capacityProduct;
    @ManyToOne
    @JoinColumn(columnDefinition = "id")
    private User user;
    @Column(columnDefinition = "DATETIME")
    private String createDate;


    public Cart() {
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

    public CapacityProduct getCapacityProduct() {
        return capacityProduct;
    }

    public void setCapacityProduct(CapacityProduct capacityProduct) {
        this.capacityProduct = capacityProduct;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

}
