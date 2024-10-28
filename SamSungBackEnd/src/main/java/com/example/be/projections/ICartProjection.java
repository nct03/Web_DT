package com.example.be.projections;

public interface ICartProjection {
    Integer getCartId();
    String getCreateDate();
    String getPrice();
    Integer getQuantity();
    Integer getUserId();
    Integer getCpId();
    Integer getCapacityProductId();
    Integer getCapacityProductQuantity();
    Integer getCapacityProductProductId();
    Integer getCapacityProductCapacityId();
    String getProductName();
    String getCapacityName();
    String getImageName();
}
