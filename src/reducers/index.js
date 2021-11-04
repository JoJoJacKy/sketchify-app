import { combineReducers } from 'redux';

import posts from './posts'; // posts is the reducer function
import auth from './auth';

export default combineReducers({
  // Reducers
  posts,
  auth,
});

// export default combineReducers({
//   posts: posts,
// });
