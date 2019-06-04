import React, { Component } from 'react';
import Calendar from './AdvoCalendar'
import person from '../img/icon2.png';
import { PersonalSelect, SpaceSelect, CustomSelect } from '../Select'

import { withStyles } from '@material-ui/core/styles';
import {Paper, Typography, Grid, Button, Card, CardContent, TextField, MenuItem, FormControl,Select,Input,Switch,InputLabel } from '@material-ui/core';

import { Link } from 'react-router-dom';
import moment from 'moment';
import { DateFormatInput } from 'material-ui-next-pickers'

// confirm host view
import HostInfo from './HostInfo';
import { Host, Location } from '../filter';

// firebase
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

const algoliasearch = require('algoliasearch');
const dotenv = require('dotenv');

// // load values from the .env file in this directory into process.env
dotenv.config();

// // configure algolia
const algolia = algoliasearch(
    "UI4XF6GAZS",
    "d0d9a91e7c68fb44a286ce841f14333d"
);

const index = algolia.initIndex(process.env.ALGOLIA_INDEX_NAME);

const styles = theme => ({
    root: {
      alignItems: "stretch"
    },
    bodyText: {
        color: '#202e57'
    },
    side: {
      //height: "85vh",
      width: window.innerWidth / 4 + 100,
      padding: '2rem'

    }, 
    hosts: {
        //height: "791px",
        width: window.innerWidth / 2 + 230
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    card: {
        width: 460,
        margin: "0rem 1rem 1rem 1rem",
        border: "0.5px solid #d3dbee",
        boxShadow: "none",
        fontFamily: 'Source Sans Pro',
        borderRadius: "12px"
    },
    content: {
        display: "flex",
        //margin: '20px',
        alignItems: 'center'
    },

    button: {
        margin: theme.spacing.unit,
        textTransform: "none"
    },
    avatar: {
        width: "100px",
        height: "100px",
        margin: '10px'
    },
    selectEmpty: {
        marginTop: theme.spacing.unit,
    },
    select: {
        width: "150px"
    },
    floatingLabelFocusStyle: {
        color: "#da5c48"
    },
    cardContainer: {
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "center"
    }
});


class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "calendar",
            guests: "",
            location: "",
            start: new Date(),
            allAvail: [],
            search: '',
            user: {}
        }
    }

    componentDidMount() {
        console.log('MOUNTED')
        this.props.firebase.auth.onAuthStateChanged((user)=> {
            if(user) {
                const availabilitiesRef = this.props.firebase.availabilities().orderByChild("state").equalTo("available").limitToLast(5);
                availabilitiesRef.on('child_added', this.addOrUpdateIndexRecord);
                availabilitiesRef.on('child_changed', this.addOrUpdateIndexRecord);
                availabilitiesRef.on('child_removed', this.deleteIndexRecord);
        
                let listingQuery = this.props.firebase.availabilities().orderByChild("state").equalTo("available").limitToLast(5);
                listingQuery.on('value', snapshot =>{
                    let obj = snapshot.val(); 
                    if (obj != null) {
                        let listings = Object.keys(obj).map(key => ({
                            ...obj[key], 
                            id: key,
                          })); 
                          this.setState({
                            allAvail: listings  
                        })
        
                    } 
                }) 
                
            } else {
                console.log("no current user present")
            }
        })
    }

    // For Algolia
    addOrUpdateIndexRecord = (availability) => {
        // Get Firebase object
        const record = availability.val();
        // Specify Algolia's objectID using the Firebase object key
        record.objectID = availability.key;
        // Add or update object
        index
          .saveObject(record)
          .then(() => {
            console.log('Firebase object indexed in Algolia', record.objectID);
          })
          .catch(error => {
            console.error('Error when indexing availabilities into Algolia', error);
            process.exit(1);
          });
      }
      
      deleteIndexRecord = ({key}) => {
        // Get Algolia's objectID from the Firebase object key
        const objectID = key;
        // Remove the object from Algolia
        index
          .deleteObject(objectID)
          .then(() => {
            console.log('Firebase object deleted from Algolia', objectID);
          })
          .catch(error => {
            console.error('Error when deleting availabilities from Algolia', error);
            process.exit(1);
          });
      }

    handleInputChange = name => event => {
        // keep track of the valid dates 02/18 - 03/10
        // if date is in range
            // set state
        // window.alert(...)
        this.setState({ [name]: event.target.value });
      };

    handleHost = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    handleSwitchView = (event) => {
        this.setState({
            view: event.target.checked ? "calendar" : "list"
        })
    }
    
    onChangeDate = (date) => {
        console.log('Date: ', date)
        this.setState({date: date})
    } 

    convertToDate = (start, end) => {
        var start = new Date(start);
        var end = new Date(end);
        return {
            start: moment(start.toLocaleString()).format("MMMM DD"),
            end: moment(end.toLocaleString()).format("MMMM DD")
        };
    }

    onSubmit = (event) => {
        event.preventDefault();
        index.search({
            query: this.state.search,
            attributesToRetrieve: [
              'listingData.location',
              'lastName'
            ],
            // numericFilters: [
            //   [
            //     'start >= ' + startRange,
            //     'end <= ' + endRange
            //   ]
            // ],
            // facetFilters: [
            //   'firstName:Min'
            // ]
            },
            (err, { hits } = {}) => {
              if (err) throw err;

              console.log(hits);
              this.setState({
                  allAvail: hits
              })
        })
    }

    onClick = () => {

        // index.search({
        //     query: this.state.search
        //     // [
        //     //     // {
        //     //     //     indexName: 'listingData.location',
        //     //     //     query: this.state.location
        //     //     // }
        //     //     {
        //     //         indexName: 'listingData.number',
        //     //         query: this.state.guests
        //     //     }
        //     // ],
        //     // attributesToRetrieve: [
        //     //   'listingData.location',
        //     //   'lastName'
        //     // ],
        //     // numericFilters: [
        //     //   [
        //     //     'start >= ' + startRange,
        //     //     'end <= ' + endRange
        //     //   ]
        //     // ],
        //     // facetFilters: [
        //     //   'firstName:Min'
        //     // ]
        //     },
        //     (err, { hits } = {}) => {
        //       if (err) throw err;
        //       hits.slice(2, hits.length)

        //       console.log(hits);
        //       this.setState({
        //         allAvail: hits,
        //     })
        // })
        // .then(res => {
        //     console.log(res)
        // })
    }
    handleSelect = (type, value) => (event) => {
        this.setState({
            [type]: value
        })
    }
    render() {
        const { classes } = this.props;
        let {start, end} = this.state;
        let date = '';
        start = moment(start.toLocaleString()).format("YYYY-MM-DD")
        end = moment(start.toLocaleString()).format("YYYY-MM-DD")
        console.log(this.state)
        let calendar = <Calendar allAvail={this.state.allAvail}></Calendar>
        return (
            <div class="pt-4">
                <Grid 
                    container 
                    className={classes.root} 
                    justify="space-evenly">
                        <Grid key={1} item>
                                <Paper className={classes.side} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}} >
                                <div style={{display: "flex", flexDirection: "column"}}>
                                    <div>
                                <Link to="/advocate/currentbookings">
                                    <p id="back"> &#60; Back</p>
                                </Link>
                                    <h3 class="mb-4">SEARCH BOOKINGS</h3>
                                </div>
                                    <form>
                                    <FormControl>                                      
                                        <div style={{display: "flex", width: "100%"}}>
                                            <TextField
                                                id="date"
                                                label="Start Date"
                                                type="date"
                                                className={classes.textField}
                                                onChange={this.handleInputChange('start')}
                                                InputLabelProps={{
                                                    shrink: true,
                                                    className: classes.floatingLabelFocusStyle,
                                                }}
                                                inputProps={{
                                                    min: start
                                                }}
                                                style= {{
                                                    width: "100%"
                                                }}
                                            />
                                        <TextField
                                            id="date"
                                            label="End Date"
                                            type="date"
                                            className={classes.textField}
                                            onChange={this.handleInputChange('end')}
                                            InputLabelProps={{
                                                shrink: true,
                                                className: classes.floatingLabelFocusStyle,
                                            }}
                                            inputProps={{
                                                min: start
                                            }}
                                            style= {{
                                                width: "100%"
                                            }}
                                        />
                                            
                                        </div>
                                        <div style={{display: "flex", marginBottom: "10px", alignItems: "center"}}>
                                            <FormControl className={classes.select} style={{flexGrow: 1, marginRight: "20px"}}>
                                                <InputLabel  htmlFor="select-multiple-checkbox"># of Guests</InputLabel>
                                                <Select
                                                value={this.state.guests}
                                                onChange={this.handleInputChange('guests')}
                                                input={<Input name="age" id="age-helper" />}
                                                >                                
                                                    {[1,2,3,4, 5, 6].map(option => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                            <FormControl className={classes.select} style={{flexGrow: 1}}>
                                                <CustomSelect data={Location} onSelect={this.handleSelect}/>
                                            </FormControl>
                                        </div>
                                        
                                        <Grid container space={6}>
                                            <Grid item xs={12}>
                                                <div>
                                                    <PersonalSelect onSelect={()=> console.log("")}></PersonalSelect>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <SpaceSelect ></SpaceSelect>
                                        <input type="search" placeholder="Search" class="mt-3 mb-3" onChange={(event)=>this.setState({search: event.target.value})}></input>
                                        <div style={{display: "flex", justifyContent:"space-between"}}>
                                        <Link to="/advocate/currentbookings">
                                            <Button variant="contained" color="primary" className={classes.button} id="buttonGray" style={{fontSize: "16px", padding:"0px 45px 0px 45px", height:"40px"}}>
                                                Cancel
                                            </Button>
                                        </Link>
                                            <Button type="button" onClick={this.onClick} variant="contained" color="primary" className={classes.button} id="button" style={{fontSize: "16px", padding:"0px 22px 0px 22px", height:"40px"}}>
                                                Search Hosts
                                            </Button>
                                        </div>  
                                    </FormControl>
                                    </form>
                                    </div>
                                </Paper>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.hosts} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px", height: "100%"}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px', paddingBottom: "10px"}}>
                                    <h3 class="mt-4">
                                        AVAILABLE BOOKINGS
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
                            {this.state.view == "list" ? 
                                <div className={classes.cardContainer}>
                                    {this.state.allAvail.map(
                                        (booking) => {
                                            date = this.convertToDate(booking.start, booking.end)
                                            
                                            return(
                                                <Card className={classes.card}>
                                                    <CardContent>
                                                        <div className={classes.content}>
                                                            <img className={classes.avatar} src={person}></img>
                                                            <div>
                                                                <h5 style={{color: "#202e57", marginBottom: 0}}>
                                                                    {booking.name}
                                                                </h5>
                                                                <Typography style={{color: "#da5c48"}} className={classes.bodyText}>
                                                                    {booking.listingData.location}
                                                                </Typography>
                                                                <Typography className={classes.bodyText}>
                                                                    {booking.listingData.type}
                                                                </Typography>
                                                            </div>      
                                                        </div>  
                                                        
                                                        {/* click on date to trigger HostInfo dialog */}
                                                        <Button id='button-outline-date' onClick={this.handleHost} variant="outlined">                                                  
                                                            {date.start} - {date.end}
                                                        </Button>      
                                                        <HostInfo booking={booking} open={this.state.open} click={this.handleHost}></HostInfo>    

                                                        {/* space info display */}
                                                        <p style={{marginBottom: 0, marginTop: "10px", fontSize: "14px"}}>Amenities:</p>
                                                        <div style={{display: 'flex', flexWrap: 'wrap', margin: '5px'}}>
                                                            {
                                                                booking.listingData.amenities.map((amenity) => {
                                                                    return(
                                                                        <div 
                                                                            id="tags"
                                                                            style={{
                                                                                border: "0.5px solid",
                                                                                borderRadius: '0.5rem',
                                                                                padding: '4px 12px 4px 12px',
                                                                                margin: '2px'
                                                                            }}
                                                                        >
                                                                            {amenity}
                                                                        </div>
                                                                    )
                                                                })
                                                            }      
                                                        </div>                             
                                                    </CardContent>
                                                </Card>
                                            )
                                        }
                                    )}
                                </div> 
                            : <Grid container> {calendar} </Grid> }
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }
}

const SearchBookings = compose(
    withStyles(styles),
    withFirebase,
  )(Search);

  export default SearchBookings;
