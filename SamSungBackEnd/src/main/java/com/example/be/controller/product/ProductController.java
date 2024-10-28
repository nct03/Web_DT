package com.example.be.controller.product;

import com.example.be.dto.product.*;
import com.example.be.dto.response.ResponseMessage;
import com.example.be.model.*;
import com.example.be.service.product.*;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private IProductService iProductService;
    @Autowired
    private IProductTypeService iProductTypeService;
    @Autowired
    private IProducerService iProducerService;
    @Autowired
    private ICapacityService iCapacityService;
    @Autowired
    private IImageService iImageService;
    @Autowired
    private ICapacityProductService iCapacityProductService;
    @GetMapping("")
    public ResponseEntity<?> searchProduct(@RequestParam(required = false,defaultValue = "") String name,
                                           @RequestParam(required = false,defaultValue = "") String productTypeId,
                                           @RequestParam(required = false,defaultValue = "") String producerId,
                                           @RequestParam(required = false, defaultValue = "0") Long minPrice,
                                           @RequestParam(required = false, defaultValue = "10000000000")Long maxPrice,
                                           @PageableDefault(size = 9) Pageable pageable,
                                           @RequestParam(required = false,defaultValue = "") String sortType
                                           ){
        Sort sort = null;
        switch (sortType){
            case "Tên: A-Z":
                sort =  Sort.by("name").ascending();
                break;
            case "Tên: Z-A":
                sort =  Sort.by("name").descending();
                break;
            case "Giá: Tăng dần":
                sort =  Sort.by("cp.price_sale").ascending();
                break;
            case "Giá: Giảm dần":
                sort =  Sort.by("cp.price_sale").descending();
                break;
            default:
                sort =  Sort.by("id").descending();
        }
            Pageable sortedPageaBle = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
        Page<Product> products = iProductService.searchProduct(name,productTypeId,producerId,minPrice,maxPrice,sortedPageaBle);
        return new ResponseEntity<>(products,HttpStatus.OK);
    }
    @GetMapping("detail")
    public ResponseEntity<?> detailProduct(@RequestParam(required = false)Integer id){
        Product product = iProductService.findByProduct(id);
        if(product==null){
            return new ResponseEntity<>(new ResponseMessage("Sản phẩm không tồn tại"),HttpStatus.BAD_REQUEST);
        }
        if(!product.isDataEntry()){
            return new ResponseEntity<>(new ResponseMessage("Sản phẩm chưa có dữ liệu"),HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(product,HttpStatus.OK);
    }
    @GetMapping("sale-list")
    public ResponseEntity<?> productSaleList(){
        return new ResponseEntity<>(iProductService.productSaleList(),HttpStatus.OK);
    }
    @GetMapping("/not-data")
    public ResponseEntity<?> listProductNotData(@PageableDefault(size = 8,sort = {"id"},direction = Sort.Direction.DESC)Pageable pageable){
        return new ResponseEntity<>(iProductService.productNotData(pageable),HttpStatus.OK);
    }
    @PostMapping("/create")
    public ResponseEntity<?> productCreate(@RequestBody ProductCreateDTO productCreateDTO){
        Producer producer = iProducerService.findByProducerId(productCreateDTO.getProducerId());
        if (producer==null){
            return new ResponseEntity<>(new ResponseMessage("Tên thương hiệu không tồn tại" ),HttpStatus.BAD_REQUEST);
        }
        ProductType productType = iProductTypeService.findByProductTypeId(productCreateDTO.getProductTypeId());
        if (productType==null){
            return new ResponseEntity<>(new ResponseMessage("Tên loại sản phẩm không tồn tại"),HttpStatus.BAD_REQUEST);
        }
        int id = iProductService.getTotalCodeAmount() + 1000;
        Product product = new Product();
        product.setCode("SP-" + id);
        product.setName(productCreateDTO.getName());
        product.setColor(productCreateDTO.getColor());
        product.setAddNewDate(productCreateDTO.getAddNewDate());
        product.setDescription(productCreateDTO.getDescription());
        product.setProductType(productType);
        product.setProducer(producer);
        product.setDelete(false);
        product.setDataEntry(false);
        Product product1 = iProductService.productCreate(product);
        for ( String imageName : productCreateDTO.getImageSet()) {
            Image image = new Image();
            image.setName(imageName);
            image.setProduct(product1);
            iImageService.createImage(image);
        }
        return new ResponseEntity<>("Thêm mới thành công",HttpStatus.CREATED);
    }
    @PutMapping("/update")
    public ResponseEntity<?> productUpdate(@RequestBody ProductUpdateDTO productUpdateDTO){
        Product product = iProductService.findByProduct(productUpdateDTO.getId());
        if (product==null){
            return new ResponseEntity<>(new ResponseMessage("Sản phẩm không tồn tại"),HttpStatus.BAD_REQUEST);
        }
        BeanUtils.copyProperties(productUpdateDTO,product);
        iProductService.productUpdate(product);
        for (Image image : product.getImageSet()) {
            boolean flag = false;
            for (ImageProductDTO imageProductDTO :productUpdateDTO.getImageSet() ) {
                if(image.getId()==imageProductDTO.getId()){
                    flag = true;
                    break;
                }
            }
            if(!flag){
                iImageService.deleteImage(image.getId());
            }
        }
        for (ImageProductDTO imageProductDTO : productUpdateDTO.getImageSet()) {
            if(!iImageService.existsById(imageProductDTO.getId())) {
                Image image1 = new Image();
                image1.setName(imageProductDTO.getName());
                image1.setProduct(product);
                iImageService.createImage(image1);
            } else {
                Image image = iImageService.findByImageId(imageProductDTO.getId());
                image.setId(imageProductDTO.getId());
                image.setName(imageProductDTO.getName());
                image.setProduct(product);
                iImageService.updateImage(image);
            }
        }
        return new ResponseEntity<>(new ResponseMessage("Cập nhật sản phẩm thành công"),HttpStatus.OK);
    }
    @PostMapping("/data-entry")
    public ResponseEntity<?> dataEntry(@RequestBody DataEntryDTO dataEntryDTO){
        Product product = iProductService.findByProduct(dataEntryDTO.getProductId());
        for (CapacityProductDTO capacityProductDTO : dataEntryDTO.getCapacityProductDTOS()) {
            CapacityProduct capacityProduct = new CapacityProduct();
            capacityProduct.setQuantity(capacityProductDTO.getQuantity());
            capacityProduct.setPriceSale(capacityProductDTO.getPriceSale());
            if(!capacityProductDTO.getPrice().equals("")){
            capacityProduct.setPrice(capacityProductDTO.getPrice());
            }
            capacityProduct.setCapacity(capacityProductDTO.getCapacity());
            capacityProduct.setProduct(product);
            iCapacityProductService.capacityProductCreate(capacityProduct);
        }
        product.setDataEntry(true);
        iProductService.productUpdate(product);
        return new ResponseEntity<>(new ResponseMessage("Nhập dữ liệu sản phẩm thành công"),HttpStatus.OK);
    }
    @PutMapping("/data-entry-update")
    public ResponseEntity<?> dataEntryUpdate(@RequestBody DataEntryDTO dataEntryDTO){
        Product product = iProductService.findByProduct(dataEntryDTO.getProductId());
        for ( CapacityProduct capacityProduct : product.getCapacityProductSet()) {
            boolean flag = false;
            for ( CapacityProductDTO capacityProductDTO : dataEntryDTO.getCapacityProductDTOS()) {
                if(capacityProduct.getId()!=capacityProductDTO.getId()){
                    flag = true;
                    break;
                }
            }
            if (flag){
                iCapacityProductService.deleteCapacityProduct(capacityProduct.getId());
            }
        }
        for (CapacityProductDTO capacityProductDTO : dataEntryDTO.getCapacityProductDTOS()) {
            if(iCapacityProductService.findById(capacityProductDTO.getId())!=null){
                CapacityProduct capacityProduct = iCapacityProductService.findById(capacityProductDTO.getId());
                capacityProduct.setQuantity(capacityProductDTO.getQuantity());
                capacityProduct.setPriceSale(capacityProductDTO.getPriceSale());
                if(!capacityProductDTO.getPrice().equals("")){
                    capacityProduct.setPrice(capacityProductDTO.getPrice());
                }
                capacityProduct.setCapacity(capacityProductDTO.getCapacity());
                capacityProduct.setProduct(product);
                iCapacityProductService.updateQuantityProduct(capacityProduct);
            }else {
                CapacityProduct capacityProduct = new CapacityProduct();
                capacityProduct.setQuantity(capacityProductDTO.getQuantity());
                capacityProduct.setPriceSale(capacityProductDTO.getPriceSale());
                if(!capacityProductDTO.getPrice().equals("")){
                    capacityProduct.setPrice(capacityProductDTO.getPrice());
                }
                capacityProduct.setCapacity(capacityProductDTO.getCapacity());
                capacityProduct.setProduct(product);
                iCapacityProductService.capacityProductCreate(capacityProduct);
            }
        }
        return new ResponseEntity<>(new ResponseMessage("Cập nhật dữ liệu sản phẩm thành công"),HttpStatus.OK);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteProduct(@RequestParam(required = false) Integer id){
        Product product = iProductService.findByProduct(id);
       if(product==null) {
           return new ResponseEntity<>(new ResponseMessage("Sản phẩm không tồn tại"),HttpStatus.BAD_REQUEST);
       }
       iProductService.deleteProduct(product);
       return new ResponseEntity<>(new ResponseMessage("Xóa sản phẩm thành công"),HttpStatus.OK);
    }

}
