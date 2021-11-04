import { makeStyles } from '@material-ui/core/styles';

export default makeStyles((theme) => ({
  appBar: {
    borderRadius: 25,
    margin: '30px 0',
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    marginLeft: '15px',
    alignSelf: 'center',
  },

  [theme.breakpoints.down('sm')]: {
    mainContainer: {
      flexDirection: 'column-reverse',
      justifyContent: 'center',
      alignItems: 'center',
    },
  },
}));
