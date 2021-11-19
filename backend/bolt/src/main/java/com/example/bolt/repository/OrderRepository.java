package com.example.bolt.repository;

import java.util.List;
import java.util.Optional;

import com.example.bolt.model.Order;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface OrderRepository extends MongoRepository<Order, String> {

    @Query(value = "{'customerID':?0}")
    List<Order> findByCustomerID(String id);

    @Query(value = "{'restaurantID':?0}")
    List<Order> findByRestaurantID(String id);

    @Query(value = "{'productID':?0}")
    Optional<Order> findByProductID(String s);
    
}
