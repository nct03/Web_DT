package com.example.be.service.product;

import com.example.be.model.Image;

public interface IImageService {
    Image findByImageId(int id);
    void createImage(Image image);
    void updateImage(Image image);
    Boolean existsById(int id);
    void deleteImage(int id);
}
