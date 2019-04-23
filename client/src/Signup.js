import React from 'react';
import PropTypes from 'prop-types';
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

export default withStyles(styles)(class extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
      type: "advocate"
    }

  }

  handleChange = (e) => {
    this.setState({
      [e.target.id]: e.target.value
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log(this.state)
    const SIGNUP_API = `http://localhost:4000/dcode`;
    let requestURL = `${SIGNUP_API}/v1/user`;
    // fetch(requestURL, {
    //   method: "POST",
    //   body: this.state
    // })
    //   .then(res => {
    //     return res.text();
    //   })
    //   .then(body => {
    //     console.log(body)
    //   })
    //   .catch(err => {
    //     console.log(`Error: ${err}`);
    //   })
  }

  // fetchSessionID() {
  //   let requestURL = `${DCODE_API}/v1/new`;
  //   // send request to API
  //   fetch(requestURL, {
  //       method: "GET",
  //   })
  //   .then(res => {
  //       return res.text();
  //   })
  //   .then(body => {
  //       this.props.getSessionID(body);
  //       this.props.history.push(`/dcode/${body}`);
  //   })
  //   .catch(err => {
  //       console.log(`Error: ${err}`);
  //   });
  // }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          {/* <Avatar className={classes.avatar}>
          </Avatar> */}
          <h4>I'm an advocate!</h4>
          <img class="card-img-top" src={women} style={{width: "25rem"}} />
          <h4>Sign Up</h4>
          <form className={classes.form} onSubmit={this.handleSubmit}>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">First Name</InputLabel>
              <Input id="firstName" name="firstName" autoComplete="firstName" onChange={this.handleChange} autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="name">Last Name</InputLabel>
              <Input id="lastName" name="lastName" autoComplete="lastName" onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="email">Email Address</InputLabel>
              <Input id="email" name="email" autoComplete="email" onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input name="password" type="password" id="password" autoComplete="current-password" onChange={this.handleChange}/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Confirm Password</InputLabel>
              <Input name="confirmPassword" type="confirmPassword" id="confirmPassword" autoComplete="current-password" onChange={this.handleChange}/>
            </FormControl>
            <FormControlLabel
              control={<Checkbox value="remember" color="pink" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"   
              className={classes.submit}
            >
              Sign up
            </Button>
          </form>
        </Paper>
      </main>
    );
  }
})

// SignUp.propTypes = {
//   classes: PropTypes.object.isRequired,
// };

// export default withStyles(styles)(SignUp);