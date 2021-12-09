package com.example.bolt.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
@Document(collection = "user")
public class User {
    @Id
    private String userID;
    private String fname;
    private String lname;
    private String address;
    private String postNum;
    private String loginCredential;
    private String loginPassword;

    private Restaurant restaurant;
}
