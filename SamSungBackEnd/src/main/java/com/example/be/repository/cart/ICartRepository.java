package com.example.be.repository.cart;

import com.example.be.model.Cart;

import com.example.be.model.Product;
import com.example.be.model.User;
import com.example.be.projections.ICartProjection;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;


public interface ICartRepository extends JpaRepository<Cart,Integer> {
    @Query(value = "SELECT\n" +
            "    c.id AS cartId,\n" +
            "    c.create_date AS createDate,\n" +
            "    c.price,\n" +
            "    c.quantity,\n" +
            "    c.user_id AS userId,\n" +
            "    c.capacity_product_id AS capacityProductId,\n" +
            "    cp.id as cpId,\n" +
            "    cp.quantity AS capacityProductQuantity,\n" +
            "    cp.product_id AS capacityProductProductId,\n" +
            "    cp.capacity_id AS capacityProductCapacityId,\n" +
            "    p.name AS productName,\n" +
            "    c2.name AS capacityName,\n" +
            "    (SELECT i.name FROM image i WHERE i.product_id = p.id LIMIT 1) AS imageName\n" +
            "FROM\n" +
            "    cart c\n" +
            "        JOIN capacity_product cp ON cp.id = c.capacity_product_id\n" +
            "        JOIN capacity c2 ON c2.id = cp.capacity_id\n" +
            "        JOIN product p ON cp.product_id = p.id\n" +
            "        JOIN image i ON p.id = i.product_id where c.user_id = :id AND p.is_delete = false\n" +
            "GROUP BY c.id, c.create_date,c.price,c.quantity,c.user_id,c.capacity_product_id,cp.quantity,cp.product_id,cp.capacity_id,p.name, c2.name " +
            "Order by c.id desc ",nativeQuery = true)
    Page<ICartProjection> findAllByDeleteFalse(@Param("id")Integer id ,Pageable pageable);
    Cart findById(int id);
    @Query(value = "SELECT * FROM cart c WHERE c.user_id = :userId AND c.capacity_product_id = :capacityProductId", nativeQuery = true)
    Cart findCartByUserAndProduct(@Param("userId") Integer userId,
                                  @Param("capacityProductId") Integer capacityProductId);
}
