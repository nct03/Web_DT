package com.example.be.controller.product;

import com.example.be.model.ProductType;
import com.example.be.service.product.IProductTypeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("product-type")
public class ProductTypeController {
    @Autowired
    private IProductTypeService iProductTypeService;
    @GetMapping("")
    public List<ProductType> findAllProductType(){
        return iProductTypeService.findAllProductType();
    }
}
