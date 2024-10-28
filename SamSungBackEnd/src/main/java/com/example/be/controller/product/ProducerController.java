package com.example.be.controller.product;

import com.example.be.model.Producer;
import com.example.be.service.product.IProducerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("producer")
public class ProducerController {
    @Autowired
    private IProducerService iProducerService;
    @GetMapping("")
    public List<Producer> findAllProducer(){
       return iProducerService.findAllProducer();
    }
}
