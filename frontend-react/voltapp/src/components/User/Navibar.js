import React from 'react'
import '../../App.css';
import '../../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import { logoutUser } from "../../services/index";
import { useDispatch, useSelector } from "react-redux";
import { Navbar } from 'react-bootstrap';
import Cookies from 'js-cookie';

export default function Navibar() {

  const isLoggedIn = Cookies.get("jwtToken");
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(logoutUser());
  };

/*

Jos tokeni löytyy, näytä logout mutta ota pois login ja register ja päinvastoin

*/



const guestLinks = (

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="/">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">

      <li class="nav-item">
        <a class="nav-link" href="/register">Register</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="/login">Login</a>
      </li>
    </ul>
  </div>
</nav>
);

Cookies.get('jwtToken')
const userLinks = (

  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="/">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="/" onClick={logout}>Logout</a>
      </li>

    </ul>
  </div>
</nav>
);

  //hieno navbar bootstrapilla tehty, kun kirjautuu ulos, kutsuu yllä olevaa logout funktiota, joka menee logoutUser funktioon
  return (
  <div>

{isLoggedIn ? userLinks : guestLinks}
  </div>


    )
}
