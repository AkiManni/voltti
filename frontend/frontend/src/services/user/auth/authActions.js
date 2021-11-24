import * as AT from "./authTypes";
import axios from "axios";
//määritetään springbootin localhost osoite
const AUTH_URL = "http://localhost:8080/bolt/kirjaudu";

export const authenticateUser = (loginCredential, loginPassword) => async (dispatch) => {
  dispatch(loginRequest());
  
  //axios post kirjautumisyritys annettuun osoitteeseen
  try {
    const response = await axios.post(AUTH_URL, {
       
     
      loginCredential: loginCredential,
      loginPassword: loginPassword,

    });

    //tallennetaan jwt paikalliseen localstorageen
    localStorage.setItem("jwtToken", response.data.token);
    console.log("Jwt tokenin asettaminen localstoreen", response.data.token);
    console.log(localStorage.getItem("jwtToken"));
    //isLoggedIn muuttuu falsesta trueksi
    dispatch(success({ username: response.data.name, isLoggedIn: true }));
    return Promise.resolve(response);

    //jos kirjautuminen ei onnistu, siitä annetaan virhe
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};



//käyttäjän uloskirjautuminen ja jwtTokenin tuhoaminen
export const logoutUser = () => {
  return (dispatch) => {
    dispatch(logoutRequest());

    localStorage.removeItem("jwtToken");
    dispatch(success({ username: "", isLoggedIn: false }));
  };
};

const loginRequest = () => {
  return {
    type: AT.LOGIN_REQUEST,
  };
};

const logoutRequest = () => {
  return {
    type: AT.LOGOUT_REQUEST,
  };
};

const success = (isLoggedIn) => {
  return {
    type: AT.SUCCESS,
    payload: isLoggedIn,
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
