import React from 'react';
import styles from './ContentContainer.module.css'
import MenuView from './MenuView';
import SearchView from './SearchView';
import Orderview from './Orderview';
import CreateRestaurant from './CreateRestaurant';
import { useState } from 'react';
import axios from 'axios'

export default function ContentContainer(props){

  const [alternativeAddress,setAlternativeAddress] = useState("");
  const [alternativePostNumber,setAlternativePostNumber] = useState("");          
  
  const scrollTop = () => {

    let contentContainerTemporaryDocument = document.getElementById("ContentContainer")
    window.scrollTo(0, 0);
    
    if(contentContainerTemporaryDocument){
      document.getElementById("ContentContainer").scrollTo(0, 0)
    }
    defaultScrollActivate()
    }

  const defaultScrollActivate = () => {
      props.defaultScrollActivate()
    }

  const makeOrder = (customerId,restaurantId,restaurantName,customerName,address,postnumber,totalCost, productsOrdered) => {
      //console.log(customerId,restaurantId,restaurantName,customerName,address,postnumber,totalCost, productsOrdered, prepareTime, deliveryTime)
      
      axios({
        method:'post',
        url:'https://voltti.herokuapp.com/bolt/addOrder',
        data: 
        {
          userID: customerId,
          restaurantID: restaurantId,
          restaurantName:restaurantName,
          customerName: customerName,
          address: address,
          postNumber: postnumber,
          totalCost: totalCost,
          products: productsOrdered,
          // prepareTime: prepareTime,
          // deliveryTime: deliveryTime 
        }
      });
      
      // BACKEND ORDER POHJA:
      //----------------------
      // private String orderID;
      // private String userID;
      // private String restaurantID;
      // private List<Product> products;
      // private String orderTime;
      // private String orderDelivered;
      // private status orderStatus;
      // private String totalPrepareTime;
      // private float totalCost;

  }

  const clearOrderFromTempOrder = (rId) => {
    props.clearOrderFromTempOrder(rId)
  }

  const compileOrdersAndSend = (rId) => {

    if(alternativeAddress === "" && alternativePostNumber === ""){

      if(props.Useri.role === "CUSTOMER"){
  
        var ref = {};
    
        var res = props.tempOrder.reduce(function(arr, o) {
          
          if (ref.hasOwnProperty(o.restaurantId))
          
            
            arr[ref[o.restaurantId]].push(o);
          
          else {
            ref[o.restaurantId] = arr.length;
            
            arr.push([o]);
          }
          
          return arr;
          
        }, []);
    
    
        
        for(const element of res){ 
        if(rId === element[0].restaurantId){
            
                makeOrder(props.Useri.userID,element[0].restaurantID,element[0].restaurantName,props.Useri.fname + " " + 
                props.Useri.lname,props.Useri.address,props.Useri.postNum,props.orderPrices.filter((item) => item.id === element[0].restaurantId).map(item => item.price+5),element)
                //props.user.surName,alternativeAddress,alternativePostNumber,props.orderPrices.filter((item) => item.id === element[0].restaurantId).map(item => item.price+5),element,20,props.user.deliveryTime)
                };
              clearOrderFromTempOrder(rId)
            }
        }
        
        else{
          alert("You need to Login first.")
        }
     }

     if(alternativeAddress !== "" && alternativePostNumber !== "" && alternativePostNumber !==""){

      if (!Number.isInteger(parseInt(alternativePostNumber))){
        alert("Postnumber must be a number!")
      }
      else{
        if(props.role === "CUSTOMER"){
  
          var ref = {};
      
          var res = props.tempOrder.reduce(function(arr, o) {
            
            if (ref.hasOwnProperty(o.restaurantId))
            
              
              arr[ref[o.restaurantId]].push(o);
            
            else {
              ref[o.restaurantId] = arr.length;
              
              arr.push([o]);
            }
            
            return arr;
            
          }, []);
      
      
          
          for(const element of res){ 
          if(rId === element[0].restaurantId){
              
                  makeOrder(props.Useri.userId,element[0].restaurantId,element[0].restaurantName,props.Useri.fname + " " + 
                  props.Useri.lname,alternativeAddress,alternativePostNumber,props.orderPrices.filter((item) => item.id === element[0].restaurantId).map(item => item.price+5),element)
                  //props.user.surName,alternativeAddress,alternativePostNumber,props.orderPrices.filter((item) => item.id === element[0].restaurantId).map(item => item.price+5),element,20,props.user.deliveryTime)
                  };
                clearOrderFromTempOrder(rId)
              }
          }
          
          else{
            alert("You need to Login first.")
          }


      }

      }
    }

  const templateOfOrder = () => {
    
    if(props.defaultScroll === true){
      scrollTop();
    }
    
    var ref = {};

    var res = props.tempOrder.reduce(function(arr, o) {
      
      if (ref.hasOwnProperty(o.restaurantId)){
      
        arr[ref[o.restaurantId]].push(<div className={styles.orderPreviewList} key={o.id}> 
        <button onClick={() => reduceFromOrder(o.id, o.restaurantId)}>-</button> <b>{o.quantity}</b> x {o.foodName} <i>{o.description}</i> - {o.price} € </div>);
      
    }
      else {

        ref[o.restaurantId] = arr.length;
        {arr.push([<div className={styles.orderPreviewListRestaurantName}><b>{o.restaurantName}</b></div>])}
        
        arr.push([o].map((item) => <div className={styles.orderPreviewList} key={item.id}>
        <button onClick={() => reduceFromOrder(item.id, item.restaurantId)}>-</button> <b>{item.quantity}</b> x {item.foodName} <i>{item.description}</i> - {item.price} € </div>));
        arr.push(<hr className={styles.orderHorizontal}/>);
        
        arr.push(<div className={styles.totalPriceOfRestaurant}>
        <text className={styles.restaurantTotalText}>Restaurant Total + <b>5 €</b> for the delivery: </text>
        <b>{props.orderPrices.filter((item) => item.id === o.restaurantId).map(item => item.price+5)}</b> <b className={styles.euromark}>€</b>
        <br/><button onClick={() => compileOrdersAndSend(o.restaurantId)}>Place Order</button></div>)
        
      }
      
      return arr;
      
    }, []);

    return res
  }

  const reduceFromOrder = (value, restaurantId) => {
    props.reduceFromOrder(value, restaurantId)
 }

    let searchResults = 
    <>
    <div>
      PRODUCTS:
          <SearchView
          addToOrder={props.addToOrder}
          items={props.items.filter((item) => 
            (item.category.toLowerCase().includes(props.productSearchString.toLowerCase())||
            (item.restaurantName.toLowerCase().includes(props.productSearchString.toLowerCase()))||
            (item.name.toLowerCase().includes(props.productSearchString.toLowerCase())))) }
            
          />
    </div>
    </>

    let orderPreview =
    <>
    <div id="contentcontainer">
      PRODUCTS TO BE ORDERED:<br/><br/>
      <text className={styles.orderinfoText}>if you want to order the products elsewhere, <br/>
      please include alternative address info:</text><br/>
      <input type="text" placeholder={props.Useri.address} minLength = "10" 
                onChange={ (event) => setAlternativeAddress(event.target.value) }></input> - <input type="text" placeholder={props.Useri.postNumber} minLength = "10" className={ styles.alternativeAddress } 
                onChange={ (event) => setAlternativePostNumber(event.target.value) }></input>
      { templateOfOrder() }
    </div>
    </>

    let editUserForm =
    <>
    <div>

    </div>
    </>

    let managerOrderHistoryOverview = 
    <>
    <div>
      
            
    </div>
    </>

    let registerForm =
    <>
    <div>

    </div>
    </>

    let editRestaurantForm =
    <>
    <div>

    </div>
    </>

    let searchProductsByRestaurant = 
    <>
    <div>
        <MenuView items={ props.items.filter((item) => 
            (item.restaurantID === props.Restaurant.restaurantID))}
        />
    </div>
    </>


    let contentContainer =
      <>
        <div id="contentcontainer" className={styles.contentContainer}>

        { props.searchResultsActive ? <div>{ searchResults }</div> : <></>}
        { props.editUserActive ? <div>{ editUserForm }</div> : <></>}
        { props.registerUserActive ? <div>{ registerForm }</div> : <></>}
        { props.editRestaurantActive ? <div>{ editRestaurantForm }</div> : <></>}
        { props.editRestaurantMenuActive ? <div>{ searchProductsByRestaurant }</div> : <></>}
        { props.managerOrderHistoryActive ? <div>{managerOrderHistoryOverview}</div> : <></>}
        { props.orderPreviewActive ? <div>{orderPreview}</div> : <></>}
        { props.orderviewActive? <Orderview orders={props.orders} overviewId={props.overviewId}/> : <></>}
        { props.createRestaurant || props.editRestaurantActive? <CreateRestaurant addNewRestaurant = { props.addNewRestaurant } createRestaurant={props.createRestaurant}
      editRestaurantActive={props.editRestaurantActive} editRestaurant = {props.editRestaurant} defaultActivate = {props.defaultActivate} /> : <> </>}
        </div>
      </>

    return(
        <div>{contentContainer}</div>
     );
 }