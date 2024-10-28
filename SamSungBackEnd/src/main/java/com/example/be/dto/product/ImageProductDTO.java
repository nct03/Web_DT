package com.example.be.dto.product;

import javax.validation.constraints.Pattern;

public class ImageProductDTO {
    private Integer id;
//    @Pattern(regexp = "^.{0,}(.png|.jpg|.jpeg)[?](alt=media&token=).{0,}$",message = "Sai định dạng ảnh, phải có dạng đuôi .jpg, .jpeg, .png")
    private String name;

    public ImageProductDTO() {
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
}
