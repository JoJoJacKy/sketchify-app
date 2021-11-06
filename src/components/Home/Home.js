// import { Container, Grow, Grid } from '@material-ui/core';
import Posts from '../Posts/Posts';
import Form from '../Form/Form';
import { useState, useEffect } from 'react';
import { getPosts, getPostsBySearch } from '../../actions/posts';
import { useDispatch } from 'react-redux';
import useStyles from './styles';
import Pagination from '../Pagination';
import { Paper, AppBar, Container, Grow, Grid, TextField, Button, Chip } from '@mui/material';
import { useHistory, useLocation } from 'react-router';
import ChipsArray from './ChipInput';

// Hook to get URL Parameters
function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const classes = useStyles(); // The Styling for the Materials-UI
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(0); // Keeping track of current id
  const [search, setSearch] = useState('');
  const [tags, setTags] = useState([]);

  // Getting the query parameters of the URL
  const query = useQuery();
  const page = query.get('page') || 1;
  const searchQuery = query.get('searchQuery');

  const history = useHistory();

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      // Search Post Functionality (Code 13 is enter key)
      searchPost();
    }
  };

  const searchPost = () => {
    if (search.trim() || tags) {
      const convertedTags = tagConverter(tags);
      // Dispatch -> Searched Posts; Need to render tags as a single string
      dispatch(getPostsBySearch({ search, tags: convertedTags.join(',') }));
      // What refreshes the page
      history.push(`/posts/search?searchQuery=${search || 'none'}&tags=${convertedTags.join(',')}`);
    } else {
      history.push('/');
    }
  };

  const tagConverter = (tagObjects) => {
    const convertedTags = [];
    tagObjects.forEach((tagObj) => {
      const tagLabel = tagObj.label;
      convertedTags.push(tagLabel);
    });
    return convertedTags;
  };

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          className={classes.gridContainer}
          spacing={2}
        >
          <Grid item xs={12} sm={12} md={8} lg={9} xl={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={12} md={4} lg={3} xl={3}>
            <AppBar className={classes.appBarSearch} position="static" color="inherit">
              <TextField
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyPress={handleKeyPress}
              />
              <ChipsArray initialArray={tags} setTags={setTags} />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                color="primary"
                variant="contained"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Pagination page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
