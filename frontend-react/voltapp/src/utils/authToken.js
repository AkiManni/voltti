import axios from "axios";
import Cookies from 'js-cookie';
const authToken = (token) => {

  if (token) {
    axios.defaults.headers.common = {
      'Authorization': 'Bearer ' + token
  };
  } 
  
 //axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  else {
    delete axios.defaults.headers.common["Authorization"];
Cookies.remove(token);
Cookies.remove("username");
  Cookies.remove("Role");
  }



  
};

export default authToken;
