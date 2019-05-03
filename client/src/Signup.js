import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import women from "./img/53-.jpg"
import { withFirebase } from './Firebase';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';

const userObject = null
const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
});


const INITIAL_STATE = {
  userObject: null,
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  passwordConf: '',
  type: 'Advocate',
  error: null,
};

const ERROR_CODE_ACCOUNT_EXISTS = 'auth/email-already-in-use';

const ERROR_MSG_ACCOUNT_EXISTS = `
  An account with this E-Mail address already exists.
  Try to login with this account instead. If you think the
  account is already used from one of the social logins, try
  to sign in with one of them. Afterward, associate your accounts
  on your personal account page.
`;
// if firebase error, disable submit button


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };
  }

  onSubmit = event => {
    event.preventDefault();

    console.log("inside event")
    const { email, password, firstName, lastName, type, userObject } = this.state;
    console.log("current state: " + this.state)
    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, password)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        this.props.firebase.auth.currentUser.updateProfile({
          displayName: firstName + " " + lastName
        })
        userObject = this.props.firebase.auth.currentUser
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            firstName,
            lastName,
            email,
            type,
          });
      })
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push('/advocate');
      })
      .catch(error => {
        this.setState({ error });
      });

  };

  onChange = event => {
    console.log(event.target.name + "   " + event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
    const { classes } = this.props;
    const {
      userObject, 
      firstName,
      lastName,
      email,
      password,
      passwordConf,
      type,
      error,
    } = this.state;

    const isInvalid =
      password !== passwordConf ||
      password === '' ||
      email === '' ||
      firstName === '' ||
      lastName === '';

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          </Avatar> */}
          <h4>I'm an advocate!</h4>
          <img class="card-img-top" src={women} style={{width: "25rem"}} />
          <h4>Sign Up</h4>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="name">First Name</InputLabel>
              <Input id="firstName" name="firstName" required autoComplete="firstName" onChange={this.onChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="name">Last Name</InputLabel>
              <Input id="lastName" name="lastName" required autoComplete="lastName" onChange={this.onChange}/>
            </FormControl> 
            <FormControl margin="normal"  fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" required autoComplete="email" onChange={this.onChange}/>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" required type="password" id="password" autoComplete="current-password" onChange={this.onChange}/>
            </FormControl>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input name="confirmPassword" required type="confirmPassword" id="confirmPassword" autoComplete="current-password" onChange={this.onChange}/>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="secondary" />}
              label="Remember me"
            />
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"   
              className={classes.submit}
            >
              Sign up Bitches
            </Button>
            {error && <p>{error.message}</p>}
          </form>
        </Paper>
      </main>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withStyles(styles),
  withFirebase,
)(SignUpFormBase);


export default { SignUpForm, userObject };