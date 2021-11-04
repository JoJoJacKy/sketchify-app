import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useState, useEffect } from 'react';
import { getPosts } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import useStyles from '../../styles';

const Home = () => {
  const classes = useStyles(); // The Styling for the Materials-UI
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null); // Keeping track of current id

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]); // When currentId is changed back to null, App Component Rerenders and Reruns Get Posts Actions

  return (
    <Grow in>
      <Container>
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          className={classes.mainContainer}
          spacing={3}
        >
          <Grid item xs={12} sm={12} md={8}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
