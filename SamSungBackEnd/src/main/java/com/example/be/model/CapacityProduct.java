package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.Set;
import java.util.TreeSet;

@Entity
public class CapacityProduct {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    @ManyToOne
    @JsonBackReference(value = "productBackRef")
    @JoinColumn(columnDefinition = "id")
    private Product product;
    @ManyToOne
    @JoinColumn(columnDefinition = "id")
    private Capacity capacity;
    @Column(columnDefinition = "BIGINT")
    private String price;
    @Column(columnDefinition = "BIGINT")
    private String priceSale;
    @Column(columnDefinition = "INT")
    private String quantity;
    @OneToMany(mappedBy = "capacityProduct",cascade = CascadeType.REMOVE)
    @JsonManagedReference(value = "capacityProductCartBackRef")
    @OrderBy("capacityProduct.id ASC")
    private Set<Cart> cartSet = new TreeSet<>();
    public CapacityProduct() {
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

    public String getPriceSale() {
        return priceSale;
    }

    public void setPriceSale(String priceSale) {
        this.priceSale = priceSale;
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

    public String getQuantity() {
        return quantity;
    }

    public void setQuantity(String quantity) {
        this.quantity = quantity;
    }

    public Set<Cart> getCartSet() {
        return cartSet;
    }

    public void setCartSet(Set<Cart> cartSet) {
        this.cartSet = cartSet;
    }
}
