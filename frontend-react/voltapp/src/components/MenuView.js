import React from 'react';
import styles from './MenuView.module.css';


export default function SearchView(props) {


  


  const deleteItem = (itemId) => {
      props.deleteItem(itemId);
  }



  return (
    <div> PRODUCTS:
        <div className={ styles.presentationModeGrid }>
                {
                props.items.map((item) => 
                <div className={ styles.product }key={item.id}>
                <div><img className={ styles.productImage } src={item.photoPath} alt="default"/></div>
                <div className={ styles.name }><button onClick={() =>  deleteItem(item.id) }>x</button> { item.foodName }</div>
                <div>From restaurant: { item.restaurantId}</div>
                <div>{ item.category }</div>
                <div>{ item.description }</div>
                <div>${ item.price }</div>
                </div>
                )}
        </div>
    </div>
  )
}
  


