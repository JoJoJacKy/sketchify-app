import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  media: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    maxHeight: '540px',
    maxWidth: '960px',
    borderRadius: '20px',
    [theme.breakpoints.down('lg')]: {
      maxHeight: '480px',
      maxWidth: '848px',
    },
    [theme.breakpoints.down('md')]: {
      maxHeight: '360px',
      maxWidth: '640px',
    },
  },
  card: {
    display: 'flex',
    width: '100%',
    [theme.breakpoints.down('sm')]: {
      flexWrap: 'wrap',
      flexDirection: 'column-reverse',
      justifyContent: 'center',
    },
  },
  section: {
    borderRadius: '20px',
    margin: '10px',
    flex: 1,
  },
  imageSection: {
    marginLeft: '20px',
    [theme.breakpoints.down('sm')]: {
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  recommendedPosts: {
    display: 'flex',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },
  loadingPaper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    borderRadius: '15px',
    height: '39vh',
  },
  commentsOuterContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
  },
  commentsInnerContainer: {
    height: '200px',
    overflowY: 'auto',
    marginRight: '30px',
  },
}));
