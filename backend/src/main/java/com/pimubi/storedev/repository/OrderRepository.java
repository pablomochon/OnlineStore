package com.pimubi.storedev.repository;

import com.pimubi.storedev.models.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
