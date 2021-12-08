import React from 'react';
import styles from './MenuBar.module.css';

export default function MenuBar(props){

    const onSearchFieldChange = (event) => {

        console.log('Keyboard event');
        console.log(event.target.value);
        props.onSearchFieldChange(event);
      }


    const limitProducts = (event) => {
        console.log(event.target.value);
       props.limitProducts(event);
    }

    const defaultActivate = () => {
        props.defaultActivate();
    }

    const customerActivate = () => {
        props.customerActivate();
    }

    const customerOrderHistoryviewActivate = () => {
        props.customerOrderHistoryviewActivate()
    }

    const managerActivate = () => {
        props.managerActivate();
    }

    const managerOrderOverviewActivate = () => {
        props.managerOrderOverviewActivate();
    }

    const managerOrderHistoryActivate = () => {
        props.managerOrderHistoryActivate();
    }

    const createRestaurantActive = () => {
        props.createRestaurantActive();
    }

    const editRestaurantMenuActive = () => {
        props.editRestaurantMenuActive();
    }

    

    

    let defaultUserBar = 
    <>
        <div className={styles.defaultSearchBar}>
        Search: <input className={styles.searchfield} type="text"  placeholder="foodname, restaurant or restaurant type" 
        onChange={ onSearchFieldChange } value={ props.productSearchString }/>
         <input className={styles.priceStageSlider} onChange={limitProducts} type="range" min="1" max="30" value={props.priceslider}/> € - €€€€ 
        <button className={styles.menuButton} onClick={() => customerActivate()}>Customer</button>
        <button className={styles.menuButton} onClick={() => managerActivate()}>Manager</button>
        <button className={styles.menuButton}>Login/Register</button>
    </div>
    </>

    let defaultUserBarWithoutSearchBar = 
    <>
        <div className={styles.defaultSearchBarWithoutSearch}>
        <button className={styles.menuButton} onClick={() => defaultActivate()}>Search Products</button>
        <button className={styles.menuButton}>Login/Register</button>
    </div>
    </>

    let customerBar =
    <>
    <div className={styles.defaultSearchBar}>
        Search: <input className={styles.searchfield} type="text"  placeholder="foodname, restaurant or restaurant type" 
        onChange={ onSearchFieldChange } value={ props.productSearchString }/> <input className={styles.priceStageSlider} type="range" min="1" max="30"/> € - €€€€ 
        <button className={styles.menuButton} onClick={() => customerOrderHistoryviewActivate()}>Order History</button> 
        <button className={styles.menuButton}>Edit Customer Info</button> 
        <button className={styles.menuButton} onClick={() => defaultActivate()}>Log Out </button>
    </div>
    </>

    let customerBarWithoutSearchBar = 
    <>
        <div className={styles.defaultSearchBar}>
        <button className={styles.menuButton} onClick={() => customerActivate()}>Search Products</button>
        <button className={styles.menuButton} onClick={() => customerOrderHistoryviewActivate()}>Order History</button> 
        <button className={styles.menuButton}>Edit Customer Info</button> 
        <button className={styles.menuButton} onClick={() => defaultActivate()}>Log Out</button>
    </div>
    </>

    let managerBar =
    <>
        <div className={styles.defaultSearchBar}>
        <button className={styles.menuButton} onClick={() =>  { managerOrderOverviewActivate() }}>Orders</button> 
        <button className={styles.menuButton} onClick={() =>  { managerOrderHistoryActivate() }}>Order History </button>
        <button className={styles.menuButton} onClick={() => { createRestaurantActive() }}>Create Restaurant </button>
        <button className={styles.menuButton}>Edit Restaurant Info</button> 
        <button className={styles.menuButton}onClick={() => { editRestaurantMenuActive() }}>Edit Restaurant Menu</button> 
        <button className={styles.menuButton} onClick={() => defaultActivate()}>Log Out</button>
    </div>
    </>

    let managerEditBar = 
    <>
    <div className={styles.defaultSearchBar}>

    </div>
    </>

    let menuBarContainer =
    <>
        <div className= {styles.menuBar} >
        { props.defaultUserBarActive ? <div>{ defaultUserBar }</div> : <></> }
        { props.customerBarActive ? <div>{ customerBar }</div> : <></> }
        { props.customerEditBarActive ? <div>{customerBarWithoutSearchBar}</div> : <></> }
        { props.defaultBarWithoutSearchActive? <div>{ defaultUserBarWithoutSearchBar }</div> : <></> }
        { props.managerBarActive ? <div>{ managerBar }</div> : <></> }
        { props.managerEditBarActive ? <div>{ managerEditBar }</div> : <></> }
        <img className= {styles.Logo} src={"voltLogo.png"} align="right" alt="default"/>
        </div>
    </>

    return(
       <div>{menuBarContainer}</div>
    );
}