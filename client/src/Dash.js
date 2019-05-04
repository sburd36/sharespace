import React, { Component } from 'react';
import women from "./img/53-.jpg";
import Calendar from './Calendar'
import person from './img/person.svg';
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import Input from '@material-ui/core/Input';

// For filter expansion
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Switch from '@material-ui/core/Switch';

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
        margin: "0rem 5rem 1rem 3rem"
    },
    content: {
        display: "flex"
    },
    date: {
        padding: "1.5rem 0 0 4rem"
    },
    button: {
        margin: theme.spacing.unit,
    },
    avatar: {
        width: "100px",
        height: "100px"
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
      },
  });

const guests = [1,2,3,4]
const ethinicities = []
const locations = ["Northgate", "U District", "Westlake", "Ballard"]

export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "list",
            filters: [
                {
                    type: 'languages',
                    name: 'Languages',
                    values: ['English', 'Chinese(Mandarin)', 'Chinese(Cantonese)', 'Spanish', 'French', 'Japanese']
                },
                {
                    type: 'homeType',
                    name: 'Home Types',
                    values: ["Entire Place", "Private Bedroom", 'Hotel Room', 'Shared Room', 'Shelter']
                },
                {
                    type: 'amentities',
                    name: 'Amentities',
                    values: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Computer Access', 'Microwave', 'Self-Check in', 'Parking', 'Bike Storage', 'Private Bathroom', 'Meals', 'Voicemail']
                },
                {
                    type: 'needs',
                    name: 'Needs',
                    values: ['Crib', 'High Chair', 'Pregnant', 'Pets', 'Child-Friendly', 'Near Public Transport', 'Women Only']
                },
                {
                    type: 'ethnicities',
                    name: 'Ethnicities',
                    values: ['African Americans', 'Hispanic', 'Asian', 'White', 'Native/American Indian']
                },
            ],
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
                            amentities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking', 'Bike Storage', 'Meals', 'Voicemail'],
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
                            amentities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking', 'Bike Storage', 'Meals', 'Voicemail'],
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
                            amentities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking', 'Bike Storage', 'Meals', 'Voicemail'],
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
                            amentities: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking', 'Bike Storage', 'Meals', 'Voicemail'],
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

    handleSelectChange = name => event => {
        this.setState({ [name]: event.target.checked});
    }

    handleExpandChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        })
    }
    
    handleSwitchView = (event) => {
        this.setState({
            view: event.target.checked ? "calendar" : "list"
        })
    }
  
    render() {
        const { classes } = this.props;
        var filters = this.state.filters;
        function SimpleSelect() {
            const [values, setValues] = React.useState({
              age: '',
              name: 'hai',
            });
          
            const inputLabel = React.useRef(null);
            const [labelWidth, setLabelWidth] = React.useState(0);
            React.useEffect(() => { 
              setLabelWidth(inputLabel.current.offsetWidth);
            }, []);
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
                                <Paper className={classes.side} >
                                    <h3>FIND HOST</h3>
                                    <form>
                                    <FormControl>
                                        <input type="search" placeholder="Search"></input>
                                        <br/>
                                        <TextField
                                            id="date"
                                            label="Start Date"
                                            type="date"
                                            className={classes.textField}
                                            onChange={this.handleInputChange('begin')}
                                            InputLabelProps={{
                                                shrink: true,
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
                                            }}
                                        />
                                        <FormControl>
                                            {/* <InputLabel htmlFor="select-multiple-checkbox">Number of Guests</InputLabel> */}
                                            <p>Number of Guests</p>
                                            <Select
                                            value={this.state.guests}
                                            onChange={this.handleInputChange('guests')}
                                            input={<Input name="age" id="age-helper" />}
                                            >                                
                                                {guests.map(option => (
                                                    <MenuItem key={option} value={option}>
                                                        {option}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                        <FormControl
                                        >
                                            {/* <InputLabel htmlFor="select-multiple-checkbox">Locations</InputLabel> */}
                                            <p>Location</p>
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
                                        {
                                            filters.map((d) => {
                                                return(
                                                    <ExpansionPanel  expanded={this.state.expanded === d.type} onChange={this.handleExpandChange(d.type)}>
                                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography className={classes.heading}>{d.name}</Typography>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            <Grid container>
                                                            {d.values.map((data) => {
                                                                return(
                                                                    <Grid item>
                                                                    <FormControlLabel
                                                                        control={
                                                                        <Checkbox
                                                                            checked={this.state.data}
                                                                            onChange={this.handleSelectChange(data)}
                                                                            value="checkedA"
                                                                        />
                                                                        }
                                                                        label={data}
                                                                    />
                                                                    </Grid>
                                                                    
                                                                )
                                                            })}
                                                            </Grid>
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                )
                                                
                                            })
                                        }
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            New Booking
                                        </Button>
                                    </FormControl>

                                    </form>
                                    
                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.hosts}>
                            <Switch value="view" onChange={this.handleSwitchView}/>

                            {this.state.view == "list" ? 
                            <div>
                                Show Calendar
                                <Typography className="pt-5 pl-5" variant="h4" gutterBottom>
                                    AVAILABLE BOOKINGS
                                </Typography>
                                <Grid container spacing={6}>
                                    {this.state.bookings.map(
                                        (booking) => {
                                            return(
                                                <Card className={classes.card}>
                                                    <CardContent className={classes.content}>
                                                    <img className={classes.avatar} src={person}></img>
                                                        <div>
                                                            <h5>
                                                                {booking.information.name}
                                                            </h5>
                                                            <Typography className={classes.pos}>
                                                                {booking.space[0].address}
                                                            </Typography>
                                                        </div>                                                  
                                                    </CardContent>
                                                    <Host booking={booking} filters={filters}></Host>
                                                </Card>
                                            )
                                        }
                                    )}
                                </Grid> 
                            </div>
                            : <Calendar></Calendar>}
                            </Paper>
                        </Grid>
                </Grid>
            </div>       
        )
    }
})
