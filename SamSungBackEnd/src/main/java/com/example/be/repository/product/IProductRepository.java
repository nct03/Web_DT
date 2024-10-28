package com.example.be.repository.product;

import com.example.be.model.Product;
import com.example.be.projections.IProductSaleList;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.math.BigInteger;
import java.util.List;

public interface IProductRepository extends JpaRepository<Product,Integer> {
    @Query(value = "SELECT * FROM product p JOIN (SELECT product_id, MIN(price_sale) AS min_price_sale\n" +
            "                              FROM capacity_product\n" +
            "                              GROUP BY product_id)AS min_prices ON min_prices.product_id = p.id\n" +
            "            JOIN capacity_product cp ON cp.product_id = p.id AND cp.price_sale = min_prices.min_price_sale\n" +
            "            WHERE p.name LIKE CONCAT('%', :name, '%')\n" +
            "           AND (p.product_type_id = :productTypeId OR :productTypeId = '')\n" +
            "        AND (p.producer_id = :producerId OR :producerId = '')\n" +
            "              AND cp.price_sale >= :minPrice\n" +
            "            AND cp.price_sale <= :maxPrice AND p.is_delete = FALSE AND p.is_data_entry = true\n", nativeQuery = true)
    Page<Product> searchProduct(@Param("name") String name,
                                @Param("productTypeId") String productTypeId,
                                @Param("producerId") String producerId,
                                @Param("minPrice") Long minPrice,
                                @Param("maxPrice") Long maxPrice,
                                Pageable pageable);
    Product findById(int id);
    @Query(value = "SELECT * FROM product where is_delete = false and is_data_entry = false",nativeQuery = true)
    Page<Product> productNotData(Pageable pageable);
    @Query(value = "SELECT p.id, p.name,\n" +
            "       (SELECT i.name FROM image i WHERE i.product_id = p.id LIMIT 1) AS imageName,\n" +
            "       MIN(cp.price) AS capacityProductPrice, MIN(cp.price_sale) AS capacityProductPriceSale\n" +
            "FROM product p\n" +
            "         JOIN capacity_product cp ON cp.product_id = p.id\n" +
            "WHERE cp.price IS NOT NULL\n" +
            "GROUP BY p.id, p.name\n" +
            "ORDER BY p.id DESC\n" +
            "LIMIT 8",nativeQuery = true)
    List<IProductSaleList> productSaleList();
    @Query(value = "select count(id) from product", nativeQuery = true)
    Integer getTotalCodeAmount();
}
