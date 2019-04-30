import React, { Component } from 'react';
import women from "./img/53-.jpg";
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    root: {
      flexGrow: 1,
    },
    side: {
      height: window.innerHeight,
      width: window.innerWidth / 4 + 100,
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
    }
  });

const guests = [1,2,3,4]
const ethinicities = []
const locations = []
const languages = ['English', 'Chinese(Mandarin)', 'Chinese(Cantonese)', 'Spanish', 'French', 'Japanese']
const homeType = ["Entire Place", "Private Bedroom", 'Hotel Room', 'Shared Room', 'Shelter']
const amentities = ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Computer Access', 'Microwave', 'Self-Check in', 'Parking', 'Bike Storage', 'Private Bathroom', 'Meals', 'Voicemail']
const needs = ['Crib', 'High Chair', 'Pregnant', 'Pets', 'Child-Friendly', 'Near Public Transport', 'Women Only']
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
                
            ],
        }
    }

    componentDidMount() {
        // const api = "http://www.zillow.com/webservice/GetRegionChildren.htm?zws-id=<ZWSID>&state=wa&city=seattle&childtype=neighborhood"
        const api = "https://pokeapi.co/api/v2/pokemon/ditto/"

        fetch(api)
            .then(
                data => console.log(data.abilities)
            )
            .catch(

            )
    }


    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
        console.log("INPUT CHANGE: " + this .state)
      };

    handleSelectChange = name => event => {
        this.setState({ [name]: event.target.checked});
        console.log("SELECT CHANGE: " + this .state)

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
                                        <ExpansionPanel expanded={this.state.expanded === 'languages'} onChange={this.handleExpandChange('languages')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>Languages</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                {languages.map((data) => {
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
                                        <ExpansionPanel expanded={this.state.expanded === 'homeType'} onChange={this.handleExpandChange('homeType')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>Home Type</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                {homeType.map((data) => {
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
                                        <ExpansionPanel expanded={this.state.expanded === 'amentities'} onChange={this.handleExpandChange('amentities')}>
                                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                <Typography className={classes.heading}>Amentities</Typography>
                                            </ExpansionPanelSummary>
                                            <ExpansionPanelDetails>
                                                {amentities.map((data) => {
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
 
                                        <Button variant="contained" color="primary" className={classes.button}>
                                            New Booking
                                        </Button>
                                    </form>

                                </Paper>
                            </Grid>
                        </Grid>
                        <Grid key={2} item>
                            <Paper className={classes.bookings} >
                                <Typography className="pt-5 pl-5" variant="h4" gutterBottom>
                                    CURRENT BOOKINGS
                                </Typography>
                                <Grid container spacing={6}>
                                    {this.state.bookings.map(
                                        (booking) => {
                                            return(
                                                <Card className={classes.card}>
                                                    <CardContent className={classes.content}>
                                                        <div>
                                                            <Typography style={{maxWidth: 50}} variant="h5" component="h2">
                                                                {booking.name}
                                                            </Typography>
                                                            <Typography color="textSecondary" gutterBottom>
                                                                Guest ID: {booking.ID}
                                                            </Typography>
                                                            <Typography className={classes.pos}>
                                                                {booking.address}
                                                            </Typography>
                                                        </div>                                                     
                                                        <Typography className={classes.date}>
                                                            {booking.begin} - <br/>{booking.end}
                                                        </Typography>
                                                    </CardContent>
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
