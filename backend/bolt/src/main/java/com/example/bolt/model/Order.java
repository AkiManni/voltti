package com.example.bolt.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "order")
public class Order {
    public enum status {
        PLACED,
        IN_PREPARATION,
        READY_TO_DISPATCH,
        DISPATCHED,
        DELIVERED,
        DONE
    }

    @Id
    private String orderID;
    private String userID;
    private String address;
    private String postNumber;
    private String restaurantID;
    private List<Product> products;
    private status orderStatus;
    private StatusTime times;
    private int totalCost;

    public Order() {
        this.products = new ArrayList<>();
    }

    public void addProducts(Product product) {
        this.products.add(product);
    }
}
