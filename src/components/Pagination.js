import React, { useEffect } from 'react';
import { Pagination, PaginationItem } from '@mui/lab';
import useStyles from './styles.js';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../actions/posts.js';

// Here we fetch posts any time the page changes
const Paginate = ({ page }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { numberOfPages } = useSelector((state) => state.posts);

  useEffect(() => {
    if (page) dispatch(getPosts(page));
  }, [page]);

  return (
    <Pagination
      classes={{ ul: classes.ul }}
      count={numberOfPages}
      page={Number(page) || 1}
      color="secondary"
      renderItem={(item) => (
        <PaginationItem {...item} component={Link} to={`/posts?page=${item.page}`} />
      )}
    />
  );
};

export default Paginate;
