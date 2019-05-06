import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { HomeType, Location, Rules, Amenities } from './filter'
import { SpaceSelect, CustomExpand } from './Select'
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import FilledInput from '@material-ui/core/FilledInput';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import { compose } from 'recompose';


const styles = theme => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
    },
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
    formControl: {
      margin: theme.spacing.unit,
      minWidth: 220,
    },
    selectEmpty: {
      marginTop: theme.spacing.unit,
    },
  });

  class Listing extends React.Component {
    constructor(props) {
        super(props)
        this.state ={}
    }
    handleChange = name => event => {
        this.setState({
            [name]: event.target.value
        })
    }
    onInputChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }
    render() {

        const { classes } = this.props;

        return (
            <main className={classes.main}>
                <CssBaseline />
                <Paper className={classes.paper}>

            <Grid container spacing={36}>
            <Grid item xs={12}>
            <FormControl variant="outlined" className={classes.formControl}>
              <InputLabel htmlFor="name">Listing Name</InputLabel>
              <Input id="name" name="name" required autoComplete="name" onChange={this.onInputChange}/>
            </FormControl>
            <FormControl className={classes.formControl}>
            Location
                    <Select
                    value={this.state.location}
                    onChange={this.handleChange('location')}
                    input={<OutlinedInput/>}
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
                value={this.state.home}
                onChange={this.handleChange('home')}
                input={<OutlinedInput/>}
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
                >
                {[1,2,3,4,5,6,7,8,9,10].map((data) => {
                    return(
                        <MenuItem value={data}>{data}</MenuItem>
                    )
                })}
                </Select>
            </FormControl>                      
                
                <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="address">Address</InputLabel>
                    <Input id="address" name="address" required autoComplete="address" onChange={this.onInputChange}/>
                 </FormControl>
                 <FormControl variant="outlined" className={classes.formControl}>
                    <InputLabel htmlFor="zip">Zip Code</InputLabel>
                    <Input id="zip" name="zip" required autoComplete="zip" onChange={this.onInputChange}/>
                </FormControl>
            <div class='d-flex justify-content-between'>
            Home Description
              <TextField
                id="homeDescription"
                multiline
                fullWidth
                label="Descibe your home..."
                margin="normal"
                variant="outlined"
              />
            Check-in Information
              <TextField
                id="checkinInfo"
                multiline
                fullWidth
                label="Check-in information..."
                margin="normal"
                variant="outlined"
              />
            </div>
            <CustomExpand input={Amenities}></CustomExpand>
            <CustomExpand input={Rules}></CustomExpand>         
            </Grid>

            </Grid>
            <Button variant="contained" color="primary" className={classes.button} onClick={this.props.view}>
                    Add
            </Button>
          </Paper>
          </main>
        )
    }
}

const AddListing = compose(
    withStyles(styles),
  )(Listing);
  
  
  export default AddListing;