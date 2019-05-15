import React, { Component } from 'react';
import Calendar from '../Calendar'
import person from '../img/icon2.png';
import { PersonalSelect, SpaceSelect} from '../Select'

import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Input from '@material-ui/core/Input';
import Switch from '@material-ui/core/Switch';
import InputLabel from '@material-ui/core/InputLabel';


// confirm host view
import Host from './HostInfo';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    side: {
      height: window.outerHeight,
      width: window.innerWidth / 4 + 100,
      padding: '2rem'
    }, 
    hosts: {
        height: window.outerHeight,
        width: window.innerWidth / 2 + 230,
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    card: {
        maxWidth: 360,
        margin: "0rem 5rem 1rem 3rem",
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
    date: {
        padding: "1.5rem 0 0 4rem"
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
    }
  });

const locations = ["Northgate", "U District", "Westlake", "Ballard"]

export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "list",
            guests: "",
            locations: "",
            bookings: [
                {
                    ID: 1,
                    information: {
                        name: "Marry Potter",
                        description: "Marry is a working professional who likes cat and yoga.",
                        languages: ["English"],
                        religion: ["none"],
                        ethnicity: ["White"],
                        contact: {
                            phone: "(306)142-2093",
                            email: "mp@gmail.com"
                        },
                    },
                    space:  [
                        {
                            ID: 1,
                            address: "1234 24th Sunset Bld",
                            amenities: ['Kitchen', 'Laundry', 'Refrigerator', 'Bike Storage', 'Meals', 'Voicemail'],
                            checkinInfo: {
                                time: "10am - 9pm",
                                description: "Please text my number when arrive. Have a dog named Benly, he is very friendly but please do not pet him."
                            },
                            houseRules: ["No Smoking", "No Alcohol"],
                            begin: "March 4",
                            end: "March 25",
                        }
                    ]
                },
                {
                    ID: 2,
                    information: {
                        name: "Marry Potter",
                        description: "Marry is a working professional who likes cat and yoga.",
                        languages: ["English"],
                        religion: ["none"],
                        ethnicity: ["White"],
                        contact: {
                            phone: "(306)142-2093",
                            email: "mp@gmail.com"
                        },
                    },
                    space:  [
                        {
                            ID: 2,
                            address: "1234 24th Sunset Bld",
                            amenities: ['Kitchen','Wifi', 'Parking', 'Bike Storage', 'Meals', 'Voicemail'],
                            checkinInfo: {
                                time: "10am - 9pm",
                                description: "*Have a dog named Benly, he is very friendly but please do not pet him."
                            },
                            checkinInfo: "",
                            houseRules: ["No Smoking", "No Alcohol"],
                            begin: "March 4",
                            end: "March 25",
                        }
                    ]
                },
                {
                    ID: 3,
                    information: {
                        name: "Marry Potter",
                        description: "Marry is a working professional who likes cat and yoga.",
                        languages: ["English"],
                        religion: ["none"],
                        ethnicity: ["White"],
                        contact: {
                            phone: "(306)142-2093",
                            email: "mp@gmail.com"
                        },
                    },
                    space:  [
                        {
                            ID: 3,
                            address: "1234 24th Sunset Bld",
                            amenities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking', 'Bike Storage', 'Meals'],
                            checkinInfo: {
                                time: "10am - 9pm",
                                description: "Have a dog named Benly, he is very friendly but please do not pet him."
                            },
                            checkinInfo: "",
                            houseRules: ["No Smoking", "No Alcohol"],
                            begin: "March 4",
                            end: "March 25",
                        }
                    ]
                },
                {
                    ID: 4,
                    information: {
                        name: "Marry Potter",
                        description: "Marry is a working professional who likes cat and yoga.",
                        languages: ["English"],
                        religion: ["none"],
                        ethnicity: ["White"],
                        contact: {
                            phone: "(306)142-2093",
                            email: "mp@gmail.com"
                        },
                    },
                    space:  [
                        {
                            ID: 4,
                            address: "1234 24th Sunset Bld",
                            amenities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking'],
                            checkinInfo: {
                                time: "10am - 9pm",
                                description: "Have a dog named Benly, he is very friendly but please do not pet him."
                            },
                            checkinInfo: "",
                            houseRules: ["No Smoking", "No Alcohol"],
                            begin: "March 4",
                            end: "March 25",
                        }
                    ]
                },
            ],
        }
    }

    componentDidMount() {
        // const api = "http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=<ZWSID>&state=wa&city=seattle&childtype=neighborhood"
        // const api = "https://pokeapi.co/api/v2/pokemon/ditto/"

        // fetch(api)
        //     .then(
        //         data => console.log(data.abilities)
        //     )
        //     .catch(

        //     )
    }


    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
      };

    handleSwitchView = (event) => {
        this.setState({
            view: event.target.checked ? "calendar" : "list"
        })
    }
  
    render() {
        const { classes } = this.props;
        // function SimpleSelect() {
        //     const [values, setValues] = React.useState({
        //       age: '',
        //       name: 'hai',
        //     });
          
        //     const inputLabel = React.useRef(null);
        //     const [labelWidth, setLabelWidth] = React.useState(0);
        //     React.useEffect(() => { 
        //       setLabelWidth(inputLabel.current.offsetWidth);
        //     }, []);
        // }
        return (
            <div class="pt-4">
                <Grid 
                    container 
                    className={classes.root} 
                    justify="space-evenly" >
                        <Grid key={1} item>
                                <Paper className={classes.side} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}} >
                                    <h3>FIND HOST</h3>
                                    <form>
                                    <FormControl>
                                        
                                        <br/>
                                        <div>
                                        <TextField
                                            id="date"
                                            label="Start Date"
                                            type="date"
                                            className={classes.textField}
                                            onChange={this.handleInputChange('begin')}
                                            InputLabelProps={{
                                                shrink: true,
                                                className: classes.floatingLabelFocusStyle
                                            }}
                                        />
                                        <TextField
                                            id="date"
                                            label="End Date"
                                            type="date"
                                            className={classes.textField}
                                            onChange={this.handleInputChange('begin')}
                                            InputLabelProps={{
                                                shrink: true,
                                                className: classes.floatingLabelFocusStyle
                                            }}
                                        />
                                        </div>
                                        <div class='d-flex justify-content-around'>
                                            <FormControl className={classes.select}>
                                                <InputLabel htmlFor="select-multiple-checkbox">Number of Guests</InputLabel>
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
                                            <FormControl className={classes.select}>
                                                <InputLabel htmlFor="select-multiple-checkbox">Locations</InputLabel>
                                                <Select
                                                value={this.state.locations}
                                                onChange={this.handleInputChange('locations')}>                                        >
                                                    {locations.map(option => (
                                                        <MenuItem key={option} value={option}>
                                                            {option}
                                                        </MenuItem>
                                                    ))}
                                                </Select>
                                            </FormControl>
                                        </div>
                                        
                                        <Grid containter space={6}>
                                            <Grid item xs={12}>
                                                <div class="p-4">
                                                    <PersonalSelect></PersonalSelect>
                                                </div>
                                            </Grid>
                                        </Grid>
                                        <SpaceSelect ></SpaceSelect>
                                        <input type="search" placeholder="Search" class="mt-3 mb-3"></input>
                                        <div style={{display: "flex", justifyContent:"space-between"}}>
                                            <Button variant="contained" color="primary" className={classes.button} id="buttonGray" style={{fontSize: "16px", padding:"0px 45px 0px 45px", height:"40px"}}>
                                                Cancel
                                            </Button>
                                            <Button variant="contained" color="primary" className={classes.button} id="button" style={{fontSize: "16px", padding:"0px 22px 0px 22px", height:"40px"}}>
                                                Search Hosts
                                            </Button>
                                        </div>   

                                    </FormControl>

                                    </form>
                                    
                                </Paper>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.hosts} style={{boxShadow: "none", border:"0.5px solid #d3dbee", backgroundColor: "#fdfdfe", borderRadius: "12px"}}>
                                <div style={{display: 'flex', justifyContent: 'space-between', padding: '30px'}}>
                                    <h3 className="">
                                        AVAILABLE BOOKINGS
                                    </h3>
                                    <div>
                                        Show Calendar
                                        <Switch value="view" onChange={this.handleSwitchView}/>
                                    </div>
                                </div>
                            {this.state.view == "list" ? 
                                <Grid container spacing={6}>
                                    {this.state.bookings.map(
                                        (booking) => {
                                            return(
                                                <Card className={classes.card}>
                                                    <CardContent>
                                                        <div className={classes.content}>
                                                            <img className={classes.avatar} src={person}></img>
                                                            <div>
                                                                <h5 style={{color: "#202e57"}}>
                                                                    {booking.information.name}
                                                                </h5>
                                                                <Typography className={classes.pos}>
                                                                    {booking.space[0].address}
                                                                </Typography>
                                                            </div>      
                                                        </div>          
                                                        <Host booking={booking}></Host>  
                                                        <div style={{display: 'flex', flexWrap: 'wrap', margin: '5px', justifyContent: 'center'}}>
                                                            {
                                                                booking.space[0].amenities.map((amenity) => {
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
                                </Grid> 
                            : <Calendar></Calendar>}
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }
})
