import React from 'react';
import styles from './ContentContainer.module.css'
import MenuView from './MenuView';
import SearchView from './SearchView';
import Orderview from './Orderview';
import CreateRestaurant from './CreateRestaurant';

export default function ContentContainer(props){


    let searchResults = 
    <>
    <div>
      PRODUCTS:
          <SearchView
          addToOrder={props.addToOrder}
          items={props.items.filter((item) => 
            (item.category.toLowerCase().includes(props.productSearchString.toLowerCase())||
            //(item.restaurantId.includes(this.state.productSearchString))||
            (item.foodName.toLowerCase().includes(props.productSearchString.toLowerCase())))) }
            
          />
    </div>
    </>

    let editUserForm =
    <>
    <div>

    </div>
    </>

    let managerOrderHistoryOverview = 
    <>
    <div>
      
            
    </div>
    </>

    let registerForm =
    <>
    <div>

    </div>
    </>

    let editRestaurantForm =
    <>
    <div>

    </div>
    </>

    let searchProductsByRestaurant = 
    <>
    <div>
        <MenuView items={ props.items.filter((item) => 
            (item.restaurantId === props.restaurant.restaurantId))}
        deleteItem ={ props.deleteItem }/>
    </div>
    </>


    let contentContainer =
      <>
        <div className={styles.contentContainer}>

        { props.searchResultsActive ? <div>{ searchResults }</div> : <></>}
        { props.editUserActive ? <div>{ editUserForm }</div> : <></>}
        { props.registerUserActive ? <div>{ registerForm }</div> : <></>}
        { props.editRestaurantActive ? <div>{ editRestaurantForm }</div> : <></>}
        { props.editRestaurantMenuActive ? <div>{ searchProductsByRestaurant }</div> : <></>}
        { props.managerOrderHistoryActive ? <div>{managerOrderHistoryOverview}</div> : <></>}
        { props.orderviewActive? <Orderview orders={props.orders} overviewId={props.overviewId}/> : <></>}
        { props.createRestaurant? <CreateRestaurant addNewRestaurant = { props.addNewRestaurant } defaultActivate = {props.defaultActivate} /> : <> </>}
        </div>
      </>

    return(
        <div>{contentContainer}</div>
     );
 }