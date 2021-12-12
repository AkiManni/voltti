import React from 'react';
import styles from './SearchView.module.css';

import SearchResult from './SearchResult';

export default function SearchView(props) {

  const addToOrder = (productID,restaurantID,restaurantName,name,photoPath,price,prepareTime) => {
    props.addToOrder(productID,restaurantID,restaurantName,name,photoPath,price,prepareTime)
  }

  return (
    <div>
      <div className={ styles.presentationModeGrid }>
      {
        props.items.map(item => <SearchResult key={item.productID} {...item} addToOrder={addToOrder}/>)
        
      }
      </div>
    </div>
  )
}
