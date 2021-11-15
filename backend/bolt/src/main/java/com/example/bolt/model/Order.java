package com.example.bolt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "orders")
public class Order {
    public enum status {
        placed,
        in_preparation,
        dispatched,
        done
    }

    @Id
    private String orderID;
    private String customerID;
    private String productID;
    private String orderTime;
    private String orderDelivered;
    private status orderStatus;
    private String totalPrepareTime;
    private int totalCost;
}
