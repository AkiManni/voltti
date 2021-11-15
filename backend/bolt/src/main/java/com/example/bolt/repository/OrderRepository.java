package com.example.bolt.repository;

import com.example.bolt.model.Order;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface OrderRepository extends MongoRepository<Order, String> {
    
}
