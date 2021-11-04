import { FETCH_ALL, UPDATE, CREATE, DELETE } from "../constants/actionTypes";

import * as api from "../api"; // This imports all the exports from the api, into an object called api; Can call the exported functions via dot notation

// Action Creators are functions that return an action
// Actions are just objects that has a type and a payload
// Use react thunk to allow for async
export const getPosts = () => async (dispatch) => {
  // Redux Thunk in Use here (The Middleware)
  try {
    const { data } = await api.fetchPosts(); // Fetches data from api
    dispatch({ type: FETCH_ALL, payload: data }); // Action being dispatched with type and payload as the data gotten
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (post) => async (dispatch) => {
  try {
    const { data } = await api.createPost(post); // Whatever was posted into our database is returned
    dispatch({ type: CREATE, payload: data }); // This posts the data into our current store data so front end can
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    const { data } = await api.updatePost(id, post);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id); // Returned data not needed
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};
