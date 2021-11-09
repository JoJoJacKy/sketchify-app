import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  centerer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  appBar: {
    // borderRadius: 15,
    margin: '30px 0',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: '10px 50px',
    maxWidth: '1500px',
    borderRadius: '8px',
    backdropFilter: 'blur(5px)',
    backgroundColor: 'transparent',
    zIndex: 1,
    boxShadow: 'none',
    color: '#b19cd9',
  },
  heading: {
    color: '#b19cd9',
    textDecoration: 'none',
    display: 'flex',
    justifyContent: 'center',
  },
  image: {
    marginLeft: '15px',
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'flex-end',
    width: '400px',
    [theme.breakpoints.down('sm')]: {
      justifyContent: 'center',
    },
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
    width: '400px',
  },
  userName: {
    display: 'flex',
    alignItems: 'center',
  },
  brandContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    maxWidth: '1000px',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'row',
    },
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
    },
  },

  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
}));
