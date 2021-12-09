import React from 'react'

import styles from './Orderview.module.css'

export default function Orderview(props){


    const statusText = (text) => {
        
        switch(text) {
            case "PLACED":
                return <b className={styles.orderStatusPlaced}>PLACED</b>
            case "IN_PREPARATION":
                return <b className={styles.orderStatusOnGoing}>IN PREPARATION</b>
            case "READY_TO_DISPATCH":
                return <b className={styles.orderStatusRDT}>READY TO DISPATCH</b>
            case "DISPATCHED":
                return <b className={styles.orderStatusOnGoing}>DISPATCHED</b>
            case "DELIVERED":
                return <b className={styles.orderStatusDelivered}>DELIVERED</b> 
            case "DONE":
                return <b className={styles.orderStatusDone}>DONE</b>
            default:
                return null;
                
        }
        
    }
     
    let orderview = (
       
        <div className={styles.orderDetailsContainer} >   

        { props.orders.filter(order => order.id === props.overviewId).map((order, index) => 
            <div key={index}>
                <u><b>Order { order.id }.</b></u>  <br/>
                
                Status: {statusText(order.orderStatus)} <br/><br/>
                <b>Restaurant id:</b> <br/>{ order.restaurantId } <br/>
                <b>Restaurant Name:</b> <br/>{ order.restaurantName } <br/>
                <b>Customer id:</b><br/>
                { order.customerId }<br/>
                <b>Customer Name:</b><br/>
                { order.customerName }<br/>
                <b>Address:</b> <br/>
                { order.address }, {order.postNumber}<br/>
                <br/>
                <b>Order Placed:</b> <br/><text className={styles.orderTime}>{ order.orderPlacedAt }</text><br/>
                <b>Order Prepared:</b> <br/><text className={styles.orderTime}>{ order.orderPreparedAt } </text><br/>
                <b>Order Dispatched:</b> <br/><text className={styles.orderTime}>{ order.orderDispatchedAt } </text><br/>
                <b>Order Delivered:</b> <br/><text className={styles.orderTime}>{ order.orderDeliveredAt } </text><br/>
                <b>Order Confirmed Done:</b> <br/><text className={styles.orderTime}>{ order.orderDoneAt } </text><br/>
                <br/>
                <b>Products Ordered:</b>
                {order.productsOrdered.map((product, i) => 
                <dl key={i}><dt><b className={styles.orderTime}>{product.quantity}</b> x <b>{product.id}.</b> {product.foodName} <b>-</b> {product.price} €</dt></dl>
                )}
                <br/>
                <b>Total Payment including Delivery:</b> <b className={styles.orderStatusOnGoing}>{ order.totalCost } </b><b>€</b>          
            </div>
        )}
        </div>
    );
    

    return (
        <div>
            {orderview}
        </div>
    );
}