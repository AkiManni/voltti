import React from 'react';
import styles from './SideBar.module.css'
import AddMenuItem from './AddMenuItem';

export default function SideBar(props){

    const overviewChange = (oId) => {
        props.overviewChange(oId)
    }

    const confirmOrder = () => {
        props.confirmOrder()
    }

    let managerOrderHistoryList = 
    <>
      <div className={styles.ManagerOrderHistoryListContainer}>
          ORDER HISTORY:
      
          <div className={styles.OrderHistoryList}>
              {props.orders.filter(order => order.orderStatus === 'PLACED' && order.restaurantId === props.restaurant.restaurantId ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className={styles.orderStatusPlaced}>{item.orderStatus}</b><br/><i>---Review and Confirm arrived---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}
              
              {props.orders.filter(order => order.orderStatus === 'IN_PREPARATION' && order.restaurantId === props.restaurant.restaurantId).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className={styles.orderStatusOnGoing}>IN PREPARATION</b> <b>Ready in:</b> <b className={styles.orderStatusOnGoing}>{item.prepareTime}</b><br/><i>---Cooking Takes Time---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH' && order.restaurantId === props.restaurant.restaurantId).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className={styles.orderStatusRDT}>READY TO DISPATCH</b><br/><i>---Waiting Courier to Pick up---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DISPATCHED' && order.restaurantId === props.restaurant.restaurantId).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className={styles.orderStatusOnGoing}>{item.orderStatus}</b> <b>Delivered in:</b> <b className={styles.orderStatusOnGoing}>{item.deliveryTime}</b><br/><i>---Voltman Is Delivering---</i> <br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DELIVERED' && order.restaurantId === props.restaurant.restaurantId).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className={styles.orderStatusDelivered}>{item.orderStatus}</b> <br/><i>---Waiting Customer to Confirm---</i><br/>
              {item.orderPlacedAt} - {item.customerName} <hr className={styles.hrList}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DONE' && order.restaurantId === props.restaurant.restaurantId).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <button onClick={() => overviewChange(item.id)}>View Order</button> <b>Order: {item.id}.</b> 
              <br/><b>Status: </b><b className={styles.orderStatusDone}>{item.orderStatus}</b> <br/>
              {item.orderPlacedAt}{item.customerName} <hr className={styles.hrList}/>
              </div>)}

          </div>
      </div>
    </>

    let orderHistory = 
    <>
    <div>

    </div>
    </>

    let orderQuickPreview = 
    <>
    <div>
          <div className={styles.OrderHistoryList}>
              {props.orders.filter(order => order.orderStatus === 'PLACED' && order.customerId === props.user.userId ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <b>Order {item.id}.</b> 
              <b> Status: </b><b className={styles.orderStatusPlaced}>{item.orderStatus}</b><br/><i>---Order is placed, waits Response---</i> <br/>
              <hr className={styles.hrList2}/>
              </div>)}
              
              {props.orders.filter(order => order.orderStatus === 'IN_PREPARATION' && order.customerId === props.user.userId ).map((item,index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <b>Order {item.id}.</b> 
              <b>Status: </b><b className={styles.orderStatusOnGoing}>IN PREPARATION</b> <b>Ready in:</b> <b className={styles.orderStatusOnGoing}>{item.prepareTime}</b><br/><i>---Cooking Takes Time---</i> <br/>
             <hr className={styles.hrList2}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH' && order.customerId === props.user.userId ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <b>Order {item.id}.</b> 
              <b> Status: </b><b className={styles.orderStatusRDT}> READY TO DISPATCH</b><br/><i>---Waiting Courier to Pick up---</i> <br/>
              <hr className={styles.hrList2}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DISPATCHED' && order.customerId === props.user.userId ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
              <b>Order {item.id}.</b> 
              <b> Status: </b><b className={styles.orderStatusOnGoing}>{item.orderStatus}</b> <b>Delivered in:</b> <b className={styles.orderStatusOnGoing}>{item.deliveryTime}</b><br/><i>---Voltman is Coming to You---</i> <br/>
              <hr className={styles.hrList2}/>
              </div>)}

              {props.orders.filter(order => order.orderStatus === 'DELIVERED' && order.customerId === props.user.userId ).map((item, index) => 
            <div className={styles.OrderHistoryListItems} key ={index}>
               <b>Order {item.id}.</b> 
              <b> Status: </b><b className={styles.orderStatusDelivered}>{item.orderStatus} </b> 
              <button onClick={() => confirmOrder()}>Confirm</button> <br/><i>---Confirm Received Order---</i><br/>
              <hr className={styles.hrList2}/>
              </div>)}


        </div>
    </div>
    </>

    let orderTemplateList =
    <>
    <div>
      {props.tempOrder.map((item, index) => 
      <div key={index}>
        <div>{item.id}. {item.foodName} - {item.price} € x {item.quantity}</div>
      </div>  
      )}
    </div>
    </>

        // SIDEBAR CONTENT ELEMENTS - PITÄÄ MIETTIÄ LISÄTÄÄNKÖ TOTEUTUKSET OMAAN LUOKKAAN?

    let shoppingCartQuickview =
    <>
    <div>{orderQuickPreview}
      <div className={styles.shoppingCart}>SHOPPING CART:
      <br/><br/>{orderTemplateList}</div>
      
    </div>
    <button className={styles.orderReviewButton}>Review Shopping Cart</button>
    </>

    let editRestaurantMenuQuickview = 
    <>
    <div>
          <AddMenuItem addNewMenuItem={props.addNewMenuItem}/>
    </div>
    </>
    



    let sideBar =
    <>
      <div className={styles.sideBar}>
      { props.shoppingCartQuickviewActive? <div>{ shoppingCartQuickview }</div> : <></>}
      { props.editRestaurantMenuQuickviewActive? <div>{ editRestaurantMenuQuickview }</div> : <></>}
      { props.managerOrderHistoryActive? <div>{managerOrderHistoryList}</div> : <></>}
      </div>
    </>




    return(
        <div>{sideBar}</div>
    );
}