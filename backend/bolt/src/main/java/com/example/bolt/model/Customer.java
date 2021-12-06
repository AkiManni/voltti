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
public class Customer {
    @Id
@JsonProperty
    private String id;
    private String fname;
    private String lname;
    private String address;
    private String postNum;
    private String loginCredential;
    private String loginPassword;
    //private boolean ismanager;

    @DBRef
    private Set<Role> roles = new HashSet<>();



    public String getId() {
        return this.id;
    }

    public void setId(String id) {
        this.id = id;
    }

 
    public String getid() {
        return this.id;
    }

    public String getFname() {
        return this.fname;
    }
    public void setFname(String fname) {
        this.fname = fname;
    }

    public String getLname() {
        return this.lname;
    }

    public void setLname(String lname) {
        this.lname = lname;
    }

    public String getAddress() {
        return this.address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getPostNum() {
        return this.postNum;
    }

    public void setPostNum(String postNum) {
        this.postNum = postNum;
    }

    public String getLoginCredential() {
        return this.loginCredential;
    }

    public void setLoginCredential(String loginCredential) {
        this.loginCredential = loginCredential;
    }

    public String getLoginPassword() {
        return this.loginPassword;
    }

    public void setLoginPassword(String loginPassword) {
        this.loginPassword = loginPassword;
    }

    public Customer() {
    }

    public Set<Role> getRoles() {
        return roles;
      }
    
      public void setRoles(Set<Role> roles) {
        this.roles = roles;
      }


}

