import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, FormGroup, FormControl, ControlLabel, Col, Row } from "react-bootstrap";
import { registerUser } from "../../services/index";
//import MyToast from "../MyToast";
import { Registercss } from "../Registercss.css";

const Register = (props) => {
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("");

  const initialState = {
    name: "",
    email: "",
    password: "",
    mobile: "",
  };

  const [user, setUser] = useState(initialState);

  const userChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();

  const saveUser = () => {
    dispatch(registerUser(user))
      .then((response) => {
        setShow(true);
        setMessage(response.message);
        resetRegisterForm();
        setTimeout(() => {
          setShow(false);
          props.history.push("/login");
        }, 2000);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const resetRegisterForm = () => {
    setUser(initialState);
  };
  // <MyToast show={show} message={message} type={"success"} />
  return (
    <Form>
   <Form.Text className="p-3 mb-2 bg-dark text-white d-flex p-2" >
          We'll never share your loginCredentials with anyone else.
        </Form.Text>
      <Row style={{marginTop: '20px'}}>
        <Col >
          <Form.Control placeholder="First name" Input type="text" />
        </Col>
        <Col>
          <Form.Control placeholder="Last name" Input type="text" />
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="address" style={{marginTop: '20px'}}>
        <Form.Control required
          autoComplete="off"
          type="text"
          name="address"
          // value={user.loginCredential}
          //onChange={credentialChange}
          className={"bg-white text-dark"}
          placeholder="Enter address" />
      </Form.Group>




      <Form.Group className="mb-3" controlId="Postnumber" style={{marginTop: '20px'}}>
        <Form.Control required
          autoComplete="off"
          type="text"
          name="Postnumber"
          // value={user.loginCredential}
          //onChange={credentialChange}
          className={"bg-white text-dark"}
          placeholder="Enter Postnumber" />
      </Form.Group>



      <Form.Group className="mb-3" controlId="formLoginCredential" style={{marginTop: '20px'}}>
        <Form.Control required
          autoComplete="off"
          type="text"
          name="loginCredential"
          // value={user.loginCredential}
          //onChange={credentialChange}
          className={"bg-white text-dark"}
          placeholder="Enter loginCredential" />
     
      </Form.Group>

      <Form.Group className="mb-3" controlId="formLoginCredential" style={{marginTop: '20px'}}>
        <Form.Control required
          autoComplete="off"
          type="text"
          name="loginCredential"
          // value={user.loginCredential}
          //onChange={credentialChange}
          className={"bg-white text-dark"}
          placeholder="Enter Password" />
     

      </Form.Group>
 
      <select class="form-select" aria-label="Default select example">
  <option selected>Select your role</option>
  <option value="1">Manager</option>
  <option value="2">User</option>
</select>

<Button
      style={{marginTop: '20px'}}
        class="btn btn-primary my-1"
        size="sm"
        type="button"
        variant="success"
        //onClick={validateUser}
        //disabled={user.loginCredential.length === 0 || user.loginPassword.length === 0}
      >
        Register
      </Button>{" "}
    </Form>

  );
};

export default Register;
