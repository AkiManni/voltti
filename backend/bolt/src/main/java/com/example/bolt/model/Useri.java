package com.example.bolt.model;

import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonProperty;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "user")
public class Useri {
    @Id
    @JsonProperty
        private String UserID;
        private String fname;
        private String lname;
        private String address;
        private String postNum;
        private String loginCredential;
        private String loginPassword;
    
        @DBRef
        private Set<Role> roles = new HashSet<>();

    private String restaurantID;

    public Useri() {
    }
}
