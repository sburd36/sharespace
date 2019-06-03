import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, FormControl, Select, OutlinedInput, withStyles, Radio, RadioGroup, FormControlLabel, MenuItem} from '@material-ui/core/';
import moment from 'moment';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';
import Add from '@material-ui/icons/AddCircleOutline';

import DateRangePicker from 'react-daterange-picker'
//import "react-daterange-picker/dist/css/react-calendar.css";

const styles = theme => ({
    property: {
        width: '200px',
        height: '40px'
    },
})
let stateDefinitions = {
    booked: {
      selectable: false,
      color: '#78818b',
      label: 'Booked',
    },
  };

stateDefinitions.available = {
    color: null,
    label: 'Available Dates',
}

stateDefinitions.unavailable = {
    color: '#fe8b6b',
    label: 'Marked Unavailable',
}

class Availability extends React.Component {
    constructor(props) {
        super(props)        
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0');
        var yyyy = today.getFullYear();
        var date = yyyy + '-' + mm + '-' + dd
        console.log(date);
        this.state = {
            haveListings: false,
            property: "",
            userID: "",
            begin: date,
            end: date,
            properties: ['home 1', 'home 2'],
            propertyObj: [],
            // for new calendar, firebase uses begin and end
            start: new Date(),
            end: new Date(),
            type: 'addAvail',
        }
    }

    componentDidUpdate() {
        console.log("INSIDE COMPONENTT DID MOUNT")
        if(this.props.profile !== undefined && (this.props.profile.listings === undefined || this.props.profile.listings.length == 0)) {
            console.log("there are no current listings")
        } else {
            this.props.firebase.auth.onAuthStateChanged((user)=> {
                if(user) {
                    this.state.userID = user.uid 
                    console.log(user.uid)

                    let listingObjs = this.props.profile.listings
                    console.log(listingObjs)
            
            
                    
                    let properties = []
                    for (let i = 0; i < listingObjs.length; i ++) {
                        let obj = {
                            name: listingObjs[i].name,
                            id: listingObjs[i].id
                            
                        }
                        console.log("INSIDE FOR LOOP")
                        properties.push(listingObjs[i].name)
                        this.state.propertyObj.push(obj)
                        // properties.push(listingObjs[i].name)
                        // nameToId.push()
                    }

                    var propertiesUnique = properties.filter(function(item, index){
                        return properties.indexOf(item) >= index;
                    })
                    console.log("WHAT PROPERTIES SHOULD BE")
                    console.log(propertiesUnique)
            
                    // for (let i = 0; i < propertiesUnique.length; i ++) {
                    //     console.log("HERE")
                    //     console.log(propertiesUnique[i])
                    //     this.state.properties.push(propertiesUnique[i])
                    // }

                    this.state.properties = propertiesUnique
            // this.setState({
            //    properties: propertiesUnique 
            // })
                    console.log(this.state)
                } else {
                    console.log('no valid ID')
                }
            });           
        }
    }

    onSubmit = event => {
        event.preventDefault();
        this.props.click();
        console.log(this.state)
        if (this.props.profile.listings != undefined) {
  
            if(this.state.end != this.props.date) {
                let id = ""
                for ( let i = 0; i < this.state.propertyObj.length; i++) {
                    let obj = this.state.propertyObj[i] 
                    if (obj.name  == this.state.property) {
                        id = obj.id
                    }
                }
                let key = this.props.firebase.addAvailToListing(id).push({
                    name: this.state.property,
                    begin: this.state.begin,
                    end: this.state.end
                })

                let obj = {
                    id: key,
                    name: this.state.property,
                    begin: this.state.begin,
                    end: this.state.end
                }
                this.props.updateAvailability(id, obj)
            }
        }
      };

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    handleSelect = (range, states) => {
        this.setState({
          range: range,
          states: states,
        });
      }
      handleAdd = (range) => () => {
        const { listings, space } = this.props;

        let availability = []
        if (listings !== undefined) {
            availability = listings[space].availability.sort((a, b) => moment(a.start).isBefore(moment(b.start)) ? -1 : 1)
        }
        var rangeStart = moment(range.start['_i'].toLocaleString()).format("YYYY-MM-DD");
        var rangeEnd = moment(range.end['_i'].toLocaleString()).format("YYYY-MM-DD");

        // sort availability
        // availability.sort((a, b) => moment(a.start).isBefore(moment(b.start)) ? -1 : 1)
        let notFound = true;
        for (var i = 0; i < availability.length; i++) {
            // console.log(availability[i].end)
            var availStart = moment(availability[i].start.toLocaleString()).format("YYYY-MM-DD");
            var availEnd  = moment(availability[i].end.toLocaleString()).format("YYYY-MM-DD");
            let nextAvailStart = '';

            if (availEnd === rangeStart) {
                if (i < availability.length - 1) {
                    nextAvailStart = moment(availability[i + 1].start.toLocaleString()).format("YYYY-MM-DD");
                } 
                // full range and grab/delete TWO availabilities and add ONE new availability
                if (nextAvailStart === rangeEnd) {
                    console.log('CASE 1');
                    notFound = false;
                } else {  // delete current availability and add new one with (availStart and rangeEnd)
                    console.log('CASE 2')
                    notFound = false;
                }
            } else if (notFound && availStart === rangeEnd) { // delete current availability and add new one with (rangeStart and availEnd)
                console.log('CASE 3')
                notFound = false;
            } 
        }
        if (notFound) { // add new availability with (rangeStart and rangeEnd)
            console.log('CASE 4')
        }
      }

      handleBlock = (range) => () => {
        const { listings, space } = this.props;

        let availability = [];
        if (listings !== undefined) {
            availability = listings[space].availability.sort((a, b) => moment(a.start).isBefore(moment(b.start)) ? -1 : 1)
        }
        var rangeStart = moment(range.start['_i'].toLocaleString()).format("YYYY-MM-DD");
        var rangeEnd = moment(range.end['_i'].toLocaleString()).format("YYYY-MM-DD");

        for (var i = 0; i < availability.length; i++) {
            var availStart = moment(availability[i].start.toLocaleString()).format("YYYY-MM-DD");
            var availEnd  = moment(availability[i].end.toLocaleString()).format("YYYY-MM-DD");

            if (new Date(rangeStart) >= new Date(availStart) && new Date(rangeEnd) <= new Date(availEnd)) {
                console.log('HELLO')
                if (rangeStart === availStart) {
                    if (rangeEnd === availEnd) { // whole availability slot blocked so DELETE 
                        console.log('CASE 1');
                    } else { // first half of availability selected, DELETE and INSERT (rangeEnd -> availEnd)
                        console.log('CASE 2');
                    }
                } else if (rangeEnd === availEnd) { // second half selected, DELETE and INSERT (availStart -> rangeStart)
                    console.log('CASE 3')
                } else {
                    console.log('CASE 4')
                }
            }
        }
        // END CODE FOR BLOCKING
      }
    makeDateRange = (dateRanges) => {
        const { listings, space } = this.props;

        if (listings !== undefined) {
            const currentBookings = listings[space].currentBookings;
            const availability = listings[space].availability;
    
            for (var i = 0; i < currentBookings.length; i++) {
                var bookedDates = {
                    state: 'booked',
                    range: moment.range(
                            currentBookings[i].start,
                            currentBookings[i].end
                            )
                            // range : {
                            //     start:
                            //     end:
                            // }
                }
                dateRanges[i] = bookedDates;
            }
            var length = dateRanges.length;
            for (var i = 0; i < availability.length; i++) {
                var availableDates = {
                    state: 'available',
                    range: moment.range(
                        availability[i].start,
                        availability[i].end
                    )
                }
                 dateRanges[length + i] = availableDates;
            }
        }
        dateRanges.sort((a, b) => moment(a.range.start).isBefore(moment(b.range.start)) ? -1 : 1)
    }

    selectType = (event) => {
        this.setState({
            type: event.target.value
        })
    }
    timeSlot = () => {
        const { classes } = this.props;
        let { start, end, type, range } = this.state;
        let dateRanges = []
        this.makeDateRange(dateRanges)
        let label = ''

        if (type === 'addAvail') {
            stateDefinitions.available.selectable = false
            stateDefinitions.unavailable.selectable = true
            label = 'Mark Available'
        } else {
            stateDefinitions.unavailable.selectable = false
            stateDefinitions.available.selectable = true
            label = 'Mark Unavailable'
        }
        return (
            <>
                <FormControl>
                    <label style={{fontWeight: 300, fontSize: "12pt"}}>Choose Listing</label>
                    <Select
                        id='property'
                        value={this.state.property}
                        className={classes.property}
                        onChange={this.handleInputChange('property')}
                        input={<OutlinedInput/>}
                        required
                    >
                        {this.state.properties.map((data) => {
                            return(
                                <MenuItem value={data.name}>{data.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>     
                <ToggleOption handleSelect={this.selectType}/> 
                {/* <div style={{display: 'flex', padding: '1rem'}}> */}
                    <DateRangePicker 
                        onSelect={this.handleSelect}
                        value={range}
                        showLegend={true}
                        stateDefinitions={stateDefinitions}
                        defaultState="unavailable"
                        selectionType='range'
                        dateStates={dateRanges}
                        singleDateRange={true}
                        minimumDate={new Date()}
                        selectedLabel={label}
                    />
                {/* </div> */}
            </>
        )
    }

    render() {
        const { classes } = this.props;
        const { type, range } = this.state;

        return (
            <div class="d-flex justify-content-around">

                <Dialog
                    open={this.props.open}
                    onClose={this.props.click}
                    maxWidth='xl'
                >
                    <form onSubmit={this.onSubmit}>
                        <DialogContent className={classes.content}>
                            <h3>Add Availability</h3>
                                {this.timeSlot()}
                                {/* <hr></hr> */}
                                {/* <button style={{border: 'none', color: "#da5c48", display: "flex", align: "baseline"}}><Add></Add>Add another time slot</button> */}
                            
                            </DialogContent>
                        <DialogActions  style={{borderTop: "1px solid #d4dbee", paddingTop: "15px", display: "flex", justifyContent: "center"}} >
                            {
                                type === 'addAvail' ?
                                <Button type="submit" variant="contained"  id="button" onCLick={this.handleAdd(range)}>
                                    Add
                                </Button> :
                                <Button type="submit" variant="contained" id="button" onClick={this.handleBlock(range)}>
                                    Block
                                </Button>
                            }
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}
function ToggleOption(props) {
    const [value, setValue] = React.useState('addAvail');
    const style = {
        group: {
            flexDirection: 'row',
            justifyContent: 'space-around'
        }
    }
    function handleSelect(event) {
        props.handleSelect(event)
        setValue(event.target.value)
    }
    return (
            <RadioGroup
                    aria-label="Gender"
                    name="gender1"
                    value={value}
                    onChange={(event)=> handleSelect(event)}
                    style={style.group}
                >
                <FormControlLabel value="addAvail" control={<Radio />} label="Add Availability" 
                />
                <FormControlLabel value="addUnavail" control={<Radio />} label="Mark Unavailable" />
            </RadioGroup>
    )
}
const AddAvailabiliity = compose(
    withStyles(styles),
    withFirebase,
  )(Availability);
  
  
  export default AddAvailabiliity;
