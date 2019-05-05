import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { PersonalSelect } from './Select';
import TextField from '@material-ui/core/TextField';

import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';


const styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 1000,
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
  }
});

// if firebase error, disable submit button


class SignUpFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  onSubmit = event => {
    event.preventDefault();

  };

  onChange = event => {
    console.log(event.target.name + "   " + event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };
  
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <h3>Create Profile</h3>
          <form className={classes.form} onSubmit={this.onSubmit}>
            <FormControl margin="normal" fullWidth>
              <InputLabel htmlFor="name">Phone Number</InputLabel>
              <Input id="phone" name="phone" required autoComplete="phone" onChange={this.onChange} autoFocus />
            </FormControl>
            <PersonalSelect />
              <InputLabel>Personal Statement</InputLabel>
              <TextField
                id="outlined"
                className={classes.story}
                multiline
                fullWidth
                defaultValue="Tell your story."
                margin="normal"
                variant="outlined"
              />
              <Link to="/hostdash">
            <Button 
              type="submit"
              fullWidth
              variant="contained"
              color="primary"   
              className={classes.submit}
            >
              Continue
            </Button>
            </Link>
          </form>
        </Paper>
      </main>
    );
  }
}

const SignUpForm = compose(
  withRouter,
  withStyles(styles),
)(SignUpFormBase);


export default SignUpForm;