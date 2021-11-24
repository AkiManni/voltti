import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Row,
  Col,
//  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLock,
  faUndo,
  faUserPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { registerUser } from "../../services/index";
//import MyToast from "../MyToast";

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
    <div>
      <div style={{ display: show ? "block" : "none" }}>
       
      </div>

     Tähän tulee lähitulevaisuudessa kirjautuminen
    </div>






  );
};

export default Register;
