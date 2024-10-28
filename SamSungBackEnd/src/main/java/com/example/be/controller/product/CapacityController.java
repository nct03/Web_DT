package com.example.be.controller.product;

import com.example.be.model.Capacity;
import com.example.be.service.product.ICapacityService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/capacity")
@CrossOrigin("*")
public class CapacityController {
    @Autowired
    private ICapacityService iCapacityService;
    @GetMapping("")
    public List<Capacity> findAllCapacity(){
       return iCapacityService.findAllCapacity();
    }
}
