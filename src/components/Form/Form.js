import React, { useState, useEffect } from 'react';
import makeStyles from './styles';
import FileBase64 from 'react-file-base64';
import { TextField, Button, Typography, Paper } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createPost, updatePost } from '../../actions/posts';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

// When we want to edit our post, need to get our post id when we click on the horizontal dot icon

function Form({ currentId, setCurrentId }) {
  const classes = makeStyles();
  const history = useHistory();
  const [postData, setPostData] = useState({
    title: '',
    message: '',
    tags: '',
    selectedFile: '',
  });

  const user = JSON.parse(localStorage.getItem('profile'));

  const post = useSelector((state) =>
    currentId ? state.posts.posts.find((post) => post._id === currentId) : null
  ); // Accessing a specific post

  useEffect(() => {
    if (post) setPostData(post);
  }, [post]);

  const dispatch = useDispatch();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (currentId) {
      // If current id is not null this runs
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }));
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }, history));
    }

    clear();
  };
  const clear = () => {
    // Clears out our form
    setCurrentId(null); // Reset the currentId
    setPostData({
      title: '',
      message: '',
      tags: '',
      selectedFile: '',
    });
  };

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories!
        </Typography>
      </Paper>
    );
  }

  return (
    <Paper className={classes.paper} elevation={6}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root} ${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">{currentId ? 'Editing' : 'Creating'} a memory</Typography>

        <TextField
          name="title"
          variant="outlined"
          label="Title"
          fullWidth
          value={postData.title} // Form Values are stored in the state
          onChange={
            (event) => setPostData({ ...postData, title: event.target.value }) // We just clone the state object then overwrite the property we want to overwrite
          }
        ></TextField>
        <TextField
          name="message"
          variant="outlined"
          label="Message"
          fullWidth
          value={postData.message} // Form Values are stored in the state
          onChange={
            (event) => setPostData({ ...postData, message: event.target.value }) // We just clone the state object then overwrite the property we want to overwrite
          }
        ></TextField>
        <TextField
          name="tags"
          variant="outlined"
          label="Tags"
          fullWidth
          value={postData.tags} // Form Values are stored in the state
          onChange={
            (event) => setPostData({ ...postData, tags: event.target.value.split(',') }) // We just clone the state object then overwrite the property we want to overwrite
          } // Allows for split #tags
        ></TextField>
        <div className={classes.fileInput}>
          <FileBase64
            type="file"
            multiple={false}
            onDone={({ base64 }) => setPostData({ ...postData, selectedFile: base64 })}
          ></FileBase64>
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Submit
        </Button>
        <Button variant="contained" color="secondary" size="small" onClick={clear} fullWidth>
          Clear
        </Button>
      </form>
    </Paper>
  );
}

export default Form;
