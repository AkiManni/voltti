import React from "react";
import { useSelector } from "react-redux";
import authToken from "../utils/authToken";
import { Alert } from "react-bootstrap";
import Cookies from 'js-cookie';

const Home = () => {

  if (Cookies.get('jwtToken')) {
  //  console.log("käytttäjä on vielä tunnistuatunut jwttokenilla " + Cookies.get('jwtToken'));
  authToken(Cookies.get('jwtToken'));
  }

  
  const auth = useSelector((state) => state.auth);
  //console.log(auth.isLoggedIn + "Onko kirjautunut");
  return (
   <div>

     </div>


  );
};

export default Home;
