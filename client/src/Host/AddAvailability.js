import React from 'react';
import { Button, Dialog, DialogActions, DialogContent, FormControl, Select, OutlinedInput, withStyles, Radio, RadioGroup, FormControlLabel, MenuItem} from '@material-ui/core/';
import moment from 'moment';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';
import Add from '@material-ui/icons/AddCircleOutline';

import DateRangePicker from 'react-daterange-picker'
// import "react-daterange-picker/dist/css/react-calendar.css";
import { listing } from '../filter';

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
            userID: "",
            listingIndex: null,
            listings: [],
            // propertyObj: [],
            // for new calendar, firebase uses begin and end
            range: '',
            type: 'addAvail',
        }
    }

    // componentDidUpdate() {
    //     console.log("INSIDE COMPONENTT DID MOUNT")
    //     if(this.props.profile !== undefined && (this.props.profile.listings === undefined || this.props.profile.listings.length == 0)) {
    //         console.log("there are no current listings")
    //     } else {
    //         this.props.firebase.auth.onAuthStateChanged((user)=> {
    //             if(user) {
    //                 this.state.userID = user.uid 
    //                 console.log(user.uid)

    //                 let listingObjs = this.props.profile.listings
    //                 console.log(listingObjs)
            
            
                    
    //                 let properties = []
    //                 for (let i = 0; i < listingObjs.length; i ++) {
    //                     let obj = {
    //                         name: listingObjs[i].name,
    //                         id: listingObjs[i].id
                            
    //                     }
    //                     console.log("INSIDE FOR LOOP")
    //                     properties.push(listingObjs[i].name)
    //                     this.state.propertyObj.push(obj)
    //                     // properties.push(listingObjs[i].name)
    //                     // nameToId.push()
    //                 }

    //                 var propertiesUnique = properties.filter(function(item, index){
    //                     return properties.indexOf(item) >= index;
    //                 })
    //                 console.log("WHAT PROPERTIES SHOULD BE")
    //                 console.log(propertiesUnique)
            
    //                 // for (let i = 0; i < propertiesUnique.length; i ++) {
    //                 //     console.log("HERE")
    //                 //     console.log(propertiesUnique[i])
    //                 //     this.state.properties.push(propertiesUnique[i])
    //                 // }

    componentDidUpdate() {
        if (this.props.profile != undefined) {
            this.state.listings = this.props.profile.listings
        }

        // console.log("Inside componentDIdUpdate")
        // console.log(this.state)

    }

    deleteAvail = (avail, availIndex) => {
        const { listings, listingIndex } = this.state;
        let listingID = listings[listingIndex].id;
        console.log(availIndex)
        this.props.firebase.deleteAvailInHost(avail);
        this.props.deleteAvailability(listingID, availIndex);
    }

    insertAvail = (rangeStart, rangeEnd) => {
        const { listings, listingIndex } = this.state;
        let hostData = this.props.profile;
        let listingID = listings[listingIndex].id;
        console.log(new Date(rangeStart))
        console.log(new Date(rangeEnd))

        let longStart = moment(new Date(rangeStart)).add(1, 'days') * 1;
        let longEnd = moment(new Date(rangeEnd)).add(1, 'days') * 1;
        
        let obj1 = {
            "state": "available",
            "start": longStart,
            "end": longEnd,
            "hostID": this.props.userID,
            "firstName": this.props.currentUser.firstName,
            "lastName": this.props.currentUser.lastName, 
            "gender": hostData.gender,
            "phone": hostData.phone,
            "email": this.props.currentUser.email,
            "ethnicities": hostData.ethnicities,
            "religion": hostData.religion,
            "story": hostData.story,
            
            "listingData": listings[listingIndex]
        }
        console.log(obj1)
        let obj2 = {
            "state": "available",
            "start": longStart,
            "end": longEnd,
            "listingID": listingID
        }
        let availID = this.props.firebase.availabilities().push(obj1)
        console.log("AVAIL ADDED: " + availID.key)
        obj2["pushKey"] = availID.key
        // this.props.firebase.availability(availID.key).set({"start": "h", "end": check2})
        // adding avail to firebase
        let key = this.props.firebase.addAvailToListing(listingID).push(obj2)
        obj2['id'] = key.key
        console.log("LISTING AVAIL ADDED: " + key.key)
        // for updating app
        this.props.updateAvailability(listingID, obj2)
    }
    // ************************ MIN AND STEPH********************
    // what do we want to do if host enters an invalid / no listing
    onSubmit = event => {
        event.preventDefault();
        this.props.click();
        const {type, range, listings, listingIndex} = this.state
        // for testing delete
        let availability = []
        if (listings !== undefined) {
            availability = listings[listingIndex].availability.sort((a, b) => moment(a.start).isBefore(moment(b.start)) ? -1 : 1)
        }
        var rangeStart = moment(range.start['_i'].toLocaleString()).format("YYYY-MM-DD");
        var rangeEnd = moment(range.end['_i'].toLocaleString()).format("YYYY-MM-DD");
        if (type === 'addAvail') {
            // START CODE FOR ADD AVAILABILITY 
            let notFound = true;
            console.log(availability)
            // console.log(new Date(rangeStart));
            // console.log(new Date(rangeEnd));
            console.log(rangeStart)
            console.log(rangeEnd)
            for (var i = 0; i < availability.length; i++) {
                let currentAvail = availability[i];
                console.log('HELLO')

                var availStart = moment(new Date(availability[i].start).toLocaleString()).format("YYYY-MM-DD");
                var availEnd  = moment(new Date(availability[i].end).toLocaleString()).format("YYYY-MM-DD");
                console.log(availStart);
                console.log(availEnd)
                let nextAvailStart = '';
                let nextAvailEnd = '';
                if (availEnd === rangeStart) {
                    if (i < availability.length - 1) {
                        nextAvailStart = moment(new Date(availability[i + 1].start).toLocaleString()).format("YYYY-MM-DD");
                        nextAvailEnd = moment(new Date(availability[i + 1].end).toLocaleString()).format("YYYY-MM-DD");
                    } 
                    console.log(nextAvailStart)
                    // full range and grab/delete TWO availabilities and add ONE new availability
                    if (nextAvailStart === rangeEnd) {
                        console.log('CASE 1');
                        notFound = false;
                        this.deleteAvail(currentAvail, i);
                        this.deleteAvail(availability[i + 1], i + 1)
                        this.insertAvail(availStart, nextAvailEnd);
                    } else {  // delete current availability and add new one with (availStart and rangeEnd)
                        console.log('CASE 2')
                        notFound = false;
                        this.deleteAvail(currentAvail, i);
                        this.insertAvail(availStart, rangeEnd);
                    }
                } else if (notFound && availStart === rangeEnd) { // delete current availability and add new one with (rangeStart and availEnd)
                    console.log('CASE 3')
                    notFound = false;
                    this.deleteAvail(currentAvail, i);
                    this.insertAvail(rangeStart, availEnd);
                } 
            }

            if (notFound) { // add new availability with (rangeStart and rangeEnd)
                console.log('CASE 4')
                // Insert Avail 
                this.insertAvail(rangeStart, rangeEnd);
            }
        } else { // START CODE FOR BLOCK DATES
            console.log(availability)
            for (var i = 0; i < availability.length; i++) {
                let currentAvail = availability[i];

                var availStart = moment(new Date(availability[i].start).toLocaleString()).format("YYYY-MM-DD");
                var availEnd  = moment(new Date(availability[i].end).toLocaleString()).format("YYYY-MM-DD");

                if (new Date(rangeStart) >= new Date(availStart) && new Date(rangeEnd) <= new Date(availEnd)) {
                    console.log('HELLO');

                    if (rangeStart === availStart) {
                        console.log(rangeEnd);
                        console.log(availEnd);
                        this.deleteAvail(currentAvail, i);

                        if (rangeEnd === availEnd) { // whole availability slot blocked so DELETE 
                            console.log('BLOCK CASE 1');
                        } else { // first half of availability selected, DELETE and INSERT (rangeEnd -> availEnd)
                            console.log('BLOCK CASE 2');
                            this.insertAvail(rangeEnd, availEnd);
                        }
                    } else if (rangeEnd === availEnd) { // second half selected, DELETE and INSERT (availStart -> rangeStart)
                        console.log('BLOCK CASE 3')
                        this.deleteAvail(currentAvail, i);
                        this.insertAvail(availStart, rangeStart);
                    } else { // DELETE current avail and split to two (availStart -> rangeStart, rangeEnd -> availEnd)
                        console.log('BLOCK CASE 4')
                        console.log("DELETED AVAIL: " + availability[i].pushKey)
                        console.log("DELETED LISTINGID: " +listings[listingIndex].id + "    " + availability[i].id )
                        this.deleteAvail(currentAvail, i);
                        // first half
                        this.insertAvail(availStart, rangeStart);
                        // second half
                        this.insertAvail(rangeEnd, availEnd)
                    }
                }
            }
        }
        // this.state.range = ''
      };

    handleInputChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };


    handleSelect = (range, states) => {
        this.setState({
          range: range,
          states: states,
        });
      }

    handleAdd = (range) => () => {
        const { listings, space } = this.props;
    }

    handleBlock = (range) => () => {
        const { listings, space } = this.props; 
    // END CODE FOR BLOCKING
    }

    makeDateRange = (dateRanges, listings, listingIndex) => {
        // const { listings } = this.props;
        if (listings !== undefined && listings.length > 0 && listingIndex !== null) {
            const currentBookings = listings[listingIndex].currentBookings;
            const availability = listings[listingIndex].availability;
            console.log(availability)

            for (var i = 0; i < currentBookings.length; i++) {
                var bookedDates = {
                    state: 'booked',
                    range: moment.range(
                            currentBookings[i].start,
                            currentBookings[i].end
                            )
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
        let { type, range, listings, listingIndex } = this.state;
        let dateRanges = []
        this.makeDateRange(dateRanges, listings, listingIndex)
        let label = ''
        console.log(stateDefinitions)
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
                        value={listingIndex}
                        className={classes.property}
                        onChange={this.handleInputChange('listingIndex')}
                        input={<OutlinedInput/>}
                        required
                    >
                        {listings.map((data, index) => {
                            return(
                                <MenuItem value={index}>{data.name}</MenuItem>
                            )
                        })}
                    </Select>
                </FormControl>    
                <ToggleOption handleSelect={this.selectType} type={type}/> 
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
        const { type, range, listingIndex } = this.state;
        console.log(this.props)
        console.log(this.state)
        let button = ''
        if (range !== undefined && listingIndex !== null) {
            if (type === 'addAvail') {
                button = 
                <Button type="submit" variant="contained"  id="button" >
                    Add
                </Button>
            } else {
                button = 
                <Button type="submit" variant="contained" id="button"  >
                    Block
                </Button>
            }
        } else {
            if (type === 'addAvail') {
                button = 
                <Button type="submit" variant="contained"  disabled>
                Add
                </Button>
            } else {
                button = <Button type="submit" variant="contained" disabled>
                    Block
                </Button>
            }
        }
        
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
                        <DialogActions style={{borderTop: "1px solid #d4dbee", paddingTop: "15px", display: "flex", justifyContent: "center"}} >
                            {button}             
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}
function ToggleOption(props) {
    const [value, setValue] = React.useState(props.type);
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
