package com.example.be.controller.product;

import com.example.be.dto.product.ImageProductDTO;
import com.example.be.dto.response.ResponseMessage;
import com.example.be.model.Image;
import com.example.be.service.product.IImageService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

@RestController
@RequestMapping("/image")
@CrossOrigin("*")
public class ImageController {
    @Autowired
    private IImageService iImageService;
    @GetMapping("/detail")
    public Image findByImageId(@RequestParam(required = false)Integer id){
        return iImageService.findByImageId(id);
    }
    @PostMapping("")
    public ResponseEntity<?> imageCreate(@Valid @RequestParam(required = false) Set<ImageProductDTO> imageList, BindingResult bindingResult){
        if (bindingResult.hasErrors()) {
            Map<String, String> map = new LinkedHashMap<>();
            List<FieldError> err = bindingResult.getFieldErrors();
            for (FieldError error : err) {
                if (!map.containsKey(error.getField())) {
                    map.put(error.getField(), error.getDefaultMessage());
                }
            }
            return new ResponseEntity<>(map, HttpStatus.BAD_REQUEST);
        }
        Image image = null;
        for (ImageProductDTO imageProductDTO : imageList) {
            image = new Image();
            BeanUtils.copyProperties(imageProductDTO,image);
            iImageService.createImage(image);
        }
        return new ResponseEntity<>(new ResponseMessage("Thêm mới ảnh sản phẩm thành công"), HttpStatus.CREATED);
    }
}
