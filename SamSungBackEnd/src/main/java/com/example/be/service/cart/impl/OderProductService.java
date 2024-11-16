package com.example.be.service.cart.impl;

import com.example.be.model.OderProduct;
import com.example.be.repository.cart.IOderProductRepository;
import com.example.be.service.cart.IOderProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public class OderProductService implements IOderProductService {
    @Autowired
    private IOderProductRepository iOderProductRepository;
    @Override
    public OderProduct findByIdOderProduct(int id) {
        return iOderProductRepository.findById(id);
    }

    @Override
    public Page<OderProduct> findAllOderProduct(Pageable pageable) {
        return iOderProductRepository.findAll(pageable);
    }

    @Override
    public Integer getTotalCodeAmount() {
        return iOderProductRepository.getTotalCodeAmount();
    }

    @Override
    public void createOderProduct(OderProduct oderProduct) {
        iOderProductRepository.save(oderProduct);
    }

    @Override
    public Page<OderProduct> findOderProductsByCode(String search, Pageable pageable) {
        return iOderProductRepository.findOderProductsByPhoneNumber(search, pageable);
    }
}
