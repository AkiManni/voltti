import * as UT from "./userTypes";
import axios from "axios";

const REGISTER_URL = "https://volttifrontti.herokuapp.com//bolt/luo";


export const registerUser = (userObject) => async (dispatch) => {
  dispatch(userRequest());
  try {
    const response = await axios.post(REGISTER_URL, userObject);
    dispatch(userSavedSuccess(response.data));
    return Promise.resolve(response.data);
    
  } catch (error) {
    dispatch(userFailure(error.message));
    
    return Promise.reject(error);

  }
};




const userRequest = () => {
  return {
    type: UT.USER_REQUEST,
  };
};

const userSavedSuccess = (user) => {
  return {
    type: UT.USER_SAVED_SUCCESS,
    payload: user,
  };
};

const userSuccess = (users) => {
  return {
    type: UT.USER_SUCCESS,
    payload: users,
  };
};

const userFailure = (error) => {
  return {
    type: UT.USER_FAILURE,
    payload: error,
  };
};
