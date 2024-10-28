package com.example.be.dto.product;

import java.util.ArrayList;
import java.util.List;

public class DataEntryDTO {
    private Integer productId;
    private List<CapacityProductDTO> capacityProductDTOS = new ArrayList<>();

    public DataEntryDTO() {
    }

    public DataEntryDTO(Integer productId, List<CapacityProductDTO> capacityProductDTOS) {
        this.productId = productId;
        this.capacityProductDTOS = capacityProductDTOS;
    }

    public Integer getProductId() {
        return productId;
    }

    public void setProductId(Integer productId) {
        this.productId = productId;
    }

    public List<CapacityProductDTO> getCapacityProductDTOS() {
        return capacityProductDTOS;
    }

    public void setCapacityProductDTOS(List<CapacityProductDTO> capacityProductDTOS) {
        this.capacityProductDTOS = capacityProductDTOS;
    }
}
