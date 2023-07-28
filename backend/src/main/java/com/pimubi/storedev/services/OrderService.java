package com.pimubi.storedev.services;

import com.pimubi.storedev.dto.OrderRequest;
import com.pimubi.storedev.models.Order;
import com.pimubi.storedev.models.OrderItem;
import com.pimubi.storedev.models.Product;
import com.pimubi.storedev.models.User;
import com.pimubi.storedev.repository.OrderRepository;
import com.pimubi.storedev.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OrderService {

    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private OrderRepository orderRepository;

    @Transactional
    public void processOrder(OrderRequest orderRequest, User user) {
        // Convert the OrderItemRequest list to OrderItem
        List<OrderItem> orderItems = orderRequest.getCart().stream().map(itemRequest -> {
            Product product = productRepository.findById(itemRequest.getId())
                    .orElseThrow(() -> new RuntimeException("Product not found!"));

            if (product.getStock() < itemRequest.getQuantity()) {
                throw new RuntimeException("insufficient stock");
            }

            // Decrease product stock
            product.setStock(product.getStock() - itemRequest.getQuantity());

            // Create a ItemCart and associate to product
            OrderItem orderItem = new OrderItem();
            orderItem.setProduct(product);
            orderItem.setQuantity(itemRequest.getQuantity());

            return orderItem;
        }).collect(Collectors.toList());

        // Create a cart and associate the items and payment method
        Order order = new Order();
        order.setUser(user);
        order.setShippingAddress(orderRequest.getShippingAddress());
        order.setPaymentMethod(orderRequest.getPaymentMethod());
        order.setItems(orderItems);

        // Save cart to the database
        orderRepository.save(order);
    }

    public List<Order> getAllOrders() {
        return orderRepository.findAll();
    }
}

