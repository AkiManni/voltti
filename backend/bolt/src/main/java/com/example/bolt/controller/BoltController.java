package com.example.bolt.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

import com.example.bolt.model.*;
import com.example.bolt.repository.*;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/bolt")
public class BoltController {
    @Autowired
    UserRepository us;
    @Autowired
    RestaurantRepository re;
    @Autowired
    ProductRepository pr;
    @Autowired
    OrderRepository or;

    DateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd:HH:mm:ss"); //yleinen aika formatti

    ///////////////////////////////////////USER///////////////////////////////////////////

    @GetMapping("/getUser")
    public List<User> getUsers() {
        return this.us.findAll();
    }

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
        else {
            this.us.deleteById(id);
        }
        return "Deleted user " + id + ".";
    }

    @PostMapping("/addRestaurantToUser")
    public String addRestaurantToUser(@RequestBody Map<String, String> variables) {
        User u = this.us.findById(variables.get("userID")).orElse(null);
        Restaurant r = this.re.findById(variables.get("restaurantID")).orElse(null);

        if (u == null) return "No user found.";
        else if (!u.isManager()) return "This feature is not allowed for customers.";
        else if (u.getRestaurant() != null) return "You already have restaurant.";
        else if (r == null) return "No restaurant found.";
        else {
            u.setRestaurant(r);
            this.us.save(u);
            return "(͠≖ ͜ʖ͠≖)👌";
        }
    }

    @DeleteMapping("/deleteRestaurantFromUser/{userID}")
    public String deleteRestaurantFromUser(@PathVariable String userID) {
        User u = this.us.findById(userID).orElse(null);

        if (u == null) return "No user found.";
        else if (u.getRestaurant() == null) return "No restaurant found.";
        else {
            u.setRestaurant(null);
            this.us.save(u);
            return "(👍≖‿‿≖)👍 👍(≖‿‿≖👍)";
        }
    }

    ///////////////////////////////////////RESTAURANT///////////////////////////////////////////

    @GetMapping("/getRestaurant")
    public List<Restaurant> getRestaurants() {
        return this.re.findAll();
    }

    @GetMapping("/getRestaurant/{id}")
    public Restaurant getRestaurant(@PathVariable("id") String id) {
        return this.re.findById(id).orElse(null);
    }

    @GetMapping(value="/getRestaurantByName/{name}")
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

    @GetMapping("/getProduct/{id}")
    public Product getProduct(@PathVariable("id") String id) {
        return this.pr.findById(id).orElse(null);
    }    

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

    @PostMapping("/addProductToRestaurant")
    public String addProductToRestaurant(@RequestBody Map<String, String> variables) {
        Product p = this.pr.findById(variables.get("productID")).orElse(null);
        Restaurant r = this.re.findById(variables.get("restaurantID")).orElse(null);

        if (r == null) return "No restaurant found.";
        else if (p == null) return "No product found.";
        else {
            List<String> menus = r.getMenus();
            for (String s : menus) {
                if (s == variables.get("productID")) return "This product already exists.";
            }
            menus.add(p.getProductID());
            r.setMenus(menus);
            this.re.save(r);
            p.setRestaurantID(r.getRestaurantID());
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
        else {
            List<String> menus = r.getMenus();
            for (String s : menus) {
                if (s == productID) {
                    menus.remove(new String(p.getProductID()));
                    r.setMenus(menus);
                    this.re.save(r);
                    return "(👍≖‿‿≖)👍 👍(≖‿‿≖👍)";
                }
            }
            return "This product doesn't exists in your menu.";
        }
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
    public Optional<Order> getOrderByUserID(@PathVariable("id") String id) {
        return this.or.findById(id);
    }

    @GetMapping(value="/getOrderByRestaurantID/{id}")
    public List<Order> getOrderByRestaurantID(@PathVariable("id") String id) {
        Restaurant r = this.re.findById(id).orElse(null);
        List<Order> list = new ArrayList<>();
        for (String s : r.getMenus()) {
            list.add(this.or.findByProductID(s).orElse(null));
        }
        return list;
    }
    
    @PostMapping("/addOrder")
    public Order addOrder(@RequestBody Map<String, String> ids) {
        Product p = this.pr.findById(ids.get("productID")).orElse(null);
        if (p == null) return null;

        Order o = new Order(
            generateID(4),
            ids.get("userID"),
            ids.get("productID"),
            dateFormat.format(Calendar.getInstance().getTime()),    //luo tämän hetkisen ajan
            "",
            Order.status.PLACED,
            "",
            5 + p.getPrice()
        );
        this.or.save(o);
        return o;
    }

    @GetMapping("/updateOrder/{id}")
    public String updateOrder(@PathVariable("id") String id) throws ParseException {
        Order o = this.or.findById(id).orElse(null);
        Product p = this.pr.findById(o.getProductID()).orElse(null);
        Restaurant r = this.re.findById(p.getRestaurantID()).orElse(null);

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
                
                r.setRestaurantBalance(r.getRestaurantBalance() + o.getTotalCost());
                this.re.save(r);
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
