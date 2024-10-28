package com.example.be.dto.product;

import com.example.be.model.*;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.TreeSet;

public class ProductCreateDTO {
    private String code;
    @NotBlank
    private String name;
    @NotBlank
    private String color;
    @NotBlank
    private String description;
    @NotBlank
    private String addNewDate;

    private Integer productTypeId;

    private Integer producerId;

    private Set<String> imageSet = new TreeSet<>();


    public ProductCreateDTO() {
    }
    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String color) {
        this.color = color;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getAddNewDate() {
        return addNewDate;
    }

    public void setAddNewDate(String addNewDate) {
        this.addNewDate = addNewDate;
    }

    public Integer getProductTypeId() {
        return productTypeId;
    }

    public void setProductTypeId(Integer productTypeId) {
        this.productTypeId = productTypeId;
    }

    public Integer getProducerId() {
        return producerId;
    }

    public void setProducerId(Integer producerId) {
        this.producerId = producerId;
    }


    public Set<String> getImageSet() {
        return imageSet;
    }

    public void setImageSet(Set<String> imageSet) {
        this.imageSet = imageSet;
    }

}
