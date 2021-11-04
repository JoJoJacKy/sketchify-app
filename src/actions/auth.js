import { AUTH } from '../constants/actionTypes';
import * as api from '../api'; // This imports all the exports from the api, into an object called api; Can call the exported functions via dot notation

// This syntax is due to THUNK package
export const signin = (formData, history) => async (dispatch) => {
  try {
    // log in the user...
    const { data } = await api.signin(formData);

    dispatch({ type: AUTH, data });

    history.push('/'); // Send back to homepage
  } catch (error) {
    console.log(error);
  }
};

export const signup = (formData, history) => async (dispatch) => {
  try {
    // sign up the user...
    const { data } = await api.signup(formData);

    dispatch({ type: AUTH, data });

    history.push('/'); // Send back to homepage
  } catch (error) {
    console.log(error);
  }
};
