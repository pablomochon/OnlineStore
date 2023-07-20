package com.pimubi.storedev.controllers;

import com.pimubi.storedev.models.Category;
import com.pimubi.storedev.models.Product;
import com.pimubi.storedev.payload.response.MessageResponse;
import com.pimubi.storedev.repository.CategoryRepository;
import com.pimubi.storedev.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;


@RestController
@CrossOrigin(origins = "*")
@RequestMapping("/api/admin")
public class AdminController {
    @Autowired
    ProductService productService;
    @Autowired
    private final CategoryRepository categoryRepository;

    public AdminController(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @GetMapping
    //@PreAuthorize("hasRole('ADMIN')")
    public String adminAccess() {
        return "Admin Board.";
    }

    @PostMapping("/products")
    public ResponseEntity<MessageResponse> createProduct(@RequestBody Product product) {
        Product savedProduct = productService.saveProduct(product);
        return ResponseEntity.ok(new MessageResponse("Product created successfully."));
    }

    @PutMapping("/product/{id}")
    public ResponseEntity<MessageResponse> updateProduct(@PathVariable("id") Long id, @RequestBody Product productData) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            Product updatedProduct = product.get();
            updatedProduct.setName(productData.getName());
            updatedProduct.setWeight(productData.getWeight());
            updatedProduct.setDescription(productData.getDescription());
            updatedProduct.setBrand(productData.getBrand());
            updatedProduct.setPrice(productData.getPrice());
            updatedProduct.setStock(productData.getStock());
            updatedProduct.setImage(productData.getImage());
            updatedProduct.setVolume(productData.getVolume());

            productService.saveProduct(updatedProduct);
            return ResponseEntity.ok(new MessageResponse("Product updated successfully."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/product/{id}")
    public ResponseEntity<MessageResponse> deleteProduct(@PathVariable("id") Long id) {
        Optional<Product> product = productService.getProductById(id);
        if (product.isPresent()) {
            productService.deleteProduct(id);
            return ResponseEntity.ok(new MessageResponse("Product deleted successfully."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/categories")
    public ResponseEntity<MessageResponse> createCategory(@RequestBody Category category) {
        Category savedCategory = categoryRepository.save(category);
        return ResponseEntity.ok(new MessageResponse("Category created successfully."));
    }

    @PutMapping("/category/{id}")
    public ResponseEntity<MessageResponse> updateCategory(@PathVariable("id") Long id, @RequestBody Category categoryData) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            Category updatedCategory = category.get();
            updatedCategory.setName(categoryData.getName());

            categoryRepository.save(updatedCategory);
            return ResponseEntity.ok(new MessageResponse("Category updated successfully."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/category/{id}")
    public ResponseEntity<MessageResponse> deleteCategory(@PathVariable("id") Long id) {
        Optional<Category> category = categoryRepository.findById(id);
        if (category.isPresent()) {
            categoryRepository.deleteById(id);
            return ResponseEntity.ok(new MessageResponse("Category deleted successfully."));
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

