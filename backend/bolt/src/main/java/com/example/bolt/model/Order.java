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
        PLACED,
        IN_PREPARATION,
        READY_TO_DISPATCH,
        DISPATCHED,
        DELIVERED,
        DONE
    }

    @Id
    private String orderID;
    private String customerID;
    private String productID;
    private status orderStatus;
    private StatusTiming times;
    private float totalCost;
}
