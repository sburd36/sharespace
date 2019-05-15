import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import Paper from '@material-ui/core/Paper';
import withStyles from '@material-ui/core/styles/withStyles';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import { withFirebase } from '../Firebase';
import { PersonalSelect } from '../Select';
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
    width: 100
  },
  select: {
    width: 100
  }
});

const INFORMATION = {
  phone: '',
  gender: 'none',
  languages: [],
  ethnicities: [],
  religion: [],
  story: 'none',
};

class ProfileFormBase extends Component {
  constructor(props) {
    super(props);
    this.state = { INFORMATION }
  }

  onSubmit = event => {
    event.preventDefault();
    console.log(this.state);
    const { phone, gender,languages,ethnicities,religion,story } = this.state
    this.props.firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.uid)
        this.props.firebase.user(user.uid).update({
          'phone': phone, 
          'gender': gender, 
          'languages': languages,
          'ethnicities': ethnicities,
          'religion': religion,
          'story': story 
        })
        .then(() => {
          this.setState({...INFORMATION});
          this.props.history.push('/host/dash')
        })
        .catch(error => {
          this.setState({ error });
        });

      } else {
        console.log("no host signed in")

      }
  })

  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    console.log(this.state)
  };
  onSelect = (name) => (selected) => {
    this.setState({
      [name]: selected
    })
    console.log(this.state)
    // console.log(this.state.ethnicities + " ON SELECT: ")
  }
  render() {
    const { classes } = this.props;

    return (
      <main className={classes.main}>
        <CssBaseline />
        <Paper className={classes.paper}>
          <h3>Create Profile</h3>
          <form className={classes.form} onSubmit={this.onSubmit} >
          <Grid container spacing={16}>
            <Grid item xs={6}>
              <FormControl margin="normal" fullWidth>
                <InputLabel htmlFor="name">Phone Number</InputLabel>
                <Input id="phone" name="phone" required autoComplete="phone" onChange={this.onChange} autoFocus />
              </FormControl>
              <FormControl>
                <InputLabel htmlFor="gender">Gender</InputLabel>
                <Select
                  value={this.state.gender}
                  onChange={this.onChange}
                  className={classes.select}
                  inputProps={{
                    name: 'gender',
                    id: 'gender'
                  }}
                  >
                  <MenuItem value="male">Male</MenuItem>
                  <MenuItem value="female">Female</MenuItem>
                </Select>
              </FormControl>
            </Grid>  
            <PersonalSelect size="6" onSelect={this.onSelect}/>
          </Grid>
            <TextField
                  id="outlined"
                  className={classes.story}
                  multiline
                  fullWidth
                  name="story"
                  label="Tell your story."
                  margin="normal"
                  variant="outlined"
                  onChange={this.onChange}
                />
              {/* <Link to="/hostdash"> */}
              <div class="d-flex justify-content-center">
                <Button 
                type="submit"
                fullWidth
                variant="contained"
                color="primary"   
                className={classes.submit}
                >
                Continue
                </Button>
              </div>
            {/* </Link> */}
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
)(ProfileFormBase);


export default SignUpForm;