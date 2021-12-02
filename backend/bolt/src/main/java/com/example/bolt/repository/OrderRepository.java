package com.example.bolt.repository;

import java.util.List;

import com.example.bolt.model.Order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderRepository extends MongoRepository<Order, String> {

    @Query(value = "{'userID':?0}")
    List<Order> findByUserID(String id);

    @Query(value = "{'products.restaurantID':?0}")
    List<Order> findByRestaurantID(String id);

    @Query(value = "{'productID':?0}")
    List<Order> findByProductID(String s);
    
}
