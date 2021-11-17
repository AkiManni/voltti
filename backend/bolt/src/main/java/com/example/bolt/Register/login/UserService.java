package com.example.bolt.Register.login;

import java.util.ArrayList;

import com.example.bolt.model.Customer;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
@Service
public class UserService implements UserDetailsService {
    @Autowired
    private UserRepository userRepository;
    @Override
    public UserDetails loadUserByUsername(String fname) throws UsernameNotFoundException {
        Customer founduser =userRepository.findByLoginCredential(fname);


        if(founduser == null) return null;

String username2 = founduser.getLoginCredential();
String password = founduser.getLoginPassword();
/*String postNum = founduser.getPostNum();
String address = founduser.getPostNum();
String lname =  founduser.getLname();
String fname = founduser.getFname();
String customerID = founduser.getCustomerID();*/
return new User(username2, password, new ArrayList<>());
    
}

}
