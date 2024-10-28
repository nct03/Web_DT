package com.example.be.repository.product;

import com.example.be.model.ProductType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProductTypeRepository extends JpaRepository<ProductType,Integer> {
    List<ProductType> findAll();
    ProductType findById(int id);
}
