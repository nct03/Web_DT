package com.example.be.service.product.impl;

import com.example.be.model.Producer;
import com.example.be.repository.product.IProducerRepository;
import com.example.be.service.product.IProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProducerService implements IProducerService {
    @Autowired
    private IProducerRepository iProducerRepository;

    @Override
    public List<Producer> findAllProducer() {
        return iProducerRepository.findAll();
    }

    @Override
    public Producer findByProducerId(int id) {
        return iProducerRepository.findById(id);
    }
}
