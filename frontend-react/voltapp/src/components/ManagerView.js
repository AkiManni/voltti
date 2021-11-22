import React from 'react'
import styles from './ManagerView.module.css'

export default function ManagerView(props){





const moveToPreparation = (orderId) => {
            props.moveToPreparation(orderId);

            clearInterval(prepareTimer);
        }

const setToDispatched = (orderId) => {
            props.setToDispatched(orderId);
            clearInterval(prepareTimer);
        }


var prepareTimer =  setInterval(function() {

            props.prepareTimer();
        
            clearInterval(prepareTimer);
        
          }, 1000);
        
    
//  "id": 1, 
//         "customerId": 1,
//         "restaurantId": 1,
//         "customerName": "Jack Bauer",
//         "Address":"New yorkerstreet 2",
//         "postNumber": 28956,
//         "totalCost": 17.30,
//         "orderPlacedAt":null,
//         "orderPreparedAt":null,
//         "orderDispatchedAt":null,
//         "orderDeliveredAt":null,
//         "orderDoneAt":null,
//         "prepareTime": 40,
//         "deliveryTime": 30,
//         "orderStatus": "PLACED" 
//                 "productsOrdered:":
//                 [
//                     {
//                     "id": 2,
//                     "restaurantId":2,
//                     "name": "ShishKebab",
//                     "price": 13.00,
//                     "prepareTime": 20,
//                     "foodType": "fastfood"
//                     }
//                 ],



let ordersReceived = 
    

        props.orders.filter(order => order.orderStatus === 'PLACED' && order.restaurantId === 3).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <><ol><b>Order {orderItem.id}. {orderItem.customerName}</b></ol> <ul>Nested Object Mappaus:</ul><ol>TUOTE 1</ol><ol>TUOTE 2</ol><ol>TUOTE 3</ol> <hr></hr><ol><b>Total of:</b> {orderItem.totalCost}€ <button onClick={() => moveToPreparation(orderItem.id)}>Prepare</button></ol> </>
        </div>
        )


let preparedOrders = 
        
        props.orders.filter(order => order.orderStatus === 'IN_PREPARATION' && order.restaurantId === 3).map((orderItem, index) =>
        <div className={styles.orderDetailsContainer} key ={index}>
        <ul><b>Order {orderItem.id}. - {orderItem.customerName}</b></ul>
        <ol>TUOTE 1</ol><ol>TUOTE 2</ol><ol>TUOTE 3</ol>
        <hr></hr>
        <ul><b>Prepared in:</b> {orderItem.prepareTime}s</ul>
        </div>
        //updateOrderInPreparation

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





// switch(props.orderStatus){
//     case "PLACED":
        
//         "ASETA propsit JOISSA ( props.orderStatus === PLACED ),  1 <Diviin> "
//         "Luo nappi propsien tulostusten perään, jolla tilauksen status vaihdetaan IN_PREPARATION"
//         "jos nappia painetaan REACT-SETSTATE -> SPRINGBOOT --> .PUT props.[id].orderstatus = IN_PREPARATION"
//         break;

//     case "IN_PREPARATION":
        
//         "ASETA propsit JOISSA ( props.orderStatus === IN_PREPARATION ),  2 <Diviin> "
//         "PUT Vaihda"
//         "Check if ( totalPrepareTime == 0 ),"
//         break;

//     case "READY_TO_DISPATCH":
        
//         "ASETA propsit JOISSA ( props.orderStatus === READY_TO_DISPATCH ),  3 <Diviin> "
//         break;

//     case "DISPATCHED":
        
//         "ASETA propsit JOISSA ( props.orderStatus === DISPATCHED ),  4 <Diviin> "
//         break;

//     case "AT_DESTINATION":
//         "ASETA propsit JOISSA ( props.orderStatus === DISPATCHED ),  4 <Diviin> "
//         break;

//     case "DONE":
//             break;

//     default: 
//         break;

// }