package com.example.be.service.product.impl;

import com.example.be.model.ProductType;
import com.example.be.repository.product.IProductTypeRepository;
import com.example.be.service.product.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductTypeService implements IProductTypeService {
    @Autowired
    private IProductTypeRepository iProductTypeRepository;
    @Override
    public List<ProductType> findAllProductType() {
        return iProductTypeRepository.findAll();
    }

    @Override
    public ProductType findByProductTypeId(int id) {
        return iProductTypeRepository.findById(id);
    }
}
