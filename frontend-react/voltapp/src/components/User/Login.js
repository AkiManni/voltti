import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { authenticateUser } from "../../services/index";
import { Form, Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import { Alert } from "react-bootstrap";
import { useCookies } from "react-cookie";
import Cookies from 'js-cookie';

const Login = (props) => {
  const [error, setError] = useState();
  const [show, setShow] = useState(true);

  const initialState = {
    loginCredential: "",
    loginPassword: "",
  };

  
  

  const [user, setUser] = useState(initialState);
  const [cookies, setCookie, removeCookie] = useCookies(["jwtToken"]);
  const credentialChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const dispatch = useDispatch();
//tässä ottaa tiedot vastaan ja menee authenticateUseriin ja sieltä palauttelee tiedot
  const validateUser = () => {
    dispatch(authenticateUser(user.loginCredential, user.loginPassword, setCookie, removeCookie))
      .then((response) => {
        console.log(response.data);
         return props.history.push("/home");
               
      })
      .catch((error) => {
        //jos kirjautuminen ei onnistunut
        console.log("virhe👌" +error);
        setShow(true);
        resetLoginForm();
        setError("  Invalid loginCredential and loginPassword");
      });
  };

  const resetLoginForm = () => {
    setUser(initialState);
  };
//perus kirjautumisnäkymä, syötetään tiedot kirjautumislomakkeeseen ja sitten login namiskaa,
//jonka jälkeen hyppää suoraa validateUser funktioon lomakkeen arvoilla ja siitä eteenpäin
  return (
    <Form>
      {show && error && (
        <Alert variant="danger" onClose={() => setShow(false)} dismissible>
          {error}
        </Alert>
      )}

      <Form.Group className="mb-3" controlId="formLoginCredential">
        <Form.Label>loginCredential</Form.Label>
        <Form.Control required
          autoComplete="off"
          type="text"
          name="loginCredential"
          value={user.loginCredential}
          onChange={credentialChange}
          className={"bg-white text-dark"}
          placeholder="Enter loginCredential" />
        <Form.Text className="text-muted">
          We'll never share your loginCredentials with anyone else.
        </Form.Text>
      </Form.Group>


      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control required
          autoComplete="off"
          type="password"
          name="loginPassword"
          value={user.loginPassword}
          onChange={credentialChange}
          className={"bg-white text-dark"}
          placeholder="Enter loginPassword" />
      </Form.Group>
      <Button
        class="btn btn-secondary my-1"
        size="sm"
        type="button"
        variant="info"
        onClick={resetLoginForm}
        disabled={user.loginCredential.length === 0 && user.loginPassword.length === 0}
      >
        Reset
      </Button>
      <Button
      style={{marginLeft: '20px'} }
        class="btn btn-primary my-1"
        size="sm"
        type="button"
        variant="success"
        onClick={validateUser}
        disabled={user.loginCredential.length === 0 || user.loginPassword.length === 0}
      >
        Login
      </Button>{" "}
    </Form>




  );
}

export default Login;
