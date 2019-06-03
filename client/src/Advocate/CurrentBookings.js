import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import purple from '@material-ui/core/colors/purple';

import women from "../img/icon2.png";
import HostInfo from './HostInfo';
import { Host } from '../filter';
import Calendar from './AdvoCalendar';

// firebase
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

import {Paper, Typography,Grid, Button, Card, CardContent, withStyles, Switch } from '@material-ui/core/'

import moment from 'moment';

const styles = theme => ({
    root: {
      flexGrow: 1
    },
    bookings: {
        height: window.innerHeight,
        width: window.innerWidth / 2 + 230,
    },
    bigAvatar: {
        marginTop: "50px",
        marginBottom: "20px",
        position: "relative",
        width: "30%"
    },
    button: {
        margin: theme.spacing.unit,
    },
    card: {
        maxWidth: 500,
        margin: "0rem 5rem 1rem 3rem",
        border: "0.5px solid #d3dbee",
        boxShadow: "none",
        fontFamily: 'Source Sans Pro',
        borderRadius: "12px"
    },
    content: {
        display: "flex",
        justifyContent:"space-between",
        alignItems:"center",
        fontFamily: 'Source Sans Pro',
        color: "#202e56"
        
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
    cardContent:{
        fontFamily: 'Source Sans Pro',
        color: '#202e57',
        fontWeight: 300
    }
  });
class Bookings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'list',
            type: 'confirmed',
            user: {},
            name: "",
            currentBookings: [],
            pendingBookings: [],
        }

        
    }

    componentDidMount() {
        let currentUser = "";
        console.log(this.props)
        this.props.firebase.auth.onAuthStateChanged((user)=> {
            if(user) {
                currentUser = user.uid 
                this.props.firebase.user(user.uid).on('value', snapshot=>{
                    let obj = snapshot.val(); 
                    console.log(obj)
                    this.setState({
                        user: obj,
                        name: obj.firstName
                    });
                })
                console.log(user.uid)
                console.log(this.state)
                let listingQuery = this.props.firebase.availabilities();


                listingQuery.orderByChild("state").equalTo("booked").on('value', snapshot=>{
                    let obj = snapshot.val();
                    console.log(obj);
                    if (obj != null) {
                        let book = Object.keys(obj).map(key => ({
                            ...obj[key],
                          })); 
                        
                          this.setState({
                            currentBookings: book  
                        })
                    }
                })
                
                listingQuery.orderByChild("state").equalTo("pending").on('value', snapshot=>{
                    let obj = snapshot.val();
                    console.log(obj);
                    if (obj != null) {
                        let book = Object.keys(obj).map(key => ({
                            ...obj[key],
                          })); 
                        
                          this.setState({
                            pendingBookings: book  
                        })
                    }
                })
                
            } else {
                console.log('no valid ID')
            }

        })

    }




    handleRequestType = (value) => (event) => {
        this.setState({
            type: value
        })
    }

    handleCardClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleSwitchView = (event) => {
        this.setState({
            view: event.target.checked ? "calendar" : "list"
        })
    }

    convertToDate = (start, end) => {
        var start = new Date(start);
        var end = new Date(end);
        
        return {
            start: moment(start.toLocaleString()).format("ddd, MMMM").toUpperCase() + moment(start.toLocaleString()).format(" DD"),
            end:  moment(end.toLocaleString()).format("ddd, MMMM").toUpperCase() + moment(end.toLocaleString()).format(" DD")
        };
    }

    render() {
        const { classes } = this.props;
        const { view, type } = this.state;
        let title = '';
        let bookings = '';
        if (type === 'confirmed') {
            title = 'CURRENT BOOKINGS'
            bookings = this.state.currentBookings;
        } else {
            title = 'PENDING BOOKINGS REQUESTS'
            bookings = this.state.pedningBookings;
        }

        // {(this.state.current)}
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
                                <Paper id="side" style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}} >
                                    <img src={women} className={classes.bigAvatar} />
                                    <h4 style={{fontWeight: 300}}>Welcome, {this.state.name}</h4>
                                    <Typography class="m-2 mb-3" color="textSecondary" style={{fontWeight: 300}}>What would you like to do today?</Typography>
                                    <Link to="/advocate/searchbookings">
                                        <Button variant="contained" color="primary" className={classes.button} id="button">
                                            New Booking
                                        </Button>
                                    </Link>
                                    <Link to="/bookings">
                                        <Button variant="contained" color="primary" className={classes.button} id="button">
                                            Refer a Host
                                        </Button>
                                    </Link>
                                    <Link to="/advocate/currentbookings">
                                        <div>
                                            <Button variant="contained" color="primary" className={classes.button} id="button" onClick={this.handleRequestType('confirmed')}>
                                                Current Bookings
                                            </Button>
                                        </div>
                                    <Button variant="contained" color="primary" className={classes.button} style={{fontSize: "12pt"}}id="button" onClick={this.handleRequestType('pending')}>
                                        Pending Booking Requests
                                    </Button>
                                    </Link>
                                    {/* <Link to="/bookings">
                                        <Button variant="contained" color="primary" className={classes.button} id="button">
                                            View Analytics
                                        </Button>
                                    </Link> */}
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.bookings} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}} >
                                <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px', paddingBottom: '20px'}}>
                                    <h3 class="mt-4">
                                    {title}
                                    </h3>
                                    <div>
                                        <p style={{fontSize: "12pt", fontWeight: "300", paddingTop: "30px"}}>
                                            Show Calendar
                                            <Switch 
                                                value="view"
                                                onChange={this.handleSwitchView}/>
                                        </p>
                                        
                                    </div>
                                </div>
                                <Grid container spacing={3}>
                                {
                                    bookings.length === 0 && <p>No bookings</p>
                                }
                                {
                                    view === 'list' ? 
                                    
                                    <>
                                        {bookings.map(
                                            (booking) => {
                                                let date = this.convertToDate(booking.start, booking.end)
                                                return(
                                                    <Grid item xs={6}>                                  
                                                        <Card className={classes.card} onClick={this.handleCardClick} id="hoverCard">
                                                            <CardContent className={classes.content}>
                                                                <div>
                                                                    <Typography className={classes.cardContent} style={{maxWidth: 200, fontSize: '14pt'}}>
                                                                        <strong style={{fontWeight: 500}}>Host:</strong> {booking.information.name}
                                                                    </Typography>
                                                                    <Typography className={classes.cardContent} style={{fontSize: '12pt'}}>
                                                                        <strong style={{fontWeight: 500}}>Guest #:</strong> {booking.space[0].guestID}
                                                                    </Typography> 
                                                                    <Typography className={classes.cardContent} style={{fontSize: '12pt'}}>
                                                                        <strong style= {{fontWeight: 500}}>Advocate:</strong> {booking.advocate}
                                                                    </Typography>
                                                                </div>     
                                                                <div>
                                                                    <div style={{
                                                                                borderRadius: '10px', 
                                                                                color: '#202e57', 
                                                                                padding: '.5rem',
                                                                                marginBottom: '7px'
                                                                            }}>
                                                                        {date.start} - <br/>{date.end}
                                                                    </div>
                                                                    <Typography style={{color:'#da5c48', float:'right', fontSize: '12pt'}}>
                                                                        {booking.space[0].location}
                                                                    </Typography>
                                                                </div>                                                                                                          
                                                            </CardContent>
                                                        </Card>
                                                        <HostInfo type={type} booking={bookings} open={this.state.open} click={this.handleCardClick}></HostInfo>    
                                                    </Grid>
                                                )
                                            }
                                        )}
                                    </>
                                    :
                                    <Calendar />
                                }
                                    
                                </Grid>
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }
}

const CurrentBookings = compose(
    withStyles(styles),
    withFirebase,
  )(Bookings);

  export default CurrentBookings;
