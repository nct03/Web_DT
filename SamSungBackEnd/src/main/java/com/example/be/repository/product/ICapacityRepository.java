package com.example.be.repository.product;

import com.example.be.model.Capacity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ICapacityRepository extends JpaRepository<Capacity,Integer> {
    List<Capacity> findAll();
    Capacity findById(int id);
}
