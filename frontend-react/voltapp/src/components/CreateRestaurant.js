import React, {useState} from 'react'

import styles from './CreateRestaurant.module.css'
import Select from 'react-select'

export default function CreateRestaurant(props) {

    const [newRestaurantName, setRestaurantName] = useState("");
    const [newAddress, setNewAddress] = useState("");
    const [newPostNumber, setNewPostNumber] = useState("");
    const [newRestaurantUrl, setRestaurantUrl] = useState("");
    const [newOperatingHours, setNewOperatingHours] = useState("");
    const [newRestaurantType, setRestaurantType] = useState("");
    const [newPricelevel, setPricelevel] = useState("");
    
    const addNewRestaurant = () => {
        props.addNewRestaurant(newRestaurantName, newAddress, newPostNumber, 
            newRestaurantUrl, newOperatingHours, newRestaurantType, newPricelevel);
    }

    const defaultActivate = () => {
      props.defaultActivate();
    }
    const priceLevels = [
      { label: "€", value:1},
      { label: "€€", value: 2},
      { label: "€€€", value: 3},
      { label: "€€€€", value: 4},
      { label: "€€€€€", value: 5}
    ]

    const restaurantTypes = [
      { label:"FINE", value: 1},
      { label:"CAFE", value: 2},
      { label:"CASUAL", value: 3},
      { label:"FAST", value: 4}
    ]

        let createRestaurant = (
            <div className={ styles.restaurantRegisterContainer }>
             <i>Testinäkymä CreateRestaurant Classille</i><br/>
             <i>Näkymä sisällytetään managerin authiin, jos managerilla ei ole ravintolaa ehdon taakse</i>
            <div className={ styles.userText }><br/> <b>Insert info for new Restaurant:</b> </div>
            <div><br/>Restaurant Name: <br/><input type="text" placeholder="Restaurant name" minLength = "10" className={ styles.enterUser } 
                onChange={ (event) => setRestaurantName(event.target.value) }></input></div>
            <div>Address: <br/><input type="text" placeholder="Examplestreet 5" minLength = "10" className={ styles.enterUser }
                onChange={ (event) => setNewAddress(event.target.value) }></input></div>
            <div>Postnumber: <br/><input type="number" placeholder="12345"minLength = "5" maxLength = "5" className={styles.enterUser}
                onChange={ (event) => setNewPostNumber(event.target.value)}></input></div>
            <div>Image of Restaurant(url): <br/><input type="text" placeholder="http://adress-for-a-picture.com/123.jpg" minLength = "20" className={ styles.enterUrl }
                onChange={ (event) => setRestaurantUrl(event.target.value) }></input></div>
                <br/>
            <img style={{width: 150, height: 150, borderRadius: 150/ 2}}  src={newRestaurantUrl}  alt="<Preview>"/>
            <div><br/>Operating Hours: <br/><input type="text" minLength = "11" placeholder="12:00 - 21:00" className={ styles.enterUser }
                onChange={ (event) => setNewOperatingHours(event.target.value) }></input></div>
            <div>Restaurant Type: <br/><Select className={ styles.enterUser } placeholder="Type of Restaurant" options={restaurantTypes} onChange={ (event) => setRestaurantType(event.label) }/></div>
            <div>Pricelevel: <br/><Select className={ styles.enterUser } placeholder="€ - €€€€€?" options={priceLevels} onChange={ (event) => setPricelevel(event.label) }/></div>
            <br/>
            <div><button onClick={ addNewRestaurant }>Rekisteröi</button> <button onClick={ defaultActivate }>Peruuta</button></div>
            
        </div>  
    );

    return (
        <div>
            {createRestaurant}
        </div>
    );


}