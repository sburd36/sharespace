import React from 'react';
import women from "../img/icon1.png";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';

// icons
import People from '@material-ui/icons/People';
import Clock from '@material-ui/icons/AccessTime';
import Face from '@material-ui/icons/Face';

import MyProfile from './MyProfile';
import Availability from './AddAvailability';
import MyListings from './MyListing';
import HostCalendar from './HostCalendar';

import Bookings from './Bookings';

// firebase
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    main: {
        height: "100vh",
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
  class HostDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            listings: [],
            view: "calendar",
            bookings: [
                {
                    ID: "",
                    name: "",
                    address: "",
                    begin: "",
                    end: "",
                },
                
            ],
            bookingType: 'confirmed'
        }
    }

    componentDidMount() {
        let currentUser = "";
        this.props.firebase.auth.onAuthStateChanged((user)=> {
            if(user) {
                currentUser = user.uid 
                console.log(user.uid)
                console.log(this.state)
            } else {
                console.log('no valid ID')
            }

        })
        console.log(this.props)
        let foundListings = this.props.profile.listingIDs
        console.log(foundListings)
        if(foundListings === undefined || foundListings[1] === undefined) {
            console.log("no updated profile")
        } else {
            if(this.props.profile.listingIDs.length != 0) {
                let spacesQuery = this.props.firebase.listings();
                spacesQuery.once('value').then((snapshot) =>{
                    let obj = snapshot.val();                       
                        let spaceIDs = []
                        let spaces = []
                        for (let i = 0; i < foundListings.length; i ++) {
                            let current = obj[foundListings[i]];
                            let theSpace = {
                                id: foundListings[i],
                                hostID: currentUser,
                                description: current['description'],
                                type: current['type'],
                                guestCount: current['guestCount'],
                                address: current['address'],
                                location: current['location'],
                                amenities: current['amenities'],
                                instructions: current['information'],
                                houseRules: current['houseRules'],
                                zip: current['zip'],
                                currentBookings: [],
                                availability: [],
                                pastBookings: []

                            }
                            if(current['currentBookings']!== undefined) {
                                theSpace.currentBookings = current['currentBookings']

                            }
                            if(current['pastBookings'] !== undefined) {
                                theSpace.pastBookings = current['pastBookings']
                            }
                            if(current['availability'] !== undefined) {
                                theSpace.pastBookings = current['pastBookings']
                            }
                            spaces.push(theSpace)
                            console.log(spaces)
                        }
                        this.props.updateListing(spaces)
                        this.setState({
                            listings: spaces
                        })

                        console.log(this.state)    
                })   

            }
        } 
            // if(this.props.profile.listings === undefined || this.prop) {
                
        
            // }


       
    }

    handleAvailability = () => {
        this.setState({
            open: !this.state.open
        })
    }   
     handleView = (view, type) => event => {
        this.setState({
            view: view,
            bookingType: type
        })
    }

    render() {
        console.log(this.props)
        const { classes } = this.props;
        const { bookingType } = this.state;
        var style = {
            navigator: {
                boxShadow: "none", 
                border:"0.5px solid #d3dbee", 
                backgroundColor: "#fdfdfe", 
                borderRadius: "12px"
            }
        }
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
                                <Paper id="side" style={style.navigator}>
                                    <img id="bigAvatar" src={women} className={classes.bigAvatar} />
                                    <h4 style={{fontWeight: 300}}>Welcome, {this.props.user.firstName}</h4>
                                    <Typography color="textSecondary" style={{fontWeight: 300}}>What would you like to do today?</Typography>
                                    <Button id='button' variant="contained" color="primary" className={classes.button} onClick={this.handleView('calendar')}>
                                        My Calendar
                                    </Button>  
                                    <Availability open={this.state.open} click={this.handleAvailability} updateAvailability={this.props.updateAvailability} profile={this.props.profile}></Availability>
                                    <Button id="button" variant="contained" color="primary" className={classes.button} onClick={this.handleView('bookings', 'confirmed')}>
                                        Current Bookings
                                    </Button>
                                    <Button id="button" variant="contained" color="primary" className={classes.button} onClick={this.handleView('bookings', 'pending')}>
                                        Bookings Requests
                                    </Button>
                                    <Button id="button" variant="contained" color="primary" className={classes.button} onClick={this.handleView('profile')}>
                                        My Profile
                                    </Button>
                                    <Button id="button" variant="contained" color="primary" className={classes.button} onClick={this.handleView('listings')}>
                                        My Listings
                                    </Button>
                                </Paper>
                                <Paper style={style.navigator}>
                                    
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.main} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}}>
                                <Typography className="pt-5 pl-5" variant="h4" gutterBottom> 
                                </Typography>
                                <Grid container spacing={6}>
                                { 
                                    this.state.view == 'profile' && <MyProfile user={this.props.user} profile={this.props.profile} updateListings={this.props.updateListing}></MyProfile>
                                }

                                { 
                                    this.state.view == 'listings' && <MyListings user={this.props.user} profile={this.props.profile} updateListing={this.props.updateListing}></MyListings>
                                }
                                {
                                    this.state.view == 'bookings' && <Bookings type={bookingType} profile={this.props.profile} updateListing={this.props.updateListing}></Bookings>
                                }
                                {
                                    this.state.view == 'calendar' && <HostCalendar />
                                }
                                </Grid>
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }
}

const Dash = compose(
    withStyles(styles),
    withFirebase,
  )(HostDash);

  export default Dash;

