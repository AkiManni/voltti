package com.example.bolt.model;

import java.util.ArrayList;
import java.util.List;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "restaurants")
public class Restaurant {
    public enum type {
        cafe,
        fine,
        casual,
        fast
    }

    @Id
    private String restaurantID;
    private String name;
    private String address;
    private String postNum;
    private String photoPath;
    private type restaurantType;
    private List<String> menus;

    public Restaurant() {
        this.menus = new ArrayList<>();
    }
}
