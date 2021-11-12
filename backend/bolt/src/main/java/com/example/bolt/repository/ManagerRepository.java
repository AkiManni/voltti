package com.example.bolt.repository;

import com.example.bolt.model.Manager;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ManagerRepository extends MongoRepository<Manager, String> {

}
