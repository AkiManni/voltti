import React from 'react'
import styles from './ManagerView.module.css'
import axios from 'axios'

export default function ManagerView(props){



const moveToPreparation = (orderId) => {
    axios({
        method: 'get',
        url: 'https://voltti.herokuapp.com/bolt/updateOrder/{id}',
        params: {id: orderId}
      });
        }
const setToDispatched = (orderId) => {    
    axios({
        method: 'get',
        url: 'https://voltti.herokuapp.com/bolt/updateOrder/{id}',
        params: {id: orderId}
      });
        }


let ordersReceived = 
    

        props.orders.filter(order => order.orderStatus === 'PLACED' && order.restaurantID === props.Useri.Restaurant.restaurantID).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ol><b className={styles.orderHighlight}>Order {orderItem.orderID}.</b> <b>{orderItem.customerName}</b></ol> 
        {orderItem.productsOrdered.map((item,i) => <ol key={i}><li><b className={styles.quantityNumber}>{item.quantity}</b> x {item.productID}. {item.foodName} - {item.price} €</li></ol>)}

        <hr className={styles.hrManager}/><ol><b className={styles.orderStatusOnGoing}>Total of with Delivery: </b> 
        <b>{ orderItem.totalCost } €</b> <button onClick={() => moveToPreparation(orderItem.id)}>Prepare</button></ol>
        </div>
        )


let preparedOrders = 
        
        props.orders.filter(order => order.orderStatus === 'IN_PREPARATION' && order.restaurantID === props.Useri.Restaurant.restaurantID).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ul><b className={styles.orderHighlight}>Order {orderItem.orderID}.</b> <b>Items Prepared: </b></ul>
        {orderItem.productsOrdered.map((item,i) => <ol key={i}><li><b className={styles.quantityNumber}>{item.quantity}</b> x {item.productID}. {item.foodName} - {item.price} €</li></ol>)}
        <hr className={styles.hrManager}/>
        <ul><b>Prepared in:</b> <b className={styles.orderStatusOnGoing}>{orderItem.prepareTime}</b> <b>s</b></ul>
        </div>
        )
let readyToDispatch =
    
        props.orders.filter(order => order.orderStatus === 'READY_TO_DISPATCH' && order.restaurantID === props.Useri.Restaurant.restaurantID).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ol><b className={styles.orderHighlight}>Order {orderItem.orderID}.</b> <b>Ready To Deliver To:</b></ol>
        <ol className={styles.orderAddressHighlight}>{orderItem.address} , {orderItem.postNum} </ol> <hr className={styles.hrManager}/>
        <ol><button onClick={() => setToDispatched(orderItem.id)}>Dispatch</button></ol>
        </div>
        )

let dispatchedOrders = 
    
        props.orders.filter(order => order.orderStatus === 'DISPATCHED' && order.restaurantID === props.Useri.Restaurant.restaurantID).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ul><b className={styles.orderHighlight}>Order {orderItem.orderID}.</b> <b>Is Being Delivered To:</b> </ul> 
        <ol className={styles.orderAddressHighlight}> {orderItem.address} , {orderItem.postNum} </ol><hr className={styles.hrManager}/> 
        <ol><b>Delivered in:</b> <b className={styles.orderStatusOnGoing}>{orderItem.deliveryTime}</b> <b>s</b></ol>
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
