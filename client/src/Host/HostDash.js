import React from 'react';
import women from "../img/icon1.png";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {HostData} from '../filter';
// icons
import Face from '@material-ui/icons/Face';
import People from '@material-ui/icons/People';
import Clock from '@material-ui/icons/AccessTime';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';



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

class HostDash extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "profile",
            HostInfo: HostData,
            checkA: "",
            checkB: "",
            space: [], 
            checkListings: "No Current Listing", 
            loadingA: false,
            loadingB: false

        
        }

    }
    componentDidMount() {
        this.setState({ 
            loadingA: true,
            loadingB: true
         });

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
        console.log("CURRENT USER: " + currentUser)
        let infoQuery = this.props.firebase.users()

        let spacesQuery = this.props.firebase.listings()
        infoQuery.once('value').then(function(snapshot) {
            let info = snapshot.val();
            console.log(info)
            
            console.log(info[currentUser])
            
            return info
        }).then((obj) =>{
            let userData = obj[currentUser]
            this.setState({
                checkA: obj[currentUser],
                HostInfo:  {
                    ID: currentUser, 
                    advocate: "Emily Liu",
                    information : {
                        firstName: userData['firstName'],
                        lastName: userData['lastName'],
                        gender: userData['gender'],
                        description: userData['story'],
                        haveListing: userData['haveListing'],
                        listings: this.state.checkListings,
                        religion: userData['religion'],
                        languages: userData['languages'],
                        ethnicity: userData['ethnicities'],
                        contact: {
                            phone: userData['phone'],
                            email: userData['email']
                        }
                    }
                   
                },
                loadingA: false,
            })
            if(userData['haveListing']) {
                this.setState({
                    checkListings: userData['listings']
                })
            }
            return userData

        }).then((data) =>{
            console.log(data['haveListing'])
            if(data['haveListing']) {
                spacesQuery.once('value').then((snapshot) =>{
                    let obj = snapshot.val();                       
                        let relevantListings = data['listings'];
                        let storage = [];
                        for (let key in relevantListings) {
                            storage.push(relevantListings[key]['listingID'])
                        }
                        console.log(storage)
                        let spaces = []
                        for (let i = 0; i < storage.length; i ++) {
                            let current = obj[storage[i]];
                            let theSpace = {
                                ID: storage[i],
                                type: current['type'],
                                guestCount: current['guestCount'],
                                address: current['address'],
                                location: current['location'],
                                amenities: current['amenities'],
                                checkInfo: current['information'],
                                houseRules: current['houseRules']
                            }
                            spaces.push(theSpace)
                            console.log(spaces)
                        }
                        this.setState({
                                space: spaces,
                                loadingB: false,
                        }); 
                        console.log(this.state)    
                })   
        
            } else {
                this.setState({
                    space: ["there are no spaces"],
                    loadingB: false,
            }); 
            }
        })
      
    }

    handleView = name => event => {
        this.setState({view: name})
    }

    render() {
        console.log(this.state)
        const { classes } = this.props;
        const { loadingA, loadingB } = this.state
        return (
            <div class="pt-4">
            {loadingA && loadingB && <div>Loading ...</div>}
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
                                <MyProfile profileInfo = {this.state}></MyProfile>
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
}

const Dash = compose(
    withStyles(styles),
    withFirebase,
  )(HostDash);

  export default Dash;