package com.example.bolt;

import com.mongodb.client.MongoClient;
import com.mongodb.client.MongoClients;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.mongodb.core.MongoTemplate;

@Configuration
public class AppConfig {
    
    public @Bean MongoClient mongoClient() {
        return MongoClients.create(System.getenv("URL"));
    }

    public @Bean MongoTemplate mongoTemplate() {
        return new MongoTemplate(mongoClient(), System.getenv("COLLECTION"));
    }
}
