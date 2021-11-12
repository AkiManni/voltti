package com.example.bolt.model;

import org.springframework.data.annotation.Id;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Product {
    public enum type {
        meal,
        drink
    }

    @Id
    private String productID;
    private String name;
    private String photoPath;
    private type foodType;
    private int prepareTime;
}
