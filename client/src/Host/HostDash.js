import React from 'react';
import women from "../img/53-.jpg";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import AddListing from './AddSpace'
import Availability from './AddAvailability';
import CurrentSpaces from './CurrentSpaces';
import Home from '@material-ui/icons/Home';

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
        background: '#202e57',
        textAlign: "center"
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
            bookings: [
                {
                    ID: 1,
                    name: "Stephanie Burd",
                    address: "1234 24th Sunset Bld",
                    begin: "MONDAY APRIL 4 2019",
                    end: "TUESDAY APRIL 25 2019"
                },
                {
                    ID: 2,
                    name: "Min Yang",
                    address: "1234 24th Sunset Bld",
                    begin: "MONDAY APRIL 4 2019",
                    end: "TUESDAY APRIL 25 2019"
                },
                {
                    ID: 3,
                    name: "Mary Huibregtse",
                    address: "1234 24th Sunset Bld",
                    begin: "MONDAY APRIL 4 2019",
                    end: "TUESDAY APRIL 25 2019"
                },
                {
                    ID: 4,
                    name: "Abby Huang",
                    address: "1234 24th Sunset Bld",
                    begin: "MONDAY APRIL 4 2019",
                    end: "TUESDAY APRIL 25 2019"
                },
                
            ]
        }
    }

    handleView = () => {
        this.setState({listing: !this.state.listing})
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
                                <Paper id="side">
                                    <img src={women} className={classes.bigAvatar} />
                                    <h3>Welcome, Host</h3>
                                    <Typography color="textSecondary">What would you like to do today</Typography>
                                    <Availability></Availability>
                                    <Button variant="contained" color="primary" className={classes.button}>
                                        Past Stays
                                    </Button>
                                    <Button variant="contained" color="primary" className={classes.button}>
                                        View Analytics
                                    </Button>
                                    <Button variant="contained" color="primary" className={classes.button}>
                                        My Profile
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.bookings} >
                                <Typography className="pt-5 pl-5" variant="h4" gutterBottom>
                                </Typography>
                                <Grid container spacing={6}>
                                {this.state.listing  ?    
                                <AddListing view={this.handleView}></AddListing>                             
                                :  
                                    <>
                                    <Button variant="contained" color="primary" className={classes.button} onClick={this.handleView}>
                                        <Home></Home>Add Listing
                                    </Button>
                                    <CurrentSpaces></CurrentSpaces>
                                    </>
                                }
                                </Grid>
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }
})
