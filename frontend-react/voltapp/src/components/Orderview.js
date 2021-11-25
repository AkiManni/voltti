import React from 'react'

import styles from './Orderview.module.css'

export default function Orderview(props){



    const getSum = (arr, key) => {
        return arr.reduce((acc, cur) => acc + Number(cur[key]), 0)
     }

    const statusText = (text) => {
        
        switch(text) {
            case "PLACED":
                return <b className="orderStatusPlaced">PLACED</b>
            case "IN_PREPARATION":
                return <b className="orderStatusOnGoing">IN PREPARATION</b>
            case "READY_TO_DISPATCH":
                return <b className="orderStatusRDT">READY TO DISPATCH</b>
            case "DISPATCHED":
                return <b className="orderStatusOnGoing">DISPATCHED</b>
            case "DELIVERED":
                return <b className="orderStatusDelivered">DELIVERED</b> 
            case "DONE":
                return <b className="orderStatusDone">DONE</b>
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
                <b>Customer id:</b><br/>
                { order.customerId }<br/>
                <b>Customer Name:</b><br/>
                { order.customerName }<br/>
                <b>Address:</b> <br/>
                { order.address }, {order.postNumber}<br/>
                <br/>
                <b>Order Placed:</b> <br/>{ order.orderPlacedAt } DD/MM/YYYY<br/>
                <b>Order Prepared:</b> <br/>{ order.orderPreparedAt } DD/MM/YYYY<br/>
                <b>Order Dispatched:</b> <br/>{ order.orderDispatchedAt } DD/MM/YYYY<br/>
                <b>Order Delivered:</b> <br/>{ order.orderDeliveredAt } DD/MM/YYYY<br/>
                <b>Order Confirmed Done:</b> <br/>{ order.orderDoneAt } DD/MM/YYYY<br/>
                <br/>
                <b>Products Ordered:</b>
                {order.productsOrdered.map((product, i) => 
                <dl key={i}><dt>{product.id}. - {product.name} - {product.price}€</dt></dl>
                )}
                <br/>
                <b>Total Payment:</b> { getSum(order.productsOrdered, 'price')}€          
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