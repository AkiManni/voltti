package com.example.bolt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "products")
public class Product {
    public enum role {
   ADMIN,
   CUSTOMER
    }

    @Id
    private String productID;
    private String name;
    private String photoPath;
    private role userRole;
    private int prepareTime;
    private float price;
    private String restaurantID;
}
