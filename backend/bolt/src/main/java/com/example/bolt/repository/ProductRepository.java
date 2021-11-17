package com.example.bolt.repository;

import java.util.List;

import com.example.bolt.model.Product;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

public interface ProductRepository extends MongoRepository<Product, String> {

    @Query(value = "{'foodType':?0}")
    List<Product> findByType(String type);

    @Query(value = "{'name':?0}")
    Product findByName(String name);

    @Query(value = "{'restaurantID':?0}")
    List<Product> findByRestaurant(String id);

}
