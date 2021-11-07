import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  FETCH_POST,
  UPDATE,
  CREATE,
  DELETE,
  START_LOADING,
  END_LOADING,
  COMMENT,
} from '../constants/actionTypes';

export default (state = { isLoading: true, posts: [] }, action) => {
  // Need to pass in initial state
  switch (action.type) {
    case START_LOADING:
      return { ...state, isLoading: true };
    case END_LOADING:
      return { ...state, isLoading: false };
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      }; // Returning data that is held by payload
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload }; // Returns to the "front end"
    case FETCH_POST:
      return { ...state, post: action.payload }; // Returns to the "front end"
    case DELETE:
      return { ...state, posts: state.posts.filter((post) => post._id !== action.payload) }; // Keeps all the posts except the one that is equal to the sent ID
    case UPDATE:
      return {
        ...state,
        posts: state.posts.map((post) => (post._id === action.payload._id ? action.payload : post)),
      }; // If the id of a post within our state data matches, we update it; If id doesnt, just gets skipped over

    case CREATE:
      return { ...state, posts: [...state.posts, action.payload] };
    case COMMENT:
      return {
        ...state,
        posts: state.posts.map((post) => {
          // Return all the posts, and update the post that was commented on
          if (post._id === action.payload._id) {
            return action.payload;
          }
          return post;
        }),
      };
    default:
      return state;
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
