package com.pimubi.storedev.dto;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.pimubi.storedev.models.PaymentMethod;
import lombok.Data;

import java.util.List;


@Data
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRequest {
    private String shippingAddress;
    private PaymentMethod paymentMethod;
    private List<OrderItemRequest> cart;
}
