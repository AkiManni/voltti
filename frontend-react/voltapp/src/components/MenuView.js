import React from 'react';
import styles from './MenuView.module.css';
import axios from 'axios'


export default function SearchView(props) {


  const deleteItem = (itemId) => {
    axios({
      method: 'delete',
      url: 'https://voltti.herokuapp.com/bolt/deleteProduct/{id}',
      params: {id: itemId}
    });
  }

  var colors = ['red', 'blue', 'green', 'teal', 'rosybrown', 'tan', 'plum', 'saddlebrown'];
    var restaurantIdOrders = document.querySelectorAll(".ordersByIdColored");

    for (var i = 0; i < restaurantIdOrders.length; i++) {
      restaurantIdOrders[i].style.color = colors[Math.floor(Math.random() * colors.length)];
    }


  return (
    <div> PRODUCTS:
        <div className={ styles.presentationModeGrid }>
                {
                props.items.map((item) => 
                <div className={ styles.product }key={item.productID}>
                <div><img className={ styles.productImage } src={item.photoPath} alt="default"/></div>
                <div>
                <b class="ordersByIdColored"> { item.foodName }</b> <text className={ styles.price }>{ item.price } €</text></div>
                <div><hr className={ styles.productHorizontalLine }/></div>
                <div><i className={ styles.description }>{ item.description }</i></div>
                <div>From <b className={ styles.description }>{ item.category }</b> restaurant: <br/><b>{ item.restaurantName}</b></div>
                <button onClick={() =>  deleteItem(item.productID) }>x</button> 
                </div>
                )}
        </div>
    </div>
  )
}
  


