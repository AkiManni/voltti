import React, {useState} from 'react'
import axios from 'axios'
import Select from 'react-select'

import styles from './AddMenuItem.module.css'

export default function AddMenuItem(props) {

    const [newFoodName, setFoodName] = useState("");
    const [newDescription, setDescription] = useState("");
    const [newPrice, setPrice] = useState("");
    const [newMenuItemUrl, setNewMenuItemUrl] = useState("");
    const [newPrepareTime, setNewPrepareTime] = useState("");
    const [newFoodType,setNewFoodType] = useState("");
    
    const addNewMenuItem = () => {

            axios({
                method:'post',
                url:'https://voltti.herokuapp.com/bolt/addProductToRestaurant',
                data: {
                    name:newFoodName,
                    photoPath: newMenuItemUrl,
                    foodType:newFoodType,
                    prepareTime: newPrepareTime,
                    price: newPrice,
                    restaurantID: props.Useri.Restaurant.restaurantID, 
                    category: props.Useri.Restaurant.type
                    //description: newDescription,   missä on tuotteen kuvaus? 
                }
              });  
    }

    const foodTypes = [
        { label:"MEAL", value: 1},
        { label:"DRINK", value: 2},
        { label:"SNACK", value: 3}
      ]

        let addMenuItem = (
            <div className={ styles.addMenuItemContainer }>
            <div className={ styles.userText }><br/> <b>New Product for the Menu:</b> </div>
            <div><br/>Product Name: <br/><input type="text" placeholder="Product name" minLength = "10" className={ styles.enterUser } 
                onChange={ (event) => setFoodName(event.target.value) }></input></div>
            
            <div>Description: <br/><input type="text" placeholder="Describe product shortly" minLength = "10" className={ styles.enterUser }
                onChange={ (event) => setDescription(event.target.value) }></input></div>

            <div>Foodtype Type: <br/><Select className={ styles.enterUser } placeholder="Type of Food" options={foodTypes} 
            onChange={ (event) => setNewFoodType(event.label) }/></div>
            
            <div>Image of Product(url): <br/><input type="text" placeholder="http://adress-for-a-picture.com/123.jpg" minLength = "20" className={ styles.enterUrl }
                onChange={ (event) => setNewMenuItemUrl(event.target.value) }></input></div>
                <br/>
            <img style={{width: 200, height: 200, borderRadius: 200/ 2}}  src={newMenuItemUrl}  alt="<Preview>"/>
            <div><br/>Prepare Time: <br/><input type="text" minLength = "11" placeholder="10, 15, 25 etc." className={ styles.enterUser }
                onChange={ (event) => setNewPrepareTime(event.target.value) }></input> seconds</div>
            <div>Price: <br/><input type="number" placeholder="10"minLength = "5" maxLength = "5" className={styles.enterUser}
                onChange={ (event) => setPrice(event.target.value)}></input> €</div>
            <div><br/><button onClick={ addNewMenuItem }>Rekisteröi</button></div>
            
        </div>  
    );

    return (
        <div>
            {addMenuItem}
        </div>
    );


}