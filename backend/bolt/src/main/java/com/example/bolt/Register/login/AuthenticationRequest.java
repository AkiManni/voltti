package com.example.bolt.Register.login;

import java.util.Set;


public class AuthenticationRequest {
    private String customerID;

    private String fname;
    private String lname;
    private String address;
    private String postNum;
    private String loginCredential;
    private String loginPassword;

   private Set<String> roles;

    public String getCustomerID() {
        return this.customerID;
    }

    public void setCustomerID(String customerID) {
        this.customerID = customerID;
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

    public Set<String> getRoles() {
        return this.roles;
      }
      
      public void setRole(Set<String> roles) {
        this.roles = roles;
      }




}