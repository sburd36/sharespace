import React, { Component } from 'react';
import women from "../img/icon2.png";
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import { Link } from 'react-router-dom'
import Add from '@material-ui/icons/AddCircleOutline';
import People from '@material-ui/icons/People'
import HostInfo from './HostInfo';
import { Host } from '../filter';
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
            
        }
    }

    handleCardClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    convertToDate = (start, end) => {
        var start = new Date(start);
        var end = new Date(end);
        return {
            start: moment(start.toLocaleString()).format("MMMM DD"),
            end: moment(end.toLocaleString()).format("MMMM DD")
        };
    }

    render() {
        const { classes } = this.props;
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
                                        {/* <Add></Add> */}
                                            New Booking
                                        </Button>
                                    </Link>
                                    <Link to="/bookings">
                                        <Button variant="contained" color="primary" className={classes.button} id="button">
                                            Refer a Host
                                        </Button>
                                    </Link>
                                    <Link to="/advocate/currentbookings">
                                    <Button variant="contained" color="primary" className={classes.button} id="button">
                                    {/* <People></People> */}
                                        Current Bookings
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
                                <h4 class="pl-5 pt-5 pb-2">
                                    CURRENT BOOKINGS
                                </h4>
                                <Grid container spacing={3}>
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
                                                                <div style={
                                                                        {
                                                                            //background: "#202e57", 
                                                                            borderRadius: '10px', 
                                                                            //border: '.5px solid #202e57',
                                                                            color: '#202e57', 
                                                                            padding: '.5rem',
                                                                            //margin: "7px"
                                                                            marginBottom: '7px'
                                                                        }
                                                                    }>
                                                                    {date.start} - <br/>{date.end}
                                                                </div>
                                                                <Typography style={{color:'#da5c48', float:'right', fontSize: '12pt'}}>
                                                                    {booking.space[0].location}
                                                                </Typography>
                                                            </div>                                                                                                          
                                                        </CardContent>
                                                    </Card>
                                                    <HostInfo booking={booking} open={this.state.open} click={this.handleCardClick}></HostInfo>    
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
})
