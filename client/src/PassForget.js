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

const PasswordForgetPage = () => (
    <div>
      <ForgetPassForm />
    </div>
  );
  
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
    email: '',
    error: null,
  };
  
  class PasswordForgetFormBase extends Component {
    constructor(props) {
      super(props);
  
      this.state = { ...INITIAL_STATE };
    }
  
    onSubmit = event => {
      const { email } = this.state;
  
      this.props.firebase
        .doPasswordReset(email)
        .then(() => {
          this.setState({ ...INITIAL_STATE });
        })
        .catch(error => {
          this.setState({ error });
        });
  
      event.preventDefault();
    };
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
      const { email, error } = this.state;
      const { classes } = this.props;

      const isInvalid = email === '';
      return (
        <main className={classes.main}>
          <CssBaseline />
          <Paper className={classes.paper}>
            {/* <Avatar className={classes.avatar}>
            </Avatar> */}
            <h4>Reset Password</h4>
            <img class="card-img-top" src={women} style={{width: "25rem"}} />
            <h4>You will recieve an email to restet your password shortly</h4>
            <form className={classes.form} onSubmit={this.onSubmit}>
              
              <FormControl margin="normal"  fullWidth>
                <InputLabel htmlFor="email">Email Address</InputLabel>
                <Input id="email" name="email" required autoComplete="email" onChange={this.onChange}/>
              </FormControl>

              <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"   
                className={classes.submit}
              >
                email me Bitches
              </Button>
              {error && <p>{error.message}</p>}
            </form>
          </Paper>
        </main>
      );
    }
  }

  const PasswordForgetLink = () => (
    <p>
      <Link to={'/PassForget'}>Forgot Password?</Link>
    </p>
  );
  const ForgetPassForm = compose(
    withRouter,
    withStyles(styles),
    withFirebase,
  )(PasswordForgetFormBase);

  export default PasswordForgetPage;

  export { ForgetPassForm, PasswordForgetLink };