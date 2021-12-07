package com.example.bolt.repository;

import java.util.List;

import com.example.bolt.model.Restaurant;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface RestaurantRepository extends MongoRepository<Restaurant, String> {

    @Query(value = "{'name':?0}")
    Restaurant findByName(String name);

    @Query(value = "{'menus.foodType':?0}")
    List<Restaurant> findByFoodType(String type);
    
}
