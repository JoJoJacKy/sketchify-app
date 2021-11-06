import { Avatar, Button, Paper, Grid, Typography, Container, Grow } from '@material-ui/core';
import useStyles from './styles';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Input from './Input';
import { useState } from 'react';
import { GoogleLogin } from 'react-google-login';
import Icon from './icon';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin, signup } from '../../actions/auth';

const initialState = { firstName: '', lastName: '', email: '', password: '', confirmPassword: '' };

const Auth = () => {
  const classes = useStyles();

  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();

  // JWT State
  const [formData, setFormData] = useState(initialState);

  // For JWT Sign-In Button
  const handleSubmit = (event) => {
    event.preventDefault();

    if (isSignup) {
      // Sign Up Logic: Pass the form data and history (For routing) to the action creators
      dispatch(signup(formData, history));
    } else {
      // Sign In Logic
      dispatch(signin(formData, history));
    }
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // The setState() Function has access to the previous State Value
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };

  const googleSuccess = async (response) => {
    const result = response?.profileObj; // Optional Chaining, returns undefined if the chaining fails
    const token = response?.tokenId;

    try {
      dispatch({ type: 'AUTH', data: { result, token } });
      history.push('/'); // Automatically redirects to previous route
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (error) => {
    console.log('Google Sign In was unsuccessful. Try Again');
    alert('Google Sign In was unsuccessful. Try Again');
    console.log(error);
  };

  return (
    <Grow in>
      <Container component="main" maxWidth="xs">
        <Paper className={classes.paper} elevation={3}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography variant="h5">{isSignup ? 'Sign Up' : 'Sign In'}</Typography>

          <form className={classes.form} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              {isSignup && (
                <>
                  <Input name="firstName" label="First Name" handleChange={handleChange} half={6} />

                  <Input name="lastName" label="Last Name" handleChange={handleChange} half={6} />
                </>
              )}
              <Input name="email" label="Email Address" handleChange={handleChange} type="email" />
              <Input
                name="password"
                label="Password"
                handleChange={handleChange}
                type={showPassword ? 'text' : 'password'}
                handleShowPassword={handleShowPassword}
              />
              {isSignup && (
                <Input
                  name="confirmPassword"
                  label="Repeat Password"
                  handleChange={handleChange}
                  type="password"
                />
              )}
            </Grid>

            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? 'Sign Up' : 'Sign In'}
            </Button>

            <GoogleLogin
              clientId="676767305967-rm0kjhaqmihn3d2t4q8bol94qeu8i32u.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disable={renderProps.disabled.toString()} // Added toString() to dodge errors
                  startIcon={<Icon />}
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />

            <Grid container justifyContent="flex-end">
              <Grid item>
                <Button
                  onClick={switchMode}
                  className={classes.submit}
                  variant="contained"
                  color="secondary"
                >
                  {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
      </Container>
    </Grow>
  );
};

export default Auth;
