import React from 'react';
import women from "../img/icon1.png";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// icons
import Add from '@material-ui/icons/AddCircleOutline';
import People from '@material-ui/icons/People';
import Clock from '@material-ui/icons/AccessTime';
import Face from '@material-ui/icons/Face';

import MyProfile from './MyProfile';
import Availability from './AddAvailability';

import CurrentBooking from './CurrentBookings';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    main: {
        height: window.innerHeight,
        width: window.innerWidth / 2 + 250,
    },
    bigAvatar: {
        marginTop: "50px",
        marginBottom: "20px",
        position: "relative",
        width: "30%"
    },
    button: {
        width: '220px',
        margin: '0.3rem',
        background: '#202e57',
        textDecoration: 'none',
        boxShadow: "none",
        fontWeight: 400,
        textTransform: "none",
        fontFamily: 'Source Sans Pro',
        fontSize: '14pt',
    },
    card: {
        maxWidth: 360,
        margin: "0rem 5rem 1rem 3rem"
    },
    content: {
        display: "flex"
    },
    date: {
        padding: "1.5rem 0 0 4rem"
    }
  });
export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "booking",
            bookings: [
                {
                    ID: 1,
                    name: "Stephanie Burd",
                    address: "1234 24th Sunset Bld",
                    begin: "MONDAY APRIL 4 2019",
                    end: "TUESDAY APRIL 25 2019",
                },
                {
                    ID: 2,
                    name: "Min Yang",
                    address: "1234 24th Sunset Bld",
                    begin: "MONDAY APRIL 4 2019",
                    end: "TUESDAY APRIL 25 2019",
                },
                {
                    ID: 3,
                    name: "Mary Huibregtse",
                    address: "1234 24th Sunset Bld",
                    begin: "MONDAY APRIL 4 2019",
                    end: "TUESDAY APRIL 25 2019",
                },
                {
                    ID: 4,
                    name: "Abby Huang",
                    address: "1234 24th Sunset Bld",
                    begin: "MONDAY APRIL 4 2019",
                    end: "TUESDAY APRIL 25 2019",
                },
                
            ]
        }
    }

    handleView = name => event => {
        this.setState({view: name})
    }

    handleAvailability = () => {
        this.setState({
            open: !this.state.open
        })
    }

    render() {
        const { classes } = this.props;
        return (
            <div class="pt-4">
                <Grid 
                    container 
                    className={classes.root} 
                    justify="space-evenly" >
                        <Grid key={1} item >
                            <Grid 
                                container 
                                justify="center" 
                                alignItems="center"
                                >
                                <Paper id="side" style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}}>
                                    <img id="bigAvatar" src={women} className={classes.bigAvatar} />
                                    <h4 style={{fontWeight: 300}}>Welcome, Host</h4>
                                    <Typography color="textSecondary" style={{fontWeight: 300}}>What would you like to do today?</Typography>
                                    <Button id='button' onClick={this.handleAvailability} variant="contained" color="primary" className={classes.button}>
                                        Add Availability
                                    </Button>  
                                    <Availability open={this.state.open} click={this.handleAvailability}></Availability>
                                    <Button id="button" variant="contained" color="primary" className={classes.button} onClick={this.handleView('booking')}>
                                        Current Bookings
                                    </Button>
                                    {/* <Button id="button" variant="contained" color="primary" className={classes.button}>
                                    
                                        Past Stays
                                    </Button> */}   
                                    {/* <Button id="button" variant="contained" color="primary" className={classes.button}>
                                        View Analytics
                                    </Button> */}
                                    <Button id="button" variant="contained" color="primary" className={classes.button} onClick={this.handleView('profile')}>
                                        My Profile
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.main} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}}>
                                <Typography className="pt-5 pl-5" variant="h4" gutterBottom>
                                </Typography>
                                <Grid container spacing={6}>
                                { 
                                    this.state.view == 'profile' && <MyProfile></MyProfile>
                                }
                                {
                                    this.state.view == 'booking' && <CurrentBooking ></CurrentBooking>
                                }
                                </Grid>
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }
})
