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
    private List<String> products;
    private String orderTime;
    private String orderDelivered;
    private status orderStatus;
    private String totalPrepareTime;
    private float totalCost;

    public Order() {
      this.products = new ArrayList<>();
    }

    public void addProducts(String string) {
      this.products.add(string);
    }
}
