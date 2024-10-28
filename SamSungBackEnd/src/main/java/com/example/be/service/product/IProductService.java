package com.example.be.service.product;

import com.example.be.model.Product;
import com.example.be.projections.IProductSaleList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.query.Param;

import java.math.BigInteger;
import java.util.List;

public interface IProductService {
    Page<Product> searchProduct(String name
            , String productTypeId
            , String producerId
            , long minPrice
            , long maxPrice
            , Pageable pageable);
    Product findByProduct(int id);
    List<IProductSaleList> productSaleList();
    Integer getTotalCodeAmount();
    Product productCreate(Product product);
    Product productUpdate(Product product);
    void deleteProduct(Product product);
    Page<Product> productNotData(Pageable pageable);
}
