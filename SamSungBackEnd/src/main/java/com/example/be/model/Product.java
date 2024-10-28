package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.*;

@Entity
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String code;
    private String name;
    private String color;
    @Column(columnDefinition = "TEXT")
    private String description;
    @Column(columnDefinition = "DATE")
    private String addNewDate;
    @ManyToOne()
    @JoinColumn(columnDefinition = "id")
    private ProductType productType;
    @ManyToOne
    @JoinColumn(columnDefinition = "id")
    private Producer producer;
    @JsonManagedReference("productImageBackRef")
    @OneToMany(mappedBy = "product")
    @OrderBy("id ASC")
    private List<Image> imageSet = new ArrayList<>();
    @JsonBackReference("oderDetailsProductBackRef")
    @OneToMany(mappedBy = "product")
    @OrderBy("id ASC")
    private Set<OderDetail> oderDetails = new TreeSet<>();
    @JsonManagedReference(value = "productBackRef")
    @OneToMany(mappedBy = "product")
    @OrderBy("priceSale ASC")
    private List<CapacityProduct> capacityProductSet = new ArrayList<>();

    private boolean isDataEntry;
    private boolean isDelete;

    public Product() {
    }

    public boolean isDelete() {
        return isDelete;
    }

    public void setDelete(boolean delete) {
        isDelete = delete;
    }

    public Set<OderDetail> getOderDetails() {
        return oderDetails;
    }

    public void setOderDetails(Set<OderDetail> oderDetails) {
        this.oderDetails = oderDetails;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
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

    public List<CapacityProduct> getCapacityProductSet() {
        return capacityProductSet;
    }

    public void setCapacityProductSet(List<CapacityProduct> capacityProductSet) {
        this.capacityProductSet = capacityProductSet;
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


    public ProductType getProductType() {
        return productType;
    }

    public void setProductType(ProductType productType) {
        this.productType = productType;
    }

    public Producer getProducer() {
        return producer;
    }

    public void setProducer(Producer producer) {
        this.producer = producer;
    }

    public List<Image> getImageSet() {
        return imageSet;
    }

    public void setImageSet(List<Image> imageSet) {
        this.imageSet = imageSet;
    }

    public boolean isDataEntry() {
        return isDataEntry;
    }

    public void setDataEntry(boolean dataEntry) {
        isDataEntry = dataEntry;
    }
}
