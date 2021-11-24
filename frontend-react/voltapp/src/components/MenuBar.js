import React from 'react';
import styles from './MenuBar.module.css'

export default function MenuBar(props){

    const onSearchFieldChange = (event) => {

        console.log('Keyboard event');
        console.log(event.target.value);
        props.onSearchFieldChange(event);
      }

    const defaultActivate = () => {
        props.defaultActivate();
    }

    const customerActivate = () => {
        props.customerActivate();
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

    let defaultUserBar = 
    <>
    <div className={styles.defaultSearchBar}>
    Search: <input type="text" onChange={ onSearchFieldChange } value={ props.productSearchString }/> 
    <button className={styles.menuButton} onClick={() => customerActivate()}>Customer</button>
    <button className={styles.menuButton} onClick={() => managerActivate()}>Manager</button>
    <button className={styles.menuButton}>Login</button> <button className={styles.menuButton}>Register</button>
    </div>
    </>

    let defaultUserBarWithoutSearchBar = 
    <>
    <div className={styles.defaultSearchBarWithoutSearch}>
    <button className={styles.menuButton}>Login</button> <button className={styles.menuButton}>Register</button>
    </div>
    </>

    let customerBar =
    <>
    <div className={styles.defaultSearchBar}>
        Search: <input type="text" onChange={ onSearchFieldChange } value={ props.productSearchString }/>  
        <button className={styles.menuButton}>Order History</button> 
        <button className={styles.menuButton}>Edit Customer Info</button> 
        <button className={styles.menuButton} onClick={() => defaultActivate()}>Log Out </button>
    </div>
    </>

    let customerBarWithoutSearchBar = 
    <>
    <div className={styles.defaultSearchBar}>
    <button className={styles.menuButton}>Order History</button> 
    <button className={styles.menuButton}>Edit Customer Info</button> 
    <button className={styles.menuButton} onClick={() => defaultActivate()}>Log Out</button>
    </div>
    </>

    let managerBar =
    <>
    <div className={styles.defaultSearchBar}>
    <button className={styles.menuButton} onClick={() =>  { managerOrderOverviewActivate() }}>Orders</button> 
    <button className={styles.menuButton} onClick={() =>  { managerOrderHistoryActivate() }}>Order History </button>
    <button className={styles.menuButton}>Edit Restaurant Info</button> 
    <button className={styles.menuButton}>Edit Restaurant Menu</button> 
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
        <img className= {styles.Logo} src={"voltLogo.png"} align="right"/>
        </div>
    </>

    return(
       <div>{menuBarContainer}</div>
    );
}