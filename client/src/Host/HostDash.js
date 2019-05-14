import React from 'react';
import women from "../img/icon1.png";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// icons
import Face from '@material-ui/icons/Face';
import People from '@material-ui/icons/People';
import Clock from '@material-ui/icons/AccessTime';

import MyProfile from './MyProfile';
import Availability from './AddAvailability';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    main: {
        height: window.innerHeight,
        width: window.innerWidth / 2 + 250,
    },
    bigAvatar: {
        position: "relative",
        width: window.innerWidth / 6,
        height: window.innerHeight / 4 ,
    },
    button: {
        margin: theme.spacing.unit,
        width: "200px",
        textAlign: "center",
    },
    secondary: {
        padding: '10px'
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
            view: "profile",
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
                                alignItems="center"
                                >
                                <Paper id="side">
                                    <img id="bigAvatar" src={women} className={classes.bigAvatar} />
                                    <h3>Welcome, Host</h3>
                                    <Typography color="textSecondary" className={classes.secondary}>What would you like to do today</Typography>
                                    <Availability></Availability>
                                    <Button id="button" variant="contained" color="primary" className={classes.button}>
                                    <People></People>
                                        Current Bookings
                                    </Button>
                                    <Button id="button" variant="contained" color="primary" className={classes.button}>
                                    <Clock></Clock>
                                        Past Stays
                                    </Button>
                                    <Button id="button" variant="contained" color="primary" className={classes.button}>
                                        View Analytics
                                    </Button>
                                    <Button id="button" variant="contained" color="primary" className={classes.button} onClick={this.handleView('profile')}>
                                    <Face></Face>
                                        My Profile
                                    </Button>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.main} >
                                <Typography className="pt-5 pl-5" variant="h4" gutterBottom>
                                </Typography>
                                <Grid container spacing={6}>
                                {this.state.view == "profile"  ?    
                                <MyProfile></MyProfile>
                                :  
                                    <>
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
