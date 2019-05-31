import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import women from "../img/icon2.png";
import HostInfo from './HostInfo';
import { Host } from '../filter';
import Calendar from './AdvoCalendar';

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
export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'list',
            request: 'confirm'
        }
    }

    handleRequestType = (value) => (event) => {
        this.setState({
            request: value
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
        const { view, request } = this.state;
        let title = '';
        if (request === 'confirm') {
            title = 'CURRENT BOOKINGS'
        } else {
            title = 'PENDING BOOKINGS REQUESTS'
        }
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
                                    <h4 style={{fontWeight: 300}}>Welcome, Sally</h4>
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
                                        <Button variant="contained" color="primary" className={classes.button} id="button" onClick={this.handleRequestType('confirm')}>
                                            Current Bookings
                                        </Button>
                                    <Button variant="contained" color="primary" className={classes.button} id="button" onClick={this.handleRequestType('pending')}>
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
                                <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px'}}>
                                    <h3 class="mt-4">
                                    {title}
                                    </h3>
                                    <div>
                                        Show Calendar
                                        <Switch value="view" onChange={this.handleSwitchView}/>
                                    </div>
                                </div>
                                <Grid container spacing={3}>

                                {
                                    view === 'list' ? 
                                    <>
                                        {Host.map(
                                            (booking) => {
                                                let date = this.convertToDate(booking.space[0].availability[0].start, booking.space[0].availability[0].end)
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
                                                        <HostInfo type='booked' booking={booking} open={this.state.open} click={this.handleCardClick}></HostInfo>    
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
})
