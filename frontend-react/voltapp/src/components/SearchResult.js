import React from 'react';
import styles from './SearchResult.module.css';

export default function SearchResult(props) {


  return (
    <div className={ styles.product }>
        <div>
          <div><img className={ styles.productImage }  src={props.photoPath} alt="default"/></div>
          <div className={ styles.name }>{ props.foodName }</div>
          <div>From restaurant: { props.restaurantId}</div>
          {/* <b><div>item.category.includes</div>
          <div>(this.state.restaurants.restaurantName)</div>
          <div><u>filter joka näyttää tuotteen ravintolan nimen</u></div></b> */}
          <div>{ props.category }</div>
          <div>{ props.description }</div>
          <div>${ props.price }</div>
          <div><button>Add to Shopping Cart</button></div>
        </div>
    </div>
  )
}
