import React from 'react';
import styles from './SearchResult.module.css';

export default function SearchResult(props) {


  return (
    <div className={ styles.product }>
        <div>
          <div><img className={ styles.productImage } src={`/images/${props.image}`}/></div>
          <div className={ styles.name }>{ props.name }</div>
          <div>{ props.manufucturer }</div>
          <div>{ props.type }</div>
          <div>${ props.price }</div>
          <div>Available quantity: { props.qty }</div>
          <div><button>Osta</button></div>
        </div>
    </div>
  )
}
