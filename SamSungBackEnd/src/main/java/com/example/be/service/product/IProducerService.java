package com.example.be.service.product;

import com.example.be.model.Producer;

import java.util.List;

public interface IProducerService {
    List<Producer> findAllProducer();
    Producer findByProducerId(int id);
}
