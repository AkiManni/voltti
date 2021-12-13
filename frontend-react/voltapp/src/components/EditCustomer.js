import React, {useState} from 'react'
import axios from 'axios'

import styles from './EditCustomer.module.css'

export default function EditCustomer(props) {

    const [editedFirstName, setFirstName] = useState("");
    const [editedSurName, setSurName] = useState("")
    const [editedAddress, setAddress] = useState("");
    const [editedPostNumber, setPostNumber] = useState("");
   
    
    const editUser = () => {
            // Vastaavaa edit toimintoa ei löydy backendistä.
        axios({
            method:'post',
            url:'https://voltti.herokuapp.com/bolt/addOrder',
            data: 
            {
                fname: editedFirstName,
                lname: editedSurName,
                address: editedAddress,
                postNum: editedPostNumber
            }
            });
    }

        let userEdit = (
            <div className={ styles.addMenuItemContainer }>
            <div className={ styles.userText }><br/> <b>Edit Customer Info:</b> </div>
            <div><br/>First Name: <br/><input type="text" placeholder={props.Useri.fname} minLength = "10" className={ styles.enterUser } 
                onChange={ (event) => setFirstName(event.target.value) }></input></div>
            
            <div>Surname: <br/><input type="text" placeholder={props.Useri.lname} minLength = "10" className={ styles.enterUser }
                onChange={ (event) => setSurName(event.target.value) }></input></div>
            
            <div>New Address: <br/><input type="text" placeholder={props.Useri.address} minLength = "20" className={ styles.enterUrl }
                onChange={ (event) => setAddress(event.target.value) }></input></div>
            
            <div>New Postnumber: <br/><input type="text" minLength = "11" placeholder={props.Useri.postNum} className={ styles.enterUser }
                onChange={ (event) => setPostNumber(event.target.value) }></input></div>

            <div><br/><button onClick={ editUser }>Change</button></div>
            
        </div>  
    );

    return (
        <div>
            {userEdit}
        </div>
    );

    }