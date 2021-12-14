
import React from 'react';
import styles from './SearchResult.module.css';

export default function SearchResult(props) {

  const addToOrder = (id,restaurantId,restaurantName,foodName,photoPath,price,prepareTime) => {
    props.addToOrder(id,restaurantId,restaurantName,foodName,photoPath,price,prepareTime);
  }

  // https://stackoverflow.com/questions/27799125/random-color-on-different-divs
  // At first I was trying to make the orders listings from different restaurants 
  // to appear with different random generated colors on sideBar shoppingCart orderPreview.
  // text color: rgb(rdm_generated_number,rdm_generated_number,rdm_generated_number) and so on..
  // I couldn't get it to work as I wanted, and I searched how to do it for a while, and as result -
  // I found this to test the changing of text colors - it appeared to work as christmas lights like, 
  // so at I first abandoned the idea, but later decided to use it and leave it as it is for the product names.  
  //  -Aki
  

  var colors = ['red', 'blue', 'green', 'teal', 'rosybrown', 'tan', 'plum', 'saddlebrown'];
    var restaurantIdOrders = document.querySelectorAll(".ordersByIdColored");

    for (var i = 0; i < restaurantIdOrders.length; i++) {
      restaurantIdOrders[i].style.color = colors[Math.floor(Math.random() * colors.length)];
    }

    

  return (
    <div className={ styles.product }>
        <div>
          <div><img className={ styles.productImage }  src={props.photoPath} alt="default"/></div>
          <div className={ styles.name } class="ordersByIdColored"><b>{ props.name } </b><text className={ styles.price }>{ props.price } €</text></div>
          <div><hr className={ styles.productHorizontalLine }/></div>
          <div><i className={ styles.description }>{ props.description }</i></div>
          <div>From <b className={ styles.description }> {props.category}</b> restaurant: <br/><b>{ props.restaurantName}</b></div>
          <div><button className={styles.addButton} onClick={() => addToOrder(props.productID, props.restaurantID, 
            props.restaurantName, props.name, props.photoPath, props.price, props.prepareTime )}>Add to Order</button></div>
          
        </div>
    </div>
  )
}


