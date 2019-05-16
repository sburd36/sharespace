import React, { Component } from 'react';
import women from "../img/53-.jpg";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link, withRouter } from 'react-router-dom';
import Add from '@material-ui/icons/AddCircleOutline';
import People from '@material-ui/icons/People'

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    bookings: {
        height: window.innerHeight,
        width: window.innerWidth / 2 + 230,
    },
    bigAvatar: {
        position: "relative",
        width: window.innerWidth / 4,
        height: window.innerHeight / 4 ,
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        maxWidth: 500,
        margin: "0rem 5rem 1rem 3rem",
        border: "0.5px solid #d3dbee",
        boxShadow: "none",
        borderRadius: "12px"
    },
    content: {
        display: "flex",
        justifyContent:"space-between",
        alignItems:"center",
        color: "#202e56"
        
    },
    button: {
        width: '220px',
        margin: '0.3rem',
        background: '#202e57',
        textDecoration: 'none'
    }
  });

  const INITIAL_STATE = {
       user: null,
       bookings: [
                {
                    ID: 3857,
                    name: "Stephanie Burd",
                    advocate: "Erika Wu",
                    address: "1234 24th Sunset Bld",
                    location: "QUEEN ANNE",
                    begin: "MONDAY, APRIL 4",
                    end: "FRIDAY, APRIL 25"
                }
                // {
                //     ID: 7394,
                //     name: "Min Yang",
                //     advocate: "Sarah Lee",
                //     address: "1234 24th Sunset Bld",
                //     location: "BEACON HILL",
                //     begin: "WEDNESDAY, MAY 25",
                //     end: "TUESDAY, APRIL 30"
                // },
                // {
                //     ID: 3924,
                //     name: "Mary Huibregtse",
                //     advocate: "Emily Liu",
                //     address: "1234 24th Sunset Bld",
                //     location: "GREENLAKE",
                //     begin: "MONDAY, APRIL 4",
                //     end: "TUESDAY, APRIL 25"
                // },
                // {
                //     ID: 2384,
                //     name: "Abby Huang",
                //     advocate: "Alice Lopez",
                //     address: "1234 24th Sunset Bld",
                //     location: "FREMONT",
                //     begin: "MONDAY, APRIL 4",
                //     end: "TUESDAY, APRIL 25"
                // },
                
            ]
  }
class AdminDash extends Component {
    constructor(props) {
        super(props);    
        this.state = { ...INITIAL_STATE };

    }
    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged((user) => {
            if (user.displayName) {
                console.log(user.displayName)
                this.setState({
                    
                    user: user.displayName
                })
            } else {
                this.setState({
                    user: "Advocate"
                })
            }
        })
        
    }
    render() {
        console.log("Inside render")
        const { classes } = this.props;
        console.log(this.state.user)

        return (
            <div class="pt-4">
                <Grid 
                    container 
                    className={classes.root} 
                    justify="space-evenly" >
                        <Grid key={1} item>
                            <Grid 
                                container 
                                justify="center" 
                                alignItems="center">
                                <Paper id="side" >
                                    <img src={women} className={classes.bigAvatar} />
                                    <h3>Welcome, {this.state.user}</h3>
                                    <Typography class="m-2" color="textSecondary">What would you like to do today?</Typography>
                                    <Link to="bookings">
                                        <Button variant="contained" color="primary" className={classes.button}>
                                        <Add></Add>
                                            New Booking
                                        </Button>
                                    </Link>
                                    <Link to="advocate/bookings">
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            Refer a Host
                                        </Button>
                                    </Link>
                                    <Link to="/bookings">
                                    <Button variant="contained" color="primary" className={classes.button}>
                                    <People></People>
                                        Current Bookings
                                    </Button>
                                    </Link>
                                    <Link to="/bookings">
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            View Analytics
                                        </Button>
                                    </Link>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.bookings} >
                                <h4 class="p-5">
                                    CURRENT BOOKINGS
                                </h4>
                                <Grid container spacing={3}>
                                    {this.state.bookings.map(
                                        (booking) => {
                                            return(
                                                <Grid item xs={6}>                                  
                                                    <Card className={classes.card}>
                                                        <CardContent className={classes.content}>
                                                            <div>
                                                                <Typography style={{maxWidth: 200, color: '#202e57', fontSize: '14pt', fontWeight: 300}}>
                                                                    <strong style={{fontWeight: 500}}>Host:</strong> {booking.name}
                                                                </Typography>
                                                                <Typography style={{color: '#202e57', fontSize: '12pt', fontWeight: 300}}>
                                                                    <strong style={{fontWeight: 500}}>Guest #:</strong> {booking.ID}
                                                                </Typography> 
                                                                <Typography className={classes.pos} style={{color: '#202e57', fontSize: '12pt', fontWeight: 300}}>
                                                                    <strong style= {{fontWeight: 500}}>Advocate:</strong> {booking.advocate}
                                                                </Typography>
                                                            </div>     
                                                            <div>
                                                                <div style={
                                                                        {
                                                                            background: "#202e57", 
                                                                            borderRadius: '1rem', 
                                                                            color: 'white', 
                                                                            padding: '.5rem',
                                                                            //margin: "7px"
                                                                            marginBottom: '7px'
                                                                        }
                                                                    }>
                                                                    {booking.begin} - <br/>{booking.end}
                                                                </div>
                                                                <Typography style={{color:'#da5c48', float:'right', fontSize: '12pt'}}>
                                                                    {booking.location}
                                                                </Typography>
                                                            </div>                                                                                                          
                                                        </CardContent>
                                                    </Card>
                                                </Grid>
                                            )
                                        }
                                    )}
                                </Grid>
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }

}
const Dash = compose(
    withRouter, 
    withStyles(styles),
    withFirebase,
)(AdminDash);

export default Dash;
