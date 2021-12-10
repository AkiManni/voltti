package com.example.bolt.controller;


import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.concurrent.TimeUnit;

import com.example.bolt.model.*;
import com.example.bolt.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

<<<<<<< HEAD
import java.security.Principal;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import com.example.bolt.Register.login.AuthenticationRequest;
import com.example.bolt.Register.login.AuthenticationResponse;
import com.example.bolt.Register.login.JwtUtil;
import com.example.bolt.Register.login.UserRepository;
import com.example.bolt.model.ERole;
import com.example.bolt.model.Role;
import com.example.bolt.model.RoleRepository;
import com.example.bolt.model.Useri;
import com.example.bolt.repository.OrderRepository;
import com.example.bolt.repository.ProductRepository;
import com.example.bolt.repository.RestaurantRepository;

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

=======
>>>>>>> 2a270ad5abe50a47814ef7e0391d993f60a22282

@RestController
@CrossOrigin(origins = "http://localhost:3000/")
@RequestMapping("/bolt")
public class BoltController {
   

    @Autowired
    private AuthenticationManager authenticationManager;
    @Autowired
   private UserRepository us;
   @Autowired
   private RestaurantRepository re;
   @Autowired
   private ProductRepository pr;
   @Autowired
   private OrderRepository or;

@Autowired
private RoleRepository roleRepository;

    @PostMapping("/luo")
    private ResponseEntity<?> subscribeClient(@RequestBody AuthenticationRequest authenticationRequest) {
        String logincredential = authenticationRequest.getLoginCredential();
        String password = authenticationRequest.getLoginPassword();
        String firstname = authenticationRequest.getFname();
        String lastname = authenticationRequest.getLname();
        String address = authenticationRequest.getAddress();
        String postnum = authenticationRequest.getPostNum();
       Set<String> strRoles = authenticationRequest.getRoles();
       Set<Role> roles = new HashSet<>();
 
       if (strRoles == null) {
        Role userRole = roleRepository.findByName(ERole.CUSTOMER)
                .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
        roles.add(userRole);
    } else {
        strRoles.forEach(role -> {
            switch (role) {
            case "manager":
                Role adminRole = roleRepository.findByName(ERole.MANAGER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(adminRole);

                break;
                default:
                Role userRole = roleRepository.findByName(ERole.CUSTOMER)
                        .orElseThrow(() -> new RuntimeException("Error: Role is not found."));
                roles.add(userRole);
            }
        });
    }



     
        Useri usermodel = new Useri();
        usermodel.setLoginCredential(logincredential);
        usermodel.setLoginPassword(new BCryptPasswordEncoder().encode(password));
        usermodel.setFname(firstname);
        usermodel.setLname(lastname);
        usermodel.setAddress(address);
        usermodel.setPostNum(postnum);
        usermodel.setRoles(roles);


        try {

            Useri arvo = us.findByLoginCredential(usermodel.getLoginCredential());

            if (arvo != null) {

                return ResponseEntity
                        .status(HttpStatus.FORBIDDEN)
                        .body("Error Message");
            }

            else {

                if (usermodel.getFname() == null || usermodel.getLname() == null || usermodel.getAddress() == null
                        || usermodel.getPostNum() == null) {

                    return ResponseEntity
                            .status(HttpStatus.NOT_FOUND)
                            .body("Tietoja puuttuu");
                } else {
                    us.save(usermodel);
                }

            }

        } catch (Exception e) {
            return ResponseEntity.ok(new AuthenticationResponse("Virhe käyttäjän luonnissa"));

        }

        return ResponseEntity.ok(new AuthenticationResponse("Käyttäjä luotu" + "tässä rooli"));

    }

    @PostMapping("/kirjaudu")
    private ResponseEntity<?> authenticateClient(@RequestBody AuthenticationRequest authenticationRequest, Principal principal){
        
        String username = authenticationRequest.getLoginCredential();
        String password = authenticationRequest.getLoginPassword();
    
       JSONObject jsonObject = new JSONObject();
     
       try{

        org.springframework.security.core.Authentication authentication = authenticationManager
        .authenticate(new UsernamePasswordAuthenticationToken(username, password));
     

UserDetails userDetails = (UserDetails) authentication.getPrincipal();		
List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

 final String jwt = JwtUtil.generateToken(username);
    jsonObject.put("token", jwt);
    jsonObject.put("name", authentication.getName());
    jsonObject.put("Role", roles);


    



        
      
         return ResponseEntity.ok(jsonObject.toString());
 

       }
       

       catch(JSONException e){
        jsonObject.put("exception", e.getMessage());
        return ResponseEntity.ok(e.getMessage());
       }
  
      


        
    }

   

    
    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd:HH:mm:ss"); //yleinen aika formatti

    ///////////////////////////////////////USER///////////////////////////////////////////

    @GetMapping("/getUser")
    public List<Useri> getUsers() {
        return this.us.findAll();
    }

    @PostMapping("/addUser")
    public Useri addUsers(@RequestBody Useri user) {
    	Useri u = user;
        u.setUserID(generateID(0));
        this.us.save(u);
        return u;
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") String id) {
        if (this.us.findById(id).isEmpty()) return "No user found.";
        else {
            this.us.deleteById(id);
        }
        return "Deleted user " + id + ".";
    }

    @PostMapping("/addRestaurantToUser")
    public String addRestaurantToUser(@RequestBody Map<String, String> variables) {
       Useri u = this.us.findById(variables.get("userID")).orElse(null);
        Restaurant r = this.re.findById(variables.get("restaurantID")).orElse(null);

        if (u == null) return "No user found.";
<<<<<<< HEAD
      //  if (!u.isIsmanager()) return "This feature is not allowed for customers.";
=======
        // lisää koodi, joka tarkistaa onko käyttäjä manageri vai ei
>>>>>>> 2a270ad5abe50a47814ef7e0391d993f60a22282
        else if (u.getRestaurant() != null) return "You already have restaurant.";
        else if (r == null) return "No restaurant found.";
        else {
            u.setRestaurant(r);
            this.us.save(u);
            return u.toString();
        }
    }

    @DeleteMapping("/deleteRestaurantFromUser/{userID}")
    public String deleteRestaurantFromUser(@PathVariable String userID) {
        Useri u = this.us.findById(userID).orElse(null);

        if (u == null) return "No user found.";
        else if (u.getRestaurant() == null) return "No restaurant found.";
        else {
            u.setRestaurant(null);
            this.us.save(u);
            return u.toString();
        }
    }

    ///////////////////////////////////////RESTAURANT///////////////////////////////////////////

    @GetMapping("/getRestaurant")
    public List<Restaurant> getRestaurants() {
        return this.re.findAll();
    }
        
    @PostMapping("/addRestaurant")
    public Restaurant addRestaurant(@RequestBody Restaurant Restaurant) {
        Restaurant r = Restaurant;
        r.setRestaurantID(generateID(2));
        r.setName(r.getName().replace(" ", "_"));
        this.re.save(r);
        return r;
    }

    @DeleteMapping("/deleteRestaurant/{id}")
    public String deleteRestaurant(@PathVariable("id") String id) {
        if (this.re.findById(id).isEmpty()) return "No restaurant found.";
        else {
            this.re.deleteById(id);
        }
        return "Deleted restaurant " + id + ".";
    }

    ///////////////////////////////////////PRODUCT///////////////////////////////////////////

    @GetMapping("/getProduct")
    public List<Product> getProducts() {
        return this.pr.findAll();
    }

    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Product Product) {
        Product p = Product;
        p.setProductID(generateID(3));
        p.setName(p.getName().replace(" ", "_"));
        this.pr.save(p);
        return p;
    }

    @PostMapping("/addProductToRestaurant")
    public String addProductToRestaurant(@RequestBody Map<String, String> variables) {
        Product p = this.pr.findById(variables.get("productID")).orElse(null);
        Restaurant r = this.re.findById(variables.get("restaurantID")).orElse(null);

        if (r == null) return "No restaurant found.";
        else if (p == null) return "No product found.";                                     // add product ja add product to restaurant pitäisi olla yks funktio?
        else {
            List<Product> menus = r.getMenus();
            for (Product item : menus) {
                if (item == p) return "This product already exists.";
            }
            r.addMenus(p);
            p.setRestaurantID(r.getRestaurantID());
            p.setCategory(r.getCategory());
            this.re.save(r);
            this.pr.save(p);
            return "(͠≖ ͜ʖ͠≖)👌";
        }
    }

    @DeleteMapping("/deleteProductFromRestaurant/{restaurantID}/{productID}")
    public String deleteProductFromRestaurant(@PathVariable("restaurantID") String restaurantID, @PathVariable("productID") String productID) {
        Restaurant r = this.re.findById(restaurantID).orElse(null);
        Product p = this.pr.findById(productID).orElse(null);

        if (r == null) return "No restaurant found.";
        else if (p == null) return "No product found.";
        List<Product> menus = r.getMenus();
        for (Product item : menus) {
            if (item.equals(p)) {
                menus.remove(p);
                r.setMenus(menus);
                p.setRestaurantID(null);
                p.setCategory(null);
                this.pr.save(p);
                this.re.save(r);
                return r.toString();
            }
        }
        return "This product doesn't exists in your menu.";
    }

    @DeleteMapping("/deleteProduct/{id}")
    public String deleteProduct(@PathVariable("id") String id) {
        if (this.pr.findById(id).isEmpty()) return "No product found.";
        else {
            this.pr.deleteById(id);
        }
        return "Deleted user " + id + ".";
    }

    ///////////////////////////////////////ORDER///////////////////////////////////////////

    @GetMapping("/getOrder")
    public List<Order> getOrders() {
        return this.or.findAll();
    }

    @GetMapping("/getOrder/{id}")
    public Order getOrder(@PathVariable("id") String id) {
        return this.or.findById(id).orElse(null);
    }

    @GetMapping(value="/getOrderByUserID/{id}")
    public List<Order> getOrderByUserID(@PathVariable("id") String id) {
        return this.or.findByUserID(id);
    }

    // @GetMapping(value="/getOrdersByRestaurantID/{id}")                               // käyttöä?
    // public List<Order> getOrdersByRestaurantID(@PathVariable("id") String id) {
    //     return this.or.findByRestaurantID(id);
    // }
    
    @PostMapping("/addOrder")
    public Order addOrder(@RequestBody Map<String, String> ids) {
        Product p = this.pr.findById(ids.get("productID")).orElse(null);
        if (p == null) return null;
        if (p.getRestaurantID() == null) return null;

        Order o = new Order(
            generateID(4),
            ids.get("userID"),
            p.getRestaurantID(),
            new ArrayList<>(),
            dateFormat.format(Calendar.getInstance().getTime()),    //luo tämän hetkisen ajan
            "",
            Order.status.PLACED,
            "",
            5 + p.getPrice()
        );
        o.addProducts(p);
        this.or.save(o);
        return o;
    }

    @GetMapping("/updateOrder/{id}")
    public String updateOrder(@PathVariable("id") String id) throws ParseException {
        Order o = this.or.findById(id).orElse(null);

        switch (o.getOrderStatus()) {
            case PLACED:
                o.setOrderStatus(Order.status.IN_PREPARATION);
                this.or.save(o);
                return "Order Updated to: " + o.getOrderStatus();
            case IN_PREPARATION:
                o.setOrderStatus(Order.status.READY_TO_DISPATCH);
                this.or.save(o);
                return "Order Updated to: " + o.getOrderStatus();
            case READY_TO_DISPATCH:
                o.setOrderStatus(Order.status.DISPATCHED);
                this.or.save(o);
                return "Order Updated to: " + o.getOrderStatus();
            case DISPATCHED:
                o.setOrderStatus(Order.status.DELIVERED);
                this.or.save(o);
                return "Order Updated to: " + o.getOrderStatus();
            case DELIVERED:
                o.setOrderStatus(Order.status.DONE);
                o.setOrderDelivered(dateFormat.format(Calendar.getInstance().getTime()));
                o.setTotalPrepareTime(getTimeDifference(o.getOrderTime()));
                this.or.save(o);
                
                for (Product products : o.getProducts()) {
                    Product p = products;
                    Restaurant r = this.re.findById(p.getRestaurantID()).orElse(null);
                    r.setRestaurantBalance(r.getRestaurantBalance() + o.getTotalCost());
                    this.re.save(r);
                }
                return "Order is finished.";
            case DONE:
                return "Order is already finished.";
            default:
                return "No orders found.";
        }
    }

    ///////////////////////////////////////EXTRA///////////////////////////////////////////

    private String getTimeDifference(String orderTime) throws ParseException {
        long difference = System.currentTimeMillis() - dateFormat.parse(orderTime).getTime();
        return String.format(
            "%02d:%02d:%02d",
            TimeUnit.MILLISECONDS.toHours(difference),
            TimeUnit.MILLISECONDS.toMinutes(difference) - TimeUnit.HOURS.toMinutes(TimeUnit.MILLISECONDS.toHours(difference)),
            TimeUnit.MILLISECONDS.toSeconds(difference) - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(difference))
            );
    }

    //Tarkistaa ja luo uuden tyhjän id:n
    private String generateID(int i) {
        int k = 0;
        switch(i) {
            case 0:
                while (true) {
                    String j = "U";
                    if (this.us.findById(j + k).orElse(null) == null) return j + k;
                    else k++;
                }
            case 2:
                while (true) {
                    String j = "R";
                    if (this.re.findById(j + k).orElse(null) == null) return j + k;
                    else k++;
                }
            case 3:
                while (true) {
                    String j = "P";
                    if (this.pr.findById(j + k).orElse(null) == null) return j + k;
                    else k++;
                }
            case 4:
                while (true) {
                    String j = "O";
                    if (this.or.findById(j + k).orElse(null) == null) return j + k;
                    else k++;
                }
            default:
                return null;
        }
    }

    
}
