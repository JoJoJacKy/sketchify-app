import axios from 'axios';

// So we can call to any API endpoint
// const API = axios.create({ baseURL: 'http://localhost:5000/' });
const API = axios.create({ baseURL: 'https://memories-projex.herokuapp.com' });

// So middleware works
API.interceptors.request.use((request) => {
  if (localStorage.getItem('profile')) {
    // Adding the token onto the header of the request
    request.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
  }

  return request;
});

// export const fetchPosts = () => axios.get(url);
export const fetchPosts = () => API.get('/posts');
export const createPost = (newPost) => API.post('/posts', newPost); // This posts the data into our Database
export const updatePost = (id, updatedPost) => API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/likePost`);

export const signin = (formData) => API.post('/user/signin', formData);
export const signup = (formData) => API.post('/user/signup', formData);
