package com.example.be.service.cart.impl;

import com.example.be.model.OderDetail;
import com.example.be.repository.cart.IOrderDetailRepository;
import com.example.be.service.cart.IOderDetailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class OderDetailService implements IOderDetailService {
    @Autowired
    private IOrderDetailRepository iOrderDetailRepository;

    @Override
    public OderDetail createOderDetail(OderDetail oderDetail) {
      return iOrderDetailRepository.save(oderDetail);
    }
}
