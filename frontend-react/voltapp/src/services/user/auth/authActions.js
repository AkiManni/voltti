import * as AT from "./authTypes";
import axios from "axios";
//määritetään springbootin localhost osoite
import Cookies from 'js-cookie';
import Navibar from "../../../components/User/Navibar";
const AUTH_URL = "https://voltti.herokuapp.com/bolt/kirjaudu";


export const authenticateUser = (loginCredential, loginPassword, setCookie) => async (dispatch) => {
  //const [authenticateUser, setauthenticateUser] = useState([]);

  //axios post kirjautumisyritys annettuun osoitteeseen
  try {
    const response = await axios.post(AUTH_URL, {


      loginCredential: loginCredential,
      loginPassword: loginPassword,

    });

    //tallennetaan jwt paikalliseen localstorageen
    //localStorage.setItem("jwtToken", response.data.token);
    //sessionStorage.setItem("jwtToken", response.data.token);

    //setCookie('jwtToken', response.data.token,1);
    setCookie('jwtToken', response.data.token, {
      authenticateUser: 3600,
      path: "/"


    })
    setCookie('username', response.data.name, {
      authenticateUser: 3600,
      path: "/"


    })

    setCookie('Role', response.data.Role, {
      authenticateUser: 3600,
      path: "/"


    })
    

   
    console.log("Jwt tokenin asettaminen cookieseiin", Cookies.get('jwtToken'));

    //  console.log("Jwt tokenin asettaminen sessionstorageen", response.data.token);
    // console.log("Jwt tokenin asettaminen localstoreen", response.data.token);

    //console.log(localStorage.getItem("jwtToken"));
    //  console.log(sessionStorage.getItem("jwtToken"));
    //isLoggedIn muuttuu falsesta trueksi
    dispatch(success({ username: response.data.name, isLoggedIn: true}));
    return Promise.resolve(response);
  

    //jos kirjautuminen ei onnistu, siitä annetaan virhe
  } catch (error) {
    dispatch(failure());
    return Promise.reject(error);
  }
};


//käyttäjän uloskirjautuminen ja jwtTokenin tuhoaminen
export const logoutUser = () => {
  Cookies.remove("jwtToken");
  Cookies.remove("username");
  Cookies.remove("Role");
  return (dispatch) => {
    dispatch(logoutRequest());



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
    payload: isLoggedIn
  };
};

const failure = () => {
  return {
    type: AT.FAILURE,
    payload: false,
  };
};
