package com.example.be.repository.product;

import com.example.be.model.Producer;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface IProducerRepository extends JpaRepository<Producer,Integer> {
    List<Producer> findAll();
    Producer findById(int id);
}
