package com.example.be.service.product;

import com.example.be.model.Producer;
import com.example.be.model.ProductType;

import java.util.List;

public interface IProductTypeService {
    List<ProductType> findAllProductType();
    ProductType findByProductTypeId(int id);
}
