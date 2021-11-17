package com.example.bolt.Register.login;

import com.example.bolt.model.Customer;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Customer, String>{
    
    Customer findByLoginCredential(String fname);
}
