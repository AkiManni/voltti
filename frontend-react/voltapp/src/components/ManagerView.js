import React from 'react'
import styles from './ManagerView.module.css'

export default function ManagerView(props){


let ordersReceived = 
    
    <table>
        <tr>
            
            <td>id</td>
            <td>rId</td>
            <td>foodname</td>
            <td>price</td>
            <td>prepareTime</td>
            <td></td>
        </tr>
        { props.products.map((product, index) =>
        <tr key ={index}>
            <td>{product.id}</td>
            <td>{product.restaurantId}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.prepareTime}</td>
            <td><button>{'>>'}</button></td>
        </tr>
        )}
    </table>



let ordersReceived2 = 
            <>
     
     { props.orders.map((order, index) => 
    
        <table key={index}>
        <tr>{ order.id }</tr>
        <td>{ order.customerId + " " + order.customerName + " "}</td> 

        {/* { { order.(productsOrdered).map((product, i) => 
            <li key={i}>
                { product.id + ". " + product.name }
                { product.price + "€" }
            </li>
            
        )} } */}

        <td>{ order.totalCost + "€ "}</td>
        <td><button>Prepare</button></td>
        </table>)} 

          
            </>
let preparedOrders = 

    <table>
        <tr>
            <td></td>
            <td>id</td>
            <td>rId</td>
            <td>foodname</td>
            <td>price</td>
            <td>prepareTime</td>
        </tr>
        { props.products.map((product, index) =>
        <tr key ={index}>
            <td></td>
            <td>{product.id}</td>
            <td>{product.restaurantId}</td>
            <td>{product.name}</td>
            <td>{product.price}</td>
            <td>{product.prepareTime}</td>
        </tr>
        )}
    </table>

let readyToDispatch =
    
    <table>
        <tr>
            <td>id</td>
            <td>rId</td>
            <td>foodname</td>

            <td></td>
        </tr>
        { props.products.map((product, index) =>
        <tr key ={index}>
            
            <td>{product.id}</td>
            <td>{product.restaurantId}</td>
            <td>{product.name}</td>
            <td><button>Dispatch</button></td>
        </tr>
        )}
    </table>

let dispatchedOrders = 
    
    <table>
    <tr>
        <td></td>
        <td>id</td>
        <td>rId</td>
        <td>foodname</td>
        <td>price</td>
        <td>prepareTime</td>
    </tr>
    { props.products.map((product, index) =>
    <tr key ={index}>
        <td></td>
        <td>{product.id}</td>
        <td>{product.restaurantId}</td>
        <td>{product.name}</td>
        <td>{product.price}</td>
        <td>{product.prepareTime}</td>
    </tr>
    )}
    </table>

return(
<div>
    <div className={ styles.divContainer }>
        
        <div className={ styles.divContainer }>
            <div className={ styles.firstContainer }>
               <div className={ styles.contentBox }>
                <b>Orders:</b>
                { ordersReceived2 }
                </div> 
            </div>

            <div>
                <div className={styles.secondContainer}>
                <div className={ styles.contentBox }>
                    <b>Being Prepared:</b>
                    { preparedOrders }
                    </div>
                </div>
            </div>
            <div className={ styles.divContainer2 }>
            <div className={styles.thirdContainer}>
                <div className={ styles.contentBox }>
                <b>Ready for Dispatch:</b>
                { readyToDispatch }
                </div>
            </div>
                <div className={styles.fourthContainer}>
                <div className={ styles.contentBox }>   
                    <b>Dispatched orders:</b>
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