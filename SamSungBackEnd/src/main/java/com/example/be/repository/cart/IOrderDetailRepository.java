package com.example.be.repository.cart;

import com.example.be.model.OderDetail;
import org.springframework.data.jpa.repository.JpaRepository;

public interface IOrderDetailRepository extends JpaRepository<OderDetail,Integer> {
}
