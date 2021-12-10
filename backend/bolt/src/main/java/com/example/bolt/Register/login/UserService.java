

package com.example.bolt.Register.login;

import java.util.List;

import java.util.stream.Collectors;

import com.example.bolt.model.Useri;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
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
        Useri founduser =userRepository.findByLoginCredential(fname);
        List<GrantedAuthority> authorities = founduser.getRoles().stream()
        .map(role -> new SimpleGrantedAuthority(role.getName().name()))
        .collect(Collectors.toList());

        
        //List<GrantedAuthority> authorities = getUserAuthority(founduser.getRoles());
        String username2 = founduser.getLoginCredential();
String password = founduser.getLoginPassword();
/*String postNum = founduser.getPostNum();
String address = founduser.getPostNum();
String lname =  founduser.getLname();
String fname = founduser.getFname();
String customerID = founduser.getCustomerID();*/

 

 //CustomUserDetails userDetailss = new CustomUserDetails(username2, password, authorities);            

return new User(username2, password, authorities);
    //return userDetailss;
}/*
private List<GrantedAuthority> getUserAuthority(Set<Role> userRoles) {
    Set<GrantedAuthority> roles = new HashSet<>();
    userRoles.forEach((role) -> {
        roles.add(new SimpleGrantedAuthority(role.getRole()));
    });

    List<GrantedAuthority> grantedAuthorities = new ArrayList<>(roles);
    return grantedAuthorities;
    */

}





