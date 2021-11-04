import React from 'react';
import { Grid, CircularProgress } from '@material-ui/core';
import Post from './Post/Post';
import makeStyles from './styles';
import { useSelector } from 'react-redux';

function Posts({ setCurrentId }) {
  const classes = makeStyles();
  const posts = useSelector((state) => state.posts); // Accessing our posts array state from store

  // console.log(posts); // Each post is an object, MongoDB slides in an id automatically

  return !posts.length ? (
    <CircularProgress variant="indeterminate" thickness={21} />
  ) : (
    <Grid className={classes.container} container alignItems="stretch" spacing={3}>
      {posts.map((post) => (
        // For every post, return Grid, passed in the post data as a prop to the post component
        <Grid key={post.id} item xs={12} sm={6}>
          <Post post={post} setCurrentId={setCurrentId} />
        </Grid>
      ))}
    </Grid>
  );
}

export default Posts;
