package com.pimubi.storedev.dto;

public class OrderDTO {

    private int productID;
    private int qty;

    // GETTERS AND SETTERS
    public int getProductID() {
        return productID;
    }

    public void setProductID(int productID) {
        this.productID = productID;
    }

    public int getQty() {
        return qty;
    }

    public void setQty(int qty) {
        this.qty = qty;
    }
}
