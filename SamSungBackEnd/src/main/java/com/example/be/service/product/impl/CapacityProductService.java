package com.example.be.service.product.impl;

import com.example.be.model.CapacityProduct;
import com.example.be.repository.product.ICapacityProductRepository;
import com.example.be.service.product.ICapacityProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class CapacityProductService implements ICapacityProductService {
    @Autowired
    private ICapacityProductRepository iCapacityProductRepository;
    @Override
    public CapacityProduct findById(int id) {
        return iCapacityProductRepository.findById(id);
    }

    @Override
    public void updateQuantityProduct(CapacityProduct capacityProduct) {
        iCapacityProductRepository.save(capacityProduct);
    }
    @Override
    public void capacityProductCreate(CapacityProduct capacityProduct) {
        iCapacityProductRepository.save(capacityProduct);
    }

    @Override
    public Integer getIdCapacityProduct() {
        return iCapacityProductRepository.getIdCapacityProduct();
    }

    @Override
    public void deleteCapacityProduct(int id) {
        iCapacityProductRepository.delete(findById(id));
    }
}
