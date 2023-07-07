package com.pimubi.storedev.models;

import jakarta.persistence.*;

@Entity
@Table
public class UserAdress {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

    @Column(name = "country", nullable = false, length = 255)
    private String country;

    @Column(name = "city", nullable = false, length = 255)
    private String city;

    @Column(name = "postal_code", nullable = false)
    private int postalCode;

    @Column(name = "address", nullable = false, length = 255)
    private String address;

    // Getters and Setters
    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public int getPostalCode() {
        return postalCode;
    }

    public void setPostalCode(int postalCode) {
        this.postalCode = postalCode;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }
}
