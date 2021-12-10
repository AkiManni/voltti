package com.example.bolt.Register.login;



import com.example.bolt.model.Useri;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface UserRepository extends MongoRepository<Useri, String>{
    
    Useri findByLoginCredential(String fname);
}
