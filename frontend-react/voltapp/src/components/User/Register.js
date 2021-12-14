import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row , Alert,} from "react-bootstrap";
import { registerUser } from "../../services/index";

const Register = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState();

  const initialState = {
    fname: "",
    lname: "",
    address: "",
    postNum: "",
    loginCredential: "",
    loginPassword: "",
    roles: []
  };




  
  const [user, setUser] = useState(initialState);

  const userChange = (event) => {
    
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });

  };


  const roleChange = (event) => {
    
    const { name, value } = event.target;
    setUser({ ...user, [name]: [value] });
    
  };
      
  const savelogin = () => {
   
    props.history.push("/");

}

  const dispatch = useDispatch();

  const saveUser = () => {
    dispatch(registerUser(user))
      .then((response) => {
        resetRegisterForm();
        setTimeout(() => {
          props.history.push("/");
        }, 2000);
      })






      .catch((error) => {
        //jos kirjautuminen ei onnistunut
        console.log("virhe👌" +error);
        setShow(true);
        resetRegisterForm();

  
if(error.response.status == 403){

  setError("User is already registered");

}

if(error.response.status == 404){

  setError("Fill all information");
}

        


     
      });
    };







  const resetRegisterForm = () => {
    setUser(initialState);
  };

  return (
    <Form>
         {show && error && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          {error}
        </Alert>
      )}
   <Form.Text className="p-3 mb-2 bg-dark text-white d-flex p-2" >
          We'll never share your loginCredentials with anyone else.
        </Form.Text>
      <Row style={{marginTop: '20px'}}>
        <Col >
        <Form.Control required
          autoComplete="off"
          type="text"
          value = {user.fname}
          onChange={userChange}
          name="fname"
          className={"bg-white text-dark"}
          placeholder="Enter firstname" />
        </Col>
        <Col>
             <Form.Control required
          autoComplete="off"
          type="text"
          value = {user.lname}
          onChange={userChange}
          name="lname"
          className={"bg-white text-dark"}
          placeholder="Enter lastname" />
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="address" style={{marginTop: '20px'}} >
        <Form.Control required
          autoComplete="off"
          type="text"
          value = {user.address}
          onChange={userChange}
          name="address"
          className={"bg-white text-dark"}
          placeholder="Enter address" />
      </Form.Group>

      <Form.Group className="mb-3" controlId="postNum" style={{marginTop: '20px'}}>
        <Form.Control required
          autoComplete="off"
          type="number"
          name="postNum"
          value={user.postNum}
          onChange={userChange}
          className={"bg-white text-dark"}
          placeholder="Enter Postal code" />
     
      </Form.Group>





      <Form.Group className="mb-3" controlId="loginCredential" style={{marginTop: '20px'}}>
        <Form.Control required
          autoComplete="off"
          type="text"
          name="loginCredential"
          value={user.loginCredential}
          onChange={userChange}
          className={"bg-white text-dark"}
          placeholder="Enter loginCredential" />
     
      </Form.Group>

      <Form.Group className="mb-3" controlId="loginPassword" style={{marginTop: '20px'}}>
      <Form.Control required
          autoComplete="off"
          type="password"
          aria-describedby="passwordHelpBlock"
          name="loginPassword"
          value={user.loginPassword}
          onChange={userChange}
          className={"bg-white text-dark"}
          placeholder="Enter Password" />
<small id="passwordHelpBlock" class="form-text text-muted">
  Your password must be 8-20 characters long, contain letters and numbers, and must not contain spaces, special characters, or emoji.
</small>
      </Form.Group>
 
      <select class="form-select" aria-label="Default select example"  value={user.roles} 
          onChange={roleChange}  name="roles">
  <option selected>Select your role</option>
  <option name="manager">manager</option>
  <option name="customer">customer</option>

  
</select>

<Button
      style={{marginTop: '20px'}}
        class="btn btn-primary my-1"
        size="sm"
        type="button"
        variant="success"
        onClick={saveUser}
        //onClick={console.log(userChange.ismanager)}
       //disabled={user.loginCredential.length === 0 || user.loginPassword.length === 0}
       disabled={user.loginCredential.length === 0 || user.loginPassword.length === 0 ||user.lname.length === 0 || user.fname.length === 0|| user.postNum === 0 || user.address === 0 || user.ismanager === null}
       
   >
      
        Register
      </Button>
 


      <Button  
      style={{marginTop: '20px', marginLeft: '20px'}}
        class="btn btn-primary my-1"
        size="sm"
        type="button"
        variant="success"
        onClick={savelogin}
   >
      
        Back to Login
      </Button>
</Form>

  );
};

export default Register;
