import React from 'react';
import styles from './SideBar.module.css'
import AddMenuItem from './AddMenuItem'
import EditCustomer from './EditCustomer'

export default function SideBar(props){

    const overviewChange = (value) => {
        props.overviewChange(value)
    }

    const confirmOrder = (orderID) => {
        props.confirmOrder(orderID)
    }

    const reduceFromOrder = (productID, restaurantID) => {
       props.reduceFromOrder(productID, restaurantID)
    }

    const previewOrderActivate = () => {
      props.previewOrderActivate()
    }

    let customerOrderHistoryList = 
    <>
    <div className={styles.ManagerOrderHistoryListContainer}>
          ORDER HISTORY:
      
          <div className={styles.OrderHistoryList}>
              {props.orders.filter(order => order.orderStatus === 'PLACED' ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.orderID)}>View Order</button> <br/>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusPlaced}>{item.orderStatus}</b><br/>
              <i>---Review and Confirm arrived---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}
              
              {props.orders.filter(order => order.orderStatus === 'IN_PREPARATION').map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusOnGoing}>PREPARED</b> <b>Ready in: </b> 
              <b className={styles.orderStatusOnGoing}>{item.prepareTime}</b><b> s</b><br/>
              <i>---Cooking Takes Time---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH').map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusRDT}>READY TO DISPATCH</b><br/>
              <i>---Waiting Courier to Pick up---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DISPATCHED').map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusOnGoing}>{item.orderStatus}</b> <b>Delivered in: </b> 
              <b className={styles.orderStatusOnGoing}>{item.deliveryTime}</b> <b>s</b><br/>
              <i>---Voltman is Coming to You---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DELIVERED').map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusDelivered}>{item.orderStatus}</b> <br/>
              <i>---Confirm Received Order---</i><br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DONE').map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusDone}>{item.orderStatus}</b> <br/>
              <i>---You've Confirmed Order Received---</i><br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

          </div>
      </div>
    </>

    let managerOrderHistoryList = 
    <>
      <div className={styles.ManagerOrderHistoryListContainer}>
          ORDER HISTORY:
      
          <div className={styles.OrderHistoryList}>
              {props.orders.filter(order => order.orderStatus === 'PLACED' ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusPlaced}>{item.orderStatus}</b><br/><i>---Order is placed, waits Staff Response---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}
              
              {props.orders.filter(order => order.orderStatus === 'IN_PREPARATION' ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusOnGoing}>PREPARED</b> <b>Ready in:</b> <b className={styles.orderStatusOnGoing}>{item.prepareTime}</b><b> s</b><br/><i>---Cooking Takes Time---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH' ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusRDT}>READY TO DISPATCH</b><br/><i>---Waiting Courier to Pick up---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DISPATCHED' ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusOnGoing}>{item.orderStatus}</b> <b>Delivered in:</b> <b className={styles.orderStatusOnGoing}>{item.deliveryTime}</b> <b>s</b><br/><i>---Voltman Is Delivering---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DELIVERED' ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusDelivered}>{item.orderStatus}</b> <br/><i>---Waiting Customer to Confirm---</i><br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DONE' ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <br/><b>Order: {item.orderID}. </b> 
              <b className={styles.orderStatusDone}>{item.orderStatus}</b> <br/><i>---Order Is Complete---</i><br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

          </div>
      </div>
    </>

    let orderQuickPreview = 
    <>
    <div>
          <div className={styles.OrderHistoryList}>
              {props.orders.filter(order => order.orderStatus === 'PLACED' ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order {item.orderID}.</b> 
              <b className={styles.orderStatusPlaced}> {item.orderStatus}</b><br/>
              <i>---Order is placed, waits Staff Response---</i> <br/>
              <hr className={styles.hrList2}/>
              </div>)}
              
              {props.orders.filter(order => order.orderStatus === 'IN_PREPARATION' ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order {item.orderID}.</b> 
              <b className={styles.orderStatusOnGoing}> IN PREPARATION</b> <b>Ready in: </b> 
              <b className={styles.orderStatusOnGoing}>{item.prepareTime}</b> <b>s</b><br/><i>---Cooking Takes Time---</i> <br/>
             <hr className={styles.hrList2}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH' ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order {item.orderID}.</b> 
              <b className={styles.orderStatusRDT}> READY TO DISPATCH</b><br/><i>---Waiting Courier to Pick up---</i> <br/>
              <hr className={styles.hrList2}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DISPATCHED' ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order {item.orderID}.</b> 
              <b className={styles.orderStatusOnGoing}> {item.orderStatus}</b> <b>Delivered in: </b> 
              <b className={styles.orderStatusOnGoing}> {item.deliveryTime}</b> <b>s</b><br/><i>---Voltman is Coming to You---</i> <br/>
              <hr className={styles.hrList2}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DELIVERED' ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
               <b className={styles.restaurantTotalText}>{item.restaurantName}</b><br/><b>Order {item.orderID}.</b> 
               <b className={styles.orderStatusDelivered}> {item.orderStatus} </b> 
              <button onClick={() => confirmOrder(item.orderID)}>Confirm</button> <br/><i>---Confirm Received Order---</i><br/>
              <hr className={styles.hrList2}/>
              </div>)}


        </div>
    </div>
    </>

    const templateOfOrder = () => {

      var ref = {};

      var res = props.tempOrder.reduce(function(arr, o) {

        if (ref.hasOwnProperty(o.restaurantId)){

          arr[ref[o.restaurantId]].push(<div className={styles.orderPreviewList} key={o.productID}> 
          <button onClick={() => reduceFromOrder(o.id, o.restaurantId)}>-</button> <b>{o.quantity}</b> x {o.foodName} - {o.price} € </div>);
          
      }
        else {

          ref[o.restaurantId] = arr.length;
          {arr.push([<div className={styles.orderPreviewListRestaurantName}><b>{o.restaurantName}</b></div>])}
          
          arr.push([o].map((item) => <div className={styles.orderPreviewList} key={item.productID}>
          <button onClick={() => reduceFromOrder(item.id, item.restaurantId)}>-</button> <b>{item.quantity}</b> x {item.foodName} - {item.price} € </div>));
          arr.push(<hr className={styles.orderHorizontal}/>);
          
          arr.push(<div className={styles.totalPriceOfRestaurant}>
          <text className={styles.restaurantTotalText}>Restaurant Total: </text>
          <b>{props.orderPrices.filter((item) => item.id === o.restaurantId).map(item => item.price)}</b> <b className={styles.euromark}>€</b></div>)
          
        }
        
        return arr;
        
      }, []);

      return res
    }


    
    
    let orderTemplateList =
    <>
    <div className={styles.shoppingCartContentContainer}>
      {templateOfOrder()}
      <hr className={styles.totalPriceHorizontalLine}/>
      <text className={styles.totalPricePrice}><b>Total of: </b>
      <b className={styles.totalPrice}> {props.tempOrder.map(function(x) {return x.price * x.quantity}).reduce((prev,curr) => prev + curr, 0)}</b> <b>€</b></text>
    </div>
    </>



    let shoppingCartQuickview =
    <>
    <div className={styles.cartContainer}>
    <div>{orderQuickPreview}</div>
      <div className={styles.shoppingCart}>SHOPPING CART:
      <br/>{orderTemplateList}</div>
      
    </div>
    <button onClick={() => previewOrderActivate() }>Review Shopping Cart</button>
    </>

    let editRestaurantMenuQuickview = 
    <>
    <div>
          <AddMenuItem/>
    </div>
    </>
    
    let editCustomerInfo = 
    <>
    <div>
          <EditCustomer Useri={props.Useri}/>
    </div>
    </>

    let sideBar =
    <>
      <div className={styles.sideBar}>
      { props.shoppingCartQuickviewActive? <div>{ shoppingCartQuickview }</div> : <></>}
      { props.editUserActive?<div>{ editCustomerInfo }</div> : <></>}
      { props.editRestaurantMenuQuickviewActive? <div>{ editRestaurantMenuQuickview }</div> : <></>}
      { props.managerOrderHistoryActive? <div>{managerOrderHistoryList}</div> : <></>}
      { props.customerOrderHistoryActive? <div>{ customerOrderHistoryList }</div> : <></>}
      { props.actionString === "ORDERPREVIEW" && props.role !== "CUSTOMER"?<div><br/>You need to be <b><u>Logged In</u></b><br/>to be able to see Customer Orderlisting<br/>or to place an Order.</div> : <></>}
      { props.orderPreviewActive && props.role === "CUSTOMER"?<div className={styles.ManagerOrderHistoryListContainer}>{orderQuickPreview}</div> : <></>}
      </div>
    </>




    return(
        <div>{sideBar}</div>
    );
}