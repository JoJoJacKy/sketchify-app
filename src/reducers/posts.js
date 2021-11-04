import { FETCH_ALL, UPDATE, CREATE, DELETE } from "../constants/actionTypes";

export default (posts = [], action) => {
  // Need to pass in initial state
  switch (action.type) {
    case FETCH_ALL:
      return action.payload; // Returning data that is held by payload
    case DELETE:
      return posts.filter((post) => post._id !== action.payload); // Keeps all the posts except the one that is equal to the sent ID
    case UPDATE:
      return posts.map(
        (post) => (post._id === action.payload._id ? action.payload : post) // If the id of a post within our state data matches, we update it; If id doesnt, just gets skipped over
      );
    case CREATE:
      return [...posts, action.payload];
    default:
      return posts;
  }
};

// const reducer = (state = [], action) => {
//   switch (action.type) {
//     case "FETCH_ALL":
//       return state;
//     case "CREATE":
//       return state;
//     default:
//       return state;
//   }
// }
