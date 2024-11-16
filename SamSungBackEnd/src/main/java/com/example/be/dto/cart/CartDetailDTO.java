package com.example.be.dto.cart;

import com.example.be.dto.customer.CustomerDetailDTO;
import com.example.be.dto.product.CapacityProductDTO;


public class CartDetailDTO {
    private Integer id;
    private String quantity;
    private String price;
    private CapacityProductDTO capacityProductDTO;
    private CustomerDetailDTO customerDetailDTO;
    private String createDate;
    private boolean isDelete = false;

    public CartDetailDTO() {
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

    public CapacityProductDTO getCapacityProductDTO() {
        return capacityProductDTO;
    }

    public void setCapacityProductDTO(CapacityProductDTO capacityProductDTO) {
        this.capacityProductDTO = capacityProductDTO;
    }

    public CustomerDetailDTO getCustomerDetailDTO() {
        return customerDetailDTO;
    }

    public void setCustomerDetailDTO(CustomerDetailDTO customerDetailDTO) {
        this.customerDetailDTO = customerDetailDTO;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }
}
