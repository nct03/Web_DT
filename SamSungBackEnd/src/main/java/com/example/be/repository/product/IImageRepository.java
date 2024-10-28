package com.example.be.repository.product;

import com.example.be.model.Image;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IImageRepository extends JpaRepository<Image,Integer> {
    Image findById(int id);
    Boolean existsById(int id);
}
