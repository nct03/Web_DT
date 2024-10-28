package com.example.be.service.product.impl;

import com.example.be.model.Capacity;
import com.example.be.model.CapacityProduct;
import com.example.be.repository.product.ICapacityRepository;
import com.example.be.service.product.ICapacityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CapacityService implements ICapacityService {
    @Autowired
    private ICapacityRepository iCapacityRepository;

    @Override
    public List<Capacity> findAllCapacity() {
        return iCapacityRepository.findAll();
    }

    @Override
    public Capacity findByCapacityId(int id) {
        return iCapacityRepository.findById(id);
    }
}
