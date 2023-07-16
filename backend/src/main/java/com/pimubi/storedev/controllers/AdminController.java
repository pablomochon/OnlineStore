package com.pimubi.storedev.controllers;

import com.pimubi.storedev.models.Product;
import com.pimubi.storedev.payload.response.MessageResponse;
import com.pimubi.storedev.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    ProductService productService;
    @PostMapping("/product")
    public ResponseEntity<MessageResponse> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(new MessageResponse("Product created successfully."));
    }

}

