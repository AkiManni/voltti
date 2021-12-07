package com.example.bolt.controller;


import java.security.Principal;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

<<<<<<< HEAD
import com.example.bolt.Register.login.AuthenticationRequest;
import com.example.bolt.Register.login.AuthenticationResponse;
import com.example.bolt.Register.login.JwtUtil;
import com.example.bolt.Register.login.UserRepository;
import com.example.bolt.model.Customer;
import com.example.bolt.model.ERole;
import com.example.bolt.model.Manager;
import com.example.bolt.model.Order;
import com.example.bolt.model.Product;
import com.example.bolt.model.Restaurant;
import com.example.bolt.model.Role;
import com.example.bolt.model.RoleRepository;
import com.example.bolt.model.Order.status;
import com.example.bolt.repository.CustomerRepository;
import com.example.bolt.repository.ManagerRepository;
import com.example.bolt.repository.OrderRepository;
import com.example.bolt.repository.ProductRepository;
import com.example.bolt.repository.RestaurantRepository;
=======
import com.example.bolt.model.*;
import com.example.bolt.repository.*;
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb

import org.json.JSONException;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
<<<<<<< HEAD

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
=======
import org.springframework.web.bind.annotation.CrossOrigin;
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
<<<<<<< HEAD

=======
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb

import org.springframework.web.bind.annotation.CrossOrigin;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/bolt")
@CrossOrigin(origins = "http://voltti.herokuapp.com/")
public class BoltController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AuthenticationManager authenticationManager;

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
       // String roles = authenticationRequest.getRoles();
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



        //Set<Role> moro = authenticationRequest.getRoles();
        // EnumSet roles = authenticationRequest.EnumSet.of
        Customer usermodel = new Customer();
        usermodel.setLoginCredential(logincredential);
        usermodel.setLoginPassword(new BCryptPasswordEncoder().encode(password));
        usermodel.setFname(firstname);
        usermodel.setLname(lastname);
        usermodel.setAddress(address);
        usermodel.setPostNum(postnum);
        usermodel.setRoles(roles);
        //Role userRole = roleRepository.findByRole("ADMIN");
       // usermodel.setRoles(new HashSet<>(Arrays.asList(userRole)));


        try {

            Customer arvo = userRepository.findByLoginCredential(usermodel.getLoginCredential());

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
                    userRepository.save(usermodel);
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
     

        //Customer user = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//Customer customer = (Customer) authentication.getPrincipal();
    //User userDetails = (User)principal;

//Customer mycustomer = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();

//SecurityContextHolder.getContext().setAuthentication(authentication);
 //Boolean arvoa = user.getIsmanager();
//Customer user = (Customer) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//Boolean balance = user.getIsmanager();
/*
Authentication loggedInUser = SecurityContextHolder.getContext().getAuthentication();
boolean jepjep = ((AuthenticationRequest) loggedInUser).getIsmanager();
 
    Authentication auth = SecurityContextHolder.getContext().getAuthentication();
 */   
//AuthenticationRequest moro = (AuthenticationRequest) authentication.getPrincipal();
//List<String> roles = moro.getAuthorities().stream()
//.map(item -> item.getAuthority())
//.collect(Collectors.toList());	
UserDetails userDetails = (UserDetails) authentication.getPrincipal();		
List<String> roles = userDetails.getAuthorities().stream()
				.map(item -> item.getAuthority())
				.collect(Collectors.toList());

 final String jwt = JwtUtil.generateToken(username);
    jsonObject.put("token", jwt);
    jsonObject.put("name", authentication.getName());
    jsonObject.put("Role", roles);

    //jsonObject.put("moro", arvoa);
   //jsonObject.put("ismanager", balance);

    /*


    

    CustomUserDetail myUserDetail = (CustomUserDetail) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
    Boolean arvo = myUserDetail.getUser().getUserDatabase().ismanager;


    UserDetails userDetails = (UserDetails) SecurityContextHolder.getContext().getAuthentication()
    .getPrincipal();
String test = userDetails.getPassword();
    */
    



        
         //return ResponseEntity.ok(new AuthenticationResponse(jwt));
         return ResponseEntity.ok(jsonObject.toString());
 

       }
       

       catch(JSONException e){
        //return ResponseEntity.ok(new AuthenticationResponse("virhe springbootin puolella, käyttäjätiedot eivät ole oikein"));
        jsonObject.put("exception", e.getMessage());
        return ResponseEntity.ok(e.getMessage());
       }
  
      


        
    }

    @Autowired
    private UserRepository us;
    @Autowired
    private RestaurantRepository re;
    @Autowired
    private ProductRepository pr;
    @Autowired
    private OrderRepository or;

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd:HH:mm:ss"); // yleinen aika formatti

<<<<<<< HEAD
    /////////////////////////////////////// CUSTOMER///////////////////////////////////////////
=======
    ///////////////////////////////////////USER///////////////////////////////////////////
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb

    @GetMapping("/getUser")
    public List<User> getUsers() {
        return this.us.findAll();
    }

<<<<<<< HEAD
    @GetMapping("/getCustomer/{id}")
    public Customer getCustomer(@PathVariable("id") String id) {
        Customer c = this.cu.findById(id).orElse(null);
        return c;
    }

    @RequestMapping("/hello")
    public String hello() {
        return "Hei vain";
    }

    /*
     * @PostMapping("/addCustomer")
     * public Customer addCustomers(@RequestBody Customer customer) {
     * Customer c = customer;
     * c.setCustomerID(generateID(0));
     * this.cu.save(c);
     * return c;
     * }
     */
    @DeleteMapping("/deleteCustomer/{id}")
    public String deleteCustomer(@PathVariable("id") String id) {
        if (this.cu.findById(id).isEmpty())
            return "No customer found.";
=======
    @GetMapping("/getUser/{id}")
    public User getUser(@PathVariable("id") final String id) {
        return this.us.findById(id).orElse(null);
    }

    @PostMapping("/addUser")
    public User addUsers(@RequestBody User user) {
        User u = user;
        u.setUserID(generateID(0));
        this.us.save(u);
        return u;
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable("id") String id) {
        if (this.us.findById(id).isEmpty()) return "No user found.";
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
        else {
            this.us.deleteById(id);
        }
<<<<<<< HEAD
        return "Deleted customer " + id + ".";
    }

    /////////////////////////////////////// MANAGER///////////////////////////////////////////

    @GetMapping("/getManager")
    public List<Manager> getManagers() {
        return this.ma.findAll();
    }

    @GetMapping("/getManager/{id}")
    public Manager getManager(@PathVariable("id") String id) {
        Manager r = this.ma.findById(id).orElse(null);
        return r;
    }

    @PostMapping("/addManager")
    public Manager addManager(@RequestBody Manager Manager) {
        Manager r = Manager;
        r.setManagerID(generateID(1));
        this.ma.save(r);
        return r;
    }

    @PostMapping("/addRestaurantToManager")
    public String addRestaurantToManager(@RequestBody Map<String, String> variables) {
        Manager m = this.ma.findById(variables.get("managerID")).orElse(null);
        Restaurant r = this.re.findById(variables.get("restaurantID")).orElse(null);

        if (m.equals(null))
            return "No manager found.";
        else if (m.getRestaurantID() != null)
            return "You already have restaurant.";
        else if (r.equals(null))
            return "No restaurant found.";
=======
        return "Deleted user " + id + ".";
    }

    @PostMapping("/addRestaurantToUser")
    public String addRestaurantToUser(@RequestBody Map<String, String> variables) {
        User u = this.us.findById(variables.get("userID")).orElse(null);
        Restaurant r = this.re.findById(variables.get("restaurantID")).orElse(null);

        if (u == null) return "No user found.";
        if (!u.isIsmanager()) return "This feature is not allowed for customers.";
        else if (u.getRestaurant() != null) return "You already have restaurant.";
        else if (r == null) return "No restaurant found.";
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
        else {
            u.setRestaurant(r);
            this.us.save(u);
            return u.toString();
        }
    }

    @DeleteMapping("/deleteRestaurantFromUser/{userID}")
    public String deleteRestaurantFromUser(@PathVariable String userID) {
        User u = this.us.findById(userID).orElse(null);

<<<<<<< HEAD
        if (m.equals(null))
            return "No manager found.";
        else if (m.getRestaurantID().equals(null))
            return "No restaurant found.";
=======
        if (u == null) return "No user found.";
        else if (u.getRestaurant() == null) return "No restaurant found.";
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
        else {
            u.setRestaurant(null);
            this.us.save(u);
            return u.toString();
        }
    }

<<<<<<< HEAD
    @DeleteMapping("/deleteManager/{id}")
    public String deleteManager(@PathVariable("id") String id) {
        if (this.ma.findById(id).isEmpty())
            return "No Manager found.";
        else {
            this.ma.deleteById(id);
        }
        return "Deleted Manager " + id + ".";
    }

    /////////////////////////////////////// RESTAURANT///////////////////////////////////////////
=======
    ///////////////////////////////////////RESTAURANT///////////////////////////////////////////
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb

    @GetMapping("/getRestaurant")
    public List<Restaurant> getRestaurants() {
        return this.re.findAll();
    }

    @GetMapping("/getRestaurant/{id}")
    public Restaurant getRestaurant(@PathVariable("id") String id) {
<<<<<<< HEAD
        Restaurant r = this.re.findById(id).orElse(null);
        return r;
=======
        return this.re.findById(id).orElse(null);
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
    }

    @GetMapping(value = "/getRestaurantByName/{name}")
    public Restaurant getRestaurantByName(@PathVariable("name") String name) {
        return this.re.findByName(name);
    }

    @GetMapping(value="/getRestaurantByFoodType/{type}")
    public List<Restaurant> getRestaurantByFoodType(@PathVariable("type") String type) {
        List<Restaurant> r = new ArrayList<>();
        List<Product> products = this.pr.findByType(type.toUpperCase());
        for (Product p : products) {
            if (p.getFoodType().toString().equalsIgnoreCase(type)) r.add(this.re.findById(p.getRestaurantID()).orElse(null));
        }
        return r;
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
        if (this.re.findById(id).isEmpty())
            return "No restaurant found.";
        else {
            this.re.deleteById(id);
        }
        return "Deleted restaurant " + id + ".";
    }

    /////////////////////////////////////// PRODUCT///////////////////////////////////////////

    @GetMapping("/getProduct")
    public List<Product> getProducts() {
        return this.pr.findAll();
    }

    @GetMapping("/getProduct/{id}")
    public Product getProduct(@PathVariable("id") String id) {
<<<<<<< HEAD
        Product p = this.pr.findById(id).orElse(null);
        return p;
    }
=======
        return this.pr.findById(id).orElse(null);
    }    
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb

    @GetMapping(value="/getFoodByName/{name}")
    public Product getFoodByName(@PathVariable("name") String name) {
        return this.pr.findByName(name);
    }

    @GetMapping(value="/getFoodByRestaurantID/{id}")
    public List<Product> getFoodByRestaurantID(@PathVariable("id") String id) {
        return this.pr.findByRestaurantID(id);
    }

    @GetMapping(value="/getFoodByRestaurantName/{name}")
    public List<Product> getFoodByRestaurantName(@PathVariable("name") String name) {
        Restaurant r = this.re.findByName(name);
        return this.pr.findByRestaurantID(r.getRestaurantID());
    }

    @PostMapping("/addProduct")
    public Product addProduct(@RequestBody Product Product) {
        Product p = Product;
        p.setProductID(generateID(3));
        p.setName(p.getName().replace(" ", "_"));
        this.pr.save(p);
        return p;
    }

    //koodi on *****

    @PostMapping("/addProductToRestaurant")
    public String addProductToRestaurant(@RequestBody Map<String, String> variables) {
        Product p = this.pr.findById(variables.get("productID")).orElse(null);
        Restaurant r = this.re.findById(variables.get("restaurantID")).orElse(null);

<<<<<<< HEAD
        if (r.equals(null))
            return "No restaurant found.";
        else if (p.equals(null))
            return "No product found.";
        else {
            List<String> menus = r.getMenus();
            for (String s : menus) {
                if (s.equals(variables.get("productID")))
                    return "This product already exists.";
=======
        if (r == null) return "No restaurant found.";
        else if (p == null) return "No product found.";
        else {
            List<Product> menus = r.getMenus();
            for (Product item : menus) {
                if (item == p) return "This product already exists.";
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
            }
            r.addMenus(p);
            p.setRestaurantID(r.getRestaurantID());
            this.re.save(r);
            this.pr.save(p);
            return "(͠≖ ͜ʖ͠≖)👌";
        }
    }

    @DeleteMapping("/deleteProductFromRestaurant/{restaurantID}/{productID}")
    public String deleteProductFromRestaurant(@PathVariable("restaurantID") String restaurantID,
            @PathVariable("productID") String productID) {
        Restaurant r = this.re.findById(restaurantID).orElse(null);
        Product p = this.pr.findById(productID).orElse(null);

<<<<<<< HEAD
        if (r.equals(null))
            return "No restaurant found.";
        else if (p.equals(null))
            return "No product found.";
        else {
            List<String> menus = r.getMenus();
            for (String s : menus) {
                if (s.equals(productID)) {
                    menus.remove(new String(p.getProductID()));
                    r.setMenus(menus);
                    this.re.save(r);
                    return "(👍≖‿‿≖)👍 👍(≖‿‿≖👍)";
                }
=======
        if (r == null) return "No restaurant found.";
        else if (p == null) return "No product found.";
        List<Product> menus = r.getMenus();
        for (Product item : menus) {
            if (item.equals(p)) {
                menus.remove(p);
                r.setMenus(menus);
                p.setRestaurantID(null);
                this.pr.save(p);
                this.re.save(r);
                return r.toString();
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
            }
        }
        return "This product doesn't exists in your menu.";
    }

    @DeleteMapping("/deleteProduct/{id}")
    public String deleteProduct(@PathVariable("id") String id) {
        if (this.pr.findById(id).isEmpty())
            return "No product found.";
        else {
            this.pr.deleteById(id);
        }
        return "Deleted user " + id + ".";
    }

    /////////////////////////////////////// ORDER///////////////////////////////////////////

    @GetMapping("/getOrder")
    public List<Order> getOrders() {
        return this.or.findAll();
    }

    @GetMapping("/getOrder/{id}")
    public Order getOrder(@PathVariable("id") String id) {
<<<<<<< HEAD
        Order o = this.or.findById(id).orElse(null);
        return o;
=======
        return this.or.findById(id).orElse(null);
    }

    @GetMapping(value="/getOrderByUserID/{id}")
    public List<Order> getOrderByUserID(@PathVariable("id") String id) {
        return this.or.findByUserID(id);
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
    }

    @GetMapping(value="/getOrdersByRestaurantID/{id}")
    public List<Order> getOrdersByRestaurantID(@PathVariable("id") String id) {
        return this.or.findByRestaurantID(id);
    }
    
    @PostMapping("/addOrder")
    public Order addOrder(@RequestBody Map<String, String> ids) {
        Product p = this.pr.findById(ids.get("productID")).orElse(null);
<<<<<<< HEAD
        if (p.equals(null))
            return null;

        Order o = new Order(
                generateID(4),
                ids.get("customerID"),
                ids.get("productID"),
                dateFormat.format(Calendar.getInstance().getTime()), // luo tämän hetkisen ajan
                "",
                status.PLACED,
                "",
                5 + p.getPrice());
=======
        if (p == null) return null;

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
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
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
<<<<<<< HEAD

                r.setRestaurantBalance(r.getRestaurantBalance() + o.getTotalCost());
                this.re.save(r);
=======
                
                for (Product products : o.getProducts()) {
                    Product p = products;
                    Restaurant r = this.re.findById(p.getRestaurantID()).orElse(null);
                    r.setRestaurantBalance(r.getRestaurantBalance() + o.getTotalCost());
                    this.re.save(r);
                }
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
                return "Order is finished.";
            case DONE:
                return "Order is already finished.";
            default:
                return "No orders found.";
        }
    }

    /////////////////////////////////////// EXTRA///////////////////////////////////////////

    private String getTimeDifference(String orderTime) throws ParseException {
        long difference = System.currentTimeMillis() - dateFormat.parse(orderTime).getTime();
        return String.format(
                "%02d:%02d:%02d",
                TimeUnit.MILLISECONDS.toHours(difference),
                TimeUnit.MILLISECONDS.toMinutes(difference)
                        - TimeUnit.HOURS.toMinutes(TimeUnit.MILLISECONDS.toHours(difference)),
                TimeUnit.MILLISECONDS.toSeconds(difference)
                        - TimeUnit.MINUTES.toSeconds(TimeUnit.MILLISECONDS.toMinutes(difference)));
    }

    // Tarkistaa ja luo uuden tyhjän id:n
    private String generateID(int i) {
        int k = 0;
        switch (i) {
            case 0:
                while (true) {
<<<<<<< HEAD
                    String j = "C";
                    if (this.cu.findById(j + k).orElse(null) == null)
                        return j + k;
                    else
                        k++;
                }
            case 1:
                while (true) {
                    String j = "M";
                    if (this.ma.findById(j + k).orElse(null) == null)
                        return j + k;
                    else
                        k++;
=======
                    String j = "U";
                    if (this.us.findById(j + k).orElse(null) == null) return j + k;
                    else k++;
>>>>>>> 11dc44e5d5b33f44152c367653b44fc073be52bb
                }
            case 2:
                while (true) {
                    String j = "R";
                    if (this.re.findById(j + k).orElse(null) == null)
                        return j + k;
                    else
                        k++;
                }
            case 3:
                while (true) {
                    String j = "P";
                    if (this.pr.findById(j + k).orElse(null) == null)
                        return j + k;
                    else
                        k++;
                }
            case 4:
                while (true) {
                    String j = "O";
                    if (this.or.findById(j + k).orElse(null) == null)
                        return j + k;
                    else
                        k++;
                }
            default:
                return null;
        }
    }
}
