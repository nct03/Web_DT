package com.example.be.service.product.impl;

import com.example.be.model.Product;
import com.example.be.projections.IProductSaleList;
import com.example.be.repository.product.IProductRepository;
import com.example.be.service.product.IProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.List;

@Service
public class ProductService implements IProductService {
    @Autowired
    private IProductRepository iProductRepository;

    @Override
    public Page<Product> searchProduct(String name, String productTypeId, String producerId, long minPrice, long maxPrice, Pageable pageable) {
        return iProductRepository.searchProduct(name,productTypeId,producerId,minPrice,maxPrice,pageable);
    }

    @Override
    public Product findByProduct(int id) {
        return iProductRepository.findById(id);
    }

    @Override
    public List<IProductSaleList> productSaleList() {
        return iProductRepository.productSaleList();
    }

    @Override
    public Integer getTotalCodeAmount() {
        return iProductRepository.getTotalCodeAmount();
    }

    @Override
    public Product productCreate(Product product) {
       return iProductRepository.save(product);
    }

    @Override
    public Product productUpdate(Product product) {
        return iProductRepository.save(product);
    }

    @Override
    public void deleteProduct(Product product) {
        product.setDelete(true);
        iProductRepository.save(product);
    }

    @Override
    public Page<Product> productNotData(Pageable pageable) {
        return iProductRepository.productNotData(pageable);
    }
}
