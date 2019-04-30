import React, { Component } from 'react';
import women from "./img/53-.jpg";
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
import FormControlLabel from '@material-ui/core/FormControlLabel';
// For filter expansion
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import Checkbox from '@material-ui/core/Checkbox';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

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
    }
  });

const guests = [1,2,3,4]
const filters = [
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
                ]
const ethinicities = []
const locations = []

export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookings: [
                {
                    ID: 1,
                    name: "Stephanie Burd",
                    address: "1234 24th Sunset Bld",
                    begin: "March 4",
                    end: "25"
                },
                {
                    ID: 2,
                    name: "Min Yang",
                    address: "1234 24th Sunset Bld",
                    begin: "March 4",
                    end: "25"
                },
                {
                    ID: 3,
                    name: "Mary Huibregtse",
                    address: "1234 24th Sunset Bld",
                    begin: "March 4",
                    end: "April 25"
                },
                {
                    ID: 4,
                    name: "Abby Huang",
                    address: "1234 24th Sunset Bld",
                    begin: "March 4",
                    end: "April 25"
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
                                <Paper className={classes.side} >
                                    <h3>FIND HOST</h3>
                                    <form>
                                        <input type="search" placeholder="Search"></input>
                                        <br/>
                                        <TextField
                                            id="date"
                                            label="Start Date"
                                            type="date"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="date"
                                            label="End Date"
                                            type="date"
                                            className={classes.textField}
                                            InputLabelProps={{
                                                shrink: true,
                                            }}
                                        />
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            label="Number of guests"
                                            className={classes.textField}
                                            value={this.state.guest}
                                            onChange={this.handleInputChange('guest')}
                                            SelectProps={{
                                                MenuProps: {
                                                className: classes.menu,
                                                },
                                            }}
                                            margin="normal"
                                            >
                                            {guests.map(option => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        <TextField
                                            id="standard-select-currency"
                                            select
                                            label="Locations"
                                            className={classes.textField}
                                            value={this.state.ethnicity}
                                            onChange={this.handleInputChange('ethnicity')}
                                            SelectProps={{
                                                MenuProps: {
                                                className: classes.menu,
                                                },
                                            }}
                                            margin="normal"
                                            >
                                            {guests.map(option => (
                                                <MenuItem key={option} value={option}>
                                                    {option}
                                                </MenuItem>
                                            ))}
                                        </TextField>
                                        {
                                            filters.map((d) => {
                                                return(
                                                    <ExpansionPanel expanded={this.state.expanded === d.type} onChange={this.handleExpandChange(d.type)}>
                                                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                            <Typography className={classes.heading}>{d.name}</Typography>
                                                        </ExpansionPanelSummary>
                                                        <ExpansionPanelDetails>
                                                            {d.values.map((data) => {
                                                                return(
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
                                                                )
                                                            })}
                                                        </ExpansionPanelDetails>
                                                    </ExpansionPanel>
                                                )
                                                
                                            })
                                        }
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            New Booking
                                        </Button>
                                    </form>

                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.hosts} >
                                <Typography className="pt-5 pl-5" variant="h4" gutterBottom>
                                    CURRENT BOOKINGS
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
                                                                {booking.name}
                                                            </h5>
                                                            <Typography className={classes.pos}>
                                                                {booking.address}
                                                            </Typography>
                                                        </div>                                                  
                                                    </CardContent>
                                                    <Host booking={booking}></Host>
                                                </Card>
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
