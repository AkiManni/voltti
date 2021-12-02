import React, {useState} from 'react'

import styles from './AddMenuItem.module.css'

export default function AddMenuItem(props) {

    const [newFoodName, setFoodName] = useState("");
    const [newDescription, setDescription] = useState("");
    const [newPrice, setPrice] = useState("");
    const [newMenuItemUrl, setNewMenuItemUrl] = useState("");
    const [newPrepareTime, setNewPrepareTime] = useState("");
    
    const addNewMenuItem = () => {
        props.addNewMenuItem(newFoodName, newDescription,
            newMenuItemUrl, newPrepareTime, newPrice);
    }


    //<div>Food Type: <br/><Select className={ styles.enterUser } placeholder="Type of Food" options={foodTypes} onChange={ (event) => setRestaurantType(event.label) }/></div>

        let addMenuItem = (
            <div className={ styles.addMenuItemContainer }>
            <div className={ styles.userText }><br/> <b>New Product for the Menu:</b> </div>
            <div><br/>Product Name: <br/><input type="text" placeholder="Product name" minLength = "10" className={ styles.enterUser } 
                onChange={ (event) => setFoodName(event.target.value) }></input></div>
            
            <div>Description: <br/><input type="text" placeholder="Describe product shortly" minLength = "10" className={ styles.enterUser }
                onChange={ (event) => setDescription(event.target.value) }></input></div>
            
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