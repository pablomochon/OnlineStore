package com.pimubi.storedev.models;

import jakarta.persistence.*;
import lombok.Data;

import java.util.ArrayList;
import java.util.List;

@Data
@Entity
@Table(name = "orders")
public class Order {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

    private String shippingAddress;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "payment_method_id", referencedColumnName = "id")
    private PaymentMethod paymentMethod;

    @OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
    @JoinColumn(name = "cart_id")
    private List<OrderItem> items = new ArrayList<>();
}
