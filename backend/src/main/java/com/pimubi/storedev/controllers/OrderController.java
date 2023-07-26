package com.pimubi.storedev.controllers;

import com.pimubi.storedev.models.*;
import com.pimubi.storedev.services.OrderService;
import com.pimubi.storedev.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
public class OrderController {

    private final OrderService orderService;
    private final ProductService productService;

    @Autowired
    public OrderController(OrderService orderService, ProductService productService) {
        this.orderService = orderService;
        this.productService = productService;
    }

    @PostMapping("/place")
    public ResponseEntity<String> placeOrder(@RequestBody Map<String, Object> orderRequest) {
        try {
            // Extract the necessary fields from the orderRequest map
            String client = (String) orderRequest.get("client");
            String clientAddress = (String) orderRequest.get("clientAddress");
            String paymentMethod = (String) orderRequest.get("paymentMethod");
            String deliveryMethod = (String) orderRequest.get("deliveryMethod");
            List<Map<String, Object>> items = (List<Map<String, Object>>) orderRequest.get("items");

            // Create OrderItem objects from the items list
            List<OrderItem> orderItems = new ArrayList<>();
            for (Map<String, Object> item : items) {
                Long productId = (Long) item.get("productId");
                Integer quantity = (Integer) item.get("quantity");

                Product product = productService.getProductById(productId);
                if (product == null) {
                    // Product with given ID not found, handle the error
                    return ResponseEntity.badRequest().body("Product not found for ID: " + productId);
                }

                if (product.getStock() < quantity) {
                    // Insufficient stock, handle the error
                    return ResponseEntity.badRequest().body("Insufficient stock for product: " + product.getName());
                }

                // Create and add the OrderItem
                OrderItem orderItem = new OrderItem();
                orderItem.setProduct(product);
                orderItem.setQuantity(quantity);
                orderItems.add(orderItem);
            }

            // Create the Order object and set its fields
            Order order = new Order();
            order.setClient(client);
            order.setClientAddress(clientAddress);
            order.setPaymentMethod(paymentMethod);
            order.setDeliveryMethod(deliveryMethod);
            order.setOrderItems(orderItems);
            order.setPaymentStatus(PaymentStatus.PENDING); // Assuming you have an enum for payment status
            order.setOrderStatus(OrderStatus.PENDING_PAYMENT); // Assuming you have an enum for order status

            // Place the order
            orderService.placeOrder(order);

            // Return a success response
            return ResponseEntity.ok("Order placed successfully. Order ID: " + order.getId());
        } catch (Exception e) {
            // Handle any exceptions that occur during order placement
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Error placing order: " + e.getMessage());
        }
    }
}

