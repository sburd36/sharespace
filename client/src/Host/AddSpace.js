import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { HomeType, Location, Rules, Amenities } from '../filter'
import { CustomExpand } from '../Select'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import { compose } from 'recompose';


const styles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
          width: 1200,
          height: 3000,
          marginLeft: 'auto',
          marginRight: 'auto',
        },
      },
      paper: {
        marginTop: theme.spacing.unit * 2,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
      },
      form: {
        height: 3000
      },
    formControl: {
      margin: theme.spacing.unit * 2,
      minWidth: 200,
    },
    select: {
      height: 50
    },
    selectEmpty: {
      marginTop: theme.spacing.unit,
    },
  });
  const SPACE = {
    name: '',
    location: '',
    type: '',
    address: '',
    zip: '',
    guests: 0,
    photos: [],
    description: '',
    information: '',
    amenities: [],
    rules: []
  };

  class Listing extends React.Component {
    constructor(props) {
        super(props)
        this.state ={
          amenities: {},
          rules: {}
        }
    }
    
    onSubmit = event => {
      event.preventDefault();
      console.log(this.state);
    };

    // For Select
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
        console.log(this.state)
    }

    // For Input
    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    handleChecked = (name, selected) => (event) => {
      var obj = this.state[`${name}`];
      obj[`${selected}`] = event.target.checked;
      this.setState({[name]: obj})
    }

    handleClick = () => {
      console.log(this.state)
    }

    onSubmit = (event) => {
      event.preventDefault();
    }
    render() {

        const { classes } = this.props;

        return (
            <main className={classes.main}>
              <CssBaseline />
              <form className={classes.form} onSubmit={this.onSubmit}>
                <Grid container spacing={36}>
                  <Grid item xs={12}>
                    <FormControl variant="outlined" className={classes.formControl}>
                      <InputLabel htmlFor="name">Listing Name</InputLabel>
                      <Input id="name" name="name" required autoComplete="name" onChange={this.onInputChange}/>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="location"></InputLabel>
                      Location
                      <Select
                      id="location"
                      value={this.state.location}
                      onChange={this.handleChange('location')}
                      input={<OutlinedInput/>}
                      className={classes.select}
                      required
                      >
                      {Location.values.map((data) => {
                          return(
                              <MenuItem value={data}>{data}</MenuItem>
                          )
                      })}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      Home Type
                      <Select
                      value={this.state.type}
                      onChange={this.handleChange('type')}
                      input={<OutlinedInput/>}
                      className={classes.select}
                      >
                      {HomeType.values.map((data) => {
                          return(
                              <MenuItem value={data}>{data}</MenuItem>
                          )
                      })}
                      </Select>
                    </FormControl>
                    <FormControl className={classes.formControl}>
                      Number of Guests
                      <Select
                      value={this.state.home}
                      onChange={this.handleChange('home')}
                      input={<OutlinedInput/>}
                      className={classes.select}
                      >
                      {[1,2,3,4,5].map((data) => {
                          return(
                              <MenuItem value={data}>{data}</MenuItem>
                          )
                      })}
                      </Select>
                    </FormControl>                      
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="address">Address</InputLabel>
                        <Input id="address" name="address" required onChange={this.onInputChange}/>
                    </FormControl>
                    <FormControl variant="outlined" className={classes.formControl}>
                        <InputLabel htmlFor="zip">Zip Code</InputLabel>
                        <Input id="zip" name="zip" required onChange={this.onInputChange}/>
                    </FormControl>
                    <input
                      accept="image/*"
                      id="contained-button-file"
                      multiple
                      type="file"
                      onChange={(e) => console.log(e.target.files)}
                    />
                    <label htmlFor="contained-button-file">
                    </label>
                    <div class='d-flex justify-content-between p-2'>
                      <TextField
                        id="homeDescription"
                        className='pr-3'
                        multiline
                        fullWidth
                        label="Descibe your home..."
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('description')}
                      />
                      <TextField
                        id="checkinInfo"
                        multiline
                        fullWidth
                        label="Check-in information..."
                        margin="normal"
                        variant="outlined"
                        onChange={this.handleChange('information')}
                      />
                    </div>
                    <CustomExpand input={Amenities} select={this.handleChecked}></CustomExpand>
                    <CustomExpand input={Rules} select={this.handleChecked}></CustomExpand>         
                  </Grid>
                </Grid>
                <Button variant="contained" color="primary" className={classes.button}>
                    Add
                </Button>
            </form>
          </main>
        )
    }
}

const AddListing = compose(
    withStyles(styles),
  )(Listing);
  
  
  export default AddListing;