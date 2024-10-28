package com.example.be.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;

import javax.persistence.*;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.Set;
import java.util.TreeSet;

@Entity
public class Capacity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;
    private String name;
    @OneToMany(mappedBy = "capacity")
    @JsonBackReference(value = "capacityProductSetBackRef")
    @OrderBy("priceSale ASC")
    private Set<CapacityProduct> capacityProductSet = new TreeSet<>();
    public Capacity() {
    }
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

    public Set<CapacityProduct> getCapacityProductSet() {
        return capacityProductSet;
    }

    public void setCapacityProductSet(Set<CapacityProduct> capacityProductSet) {
        this.capacityProductSet = capacityProductSet;
    }
}
