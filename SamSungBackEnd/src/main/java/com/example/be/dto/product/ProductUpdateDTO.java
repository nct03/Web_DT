package com.example.be.dto.product;

import com.example.be.model.Producer;
import com.example.be.model.Product;
import com.example.be.model.ProductType;

import javax.validation.constraints.NotBlank;
import java.util.Set;
import java.util.TreeSet;

public class ProductUpdateDTO {
    private Integer id;
    @NotBlank
    private String name;
    @NotBlank
    private String color;
    @NotBlank
    private String description;
    @NotBlank
    private String addNewDate;

    private Producer producer;
    private ProductType productType;

    private Set<ImageProductDTO> imageSet = new TreeSet<>();

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public Producer getProducer() {
        return producer;
    }

    public void setProducer(Producer producer) {
        this.producer = producer;
    }

    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public Set<ImageProductDTO> getImageSet() {
        return imageSet;
    }

    public void setImageSet(Set<ImageProductDTO> imageSet) {
        this.imageSet = imageSet;
    }
}
