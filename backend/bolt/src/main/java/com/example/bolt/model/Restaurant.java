package com.example.bolt.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "restaurant")
public class Restaurant {
    public enum type {
        CAFE,
        FINE,
        CASUAL,
        FAST
    }
    public enum level {
        €,
        €€,
        €€€,
        €€€€,
        €€€€€
    }

    @Id
    private String restaurantID;
    private String name;
    private String address;
    private String postNum;
    private String photoPath;
    private type restaurantType;
    private List<Product> menus;
    private float restaurantBalance;
    private String operatingHours;
    private level priceLevel;

    public Restaurant() {
        this.menus = new ArrayList<>();
    }

    public void addMenus(Product p) {
        this.menus.add(p);
    }
}
 