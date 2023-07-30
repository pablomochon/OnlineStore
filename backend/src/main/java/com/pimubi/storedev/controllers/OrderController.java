package com.pimubi.storedev.controllers;


import com.pimubi.storedev.dto.OrderRequest;
import com.pimubi.storedev.models.Order;
import com.pimubi.storedev.models.User;
import com.pimubi.storedev.services.OrderService;
import com.pimubi.storedev.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/orders")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private UserService userService;

    @PostMapping("/cart")
    public ResponseEntity<Void> addProductToCart(@RequestBody OrderRequest orderRequest, Authentication authentication) {
        String username = authentication.getName();

        User user = userService.getUserByUsername(username).get();

        orderService.processOrder(orderRequest, user);
        return ResponseEntity.ok().build();
    }

    @GetMapping
    public ResponseEntity<List<Order>> getAllOrders(Authentication authentication) {
        String username = authentication.getName();

        User user = userService.getUserByUsername(username).get();

        List<Order> orders = orderService.getAllOrders()
                .stream().filter(c -> c.getUser().equals(user))
                .toList();

        return ResponseEntity.ok(orders);
    }
}
