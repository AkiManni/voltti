package com.example.bolt.repository;

import com.example.bolt.model.Restaurant;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {
    
}
