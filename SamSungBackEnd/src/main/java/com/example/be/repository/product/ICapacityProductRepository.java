package com.example.be.repository.product;

import com.example.be.model.CapacityProduct;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;

import javax.transaction.Transactional;

public interface ICapacityProductRepository extends JpaRepository<CapacityProduct,Integer> {
    CapacityProduct findById(int id);
    @Query(value = "SELECT id FROM capacity_product ORDER BY id DESC LIMIT 1",nativeQuery = true)
    Integer getIdCapacityProduct();
}
