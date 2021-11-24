import React from 'react'
import styles from './ManagerView.module.css'

export default function ManagerView(props){



const moveToPreparation = (orderId) => {
            props.moveToPreparation(orderId);
        }

const setToDispatched = (orderId) => {
            props.setToDispatched(orderId);
        }

        
const getSum = (arr, key) => {
            return arr.reduce((acc, cur) => acc + Number(cur[key]), 0)
         }


let ordersReceived = 
    

        props.orders.filter(order => order.orderStatus === 'PLACED' && order.restaurantId === 3).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ol><b>Order {orderItem.id}. {orderItem.customerName}</b></ol> 
        {orderItem.productsOrdered.map((item,i) => <ol key={i}><li>{item.id}. - {item.name} - {item.price}€</li></ol>)}
        
        

        <hr></hr><ol><b>Total of:</b> { getSum(orderItem.productsOrdered, 'price')}€ <button onClick={() => moveToPreparation(orderItem.id)}>Prepare</button></ol>
        </div>
        )


let preparedOrders = 
        
        props.orders.filter(order => order.orderStatus === 'IN_PREPARATION' && order.restaurantId === 3).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ul><b>Order {orderItem.id}. - {orderItem.customerName}</b></ul>
        {orderItem.productsOrdered.map((item,i) => <ol key={i}><li>{item.id}. - {item.name} - {item.price}€</li></ol>)}
        <hr></hr>
        <ul><b>Prepared in:</b> {orderItem.prepareTime}s</ul>
        </div>

        )

let readyToDispatch =
    
        props.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH' && order.restaurantId === 3).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ol><b>Order {orderItem.id}. Ready To Deliver</b></ol>
        <ol>{orderItem.Address}, {orderItem.postNumber} </ol> <hr></hr><ol><button onClick={() => setToDispatched(orderItem.id)}>Dispatch</button></ol>
        </div>
        )

let dispatchedOrders = 
    
        props.orders.filter(order => order.orderStatus === 'DISPATCHED' && order.restaurantId === 3).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ul><b>Order {orderItem.id}.</b></ul> <ol> {orderItem.Address}, {orderItem.postNumber} </ol><hr></hr> <ol><b>Delivered in:</b> {orderItem.deliveryTime}s</ol>
        </div>
        )


return(
<div>
    <div className={ styles.divContainer }>
        
        <div className={ styles.divContainer }>
            <div className={ styles.firstContainer }>
                <u>Orders:</u>
               <div className={ styles.contentBox }>
                { ordersReceived }
                
                </div> 
            </div>

            <div>
                <div className={styles.secondContainer}>
                <u>Being Prepared:</u>
                <div className={ styles.contentBox }>
                    
                    { preparedOrders }
                    </div>
                </div>
            </div>
            <div className={ styles.divContainer2 }>
            <div className={styles.thirdContainer}>
            <u>Ready for Dispatch:</u>
                <div className={ styles.contentBox }>
                
                { readyToDispatch }
                </div>
            </div>
                <div className={styles.fourthContainer}>
                <u>Dispatched orders:</u>
                <div className={ styles.contentBox }>   
                    
                    { dispatchedOrders }
                    </div>
                </div>
            </div>
        </div>
    
    </div>
</div>   
    );
}
