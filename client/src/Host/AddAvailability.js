import React from 'react';
import { TextField, Button, Dialog, DialogActions, DialogContent, FormControl, Select, OutlinedInput, MenuItem, InputLabel, withStyles} from '@material-ui/core/';
import moment from 'moment';
import { withFirebase } from '../Firebase';

import { compose } from 'recompose';
import Add from '@material-ui/icons/AddCircleOutline';

import DateRangePicker from 'react-daterange-picker'
import "react-daterange-picker/dist/css/react-calendar.css";

const styles = theme => ({
    property: {
        width: '200px',
        height: '40px'
    },
})
const dateRanges = [
    {
      state: 'enquire',
      range: moment.range(
        moment().add(2, 'weeks').subtract(5, 'days'),
        moment().add(2, 'weeks').add(6, 'days')
      ),
    },
    {
      state: 'unavailable',
      range: moment.range(
        moment().add(3, 'weeks'),
        moment().add(3, 'weeks').add(5, 'days')
      ),
    },
    {
        state: 'unavailable',
        range: moment.range(
          moment().add(5, 'weeks'),
          moment().add(5, 'weeks').add(5, 'days')
        ),
      },
  ];

  const stateDefinitions = {
    available: {
      color: null,
      label: 'Available',
    },
    enquire: {
      color: '#ffd200',
      label: 'Enquire',
    },
    unavailable: {
      selectable: false,
      color: '#78818b',
      label: 'Unavailable',
    },
  };
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
            property: "",
            userID: "",
            properties: [],
            // propertyObj: [],
            // for new calendar, firebase uses begin and end
            start: new Date(),
            end: new Date()
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
            this.state.properties = this.props.profile.listings

        }

        console.log("Inside componentDIdUpdate")
        console.log(this.state)

    }

    // ************************ MIN AND STEPH********************
    // what do we want to do if host enters an invalid / no listing
    onSubmit = event => {
        event.preventDefault();
        this.props.click();
        console.log(this.state)
        const {start, end, properties, property} = this.state
        if (properties.length != 0) {
            if(end != new Date()) {
                let id = ""
                for ( let i = 0; i < properties.length; i++) {
                    let l = properties[i] 
                    if (l.name  == property) {
                        id = l[key]
                        console.log(l[key])
                    }
                }
                let time = new Date()
                let key = this.props.firebase.addAvailToListing(id).push({
                    start: start,
                    end: end,
                    availabilityAdded: time
                })
                console.log("LISTING KEY AVAIL WAS PUSHED TOO: " + id)
                console.log("AVAILABILITY PUSH KEY: " + key.key)

                let obj = {
                    id: key.key,
                    name: property,
                    start: start,
                    end: end
                }
                this.props.updateAvailability(id, obj)
            } else { 
                console.log("listing was not saved, please enter a time")
            }
        } else {
            console.log("no listing was selected")
        }
      };

    handleInputChange = name => event => {
        console.log(event)
        this.setState({ [name]: event.target.value });
        console.log(this.state)
    };

    handleSelect = (range, states) => {
        // range is a moment-range object
        this.setState({
          value: range,
          states: states,
        });
        console.log(this.state)
      }
    timeSlot = () => {
        const { classes } = this.props;
        let { start, end } = this.state;
        // start = moment(start.toLocaleString()).format("YYYY-MM-DD")
        // end = moment(start.toLocaleString()).format("YYYY-MM-DD")
        // const { from, to } = this.state;
        // const modifiers = { start: from, end: to };

        return (
            <>
                <FormControl>
                    <label>Choose Listing</label>
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
                <div style={{display: 'flex', padding: '1rem'}}>
                        {/* <TextField
                        id="date"
                        label="Start Date"
                        type="date"
                        value={start}
                        className={classes.textField}
                        onChange={this.handleInputChange('start')}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.floatingLabelFocusStyle,
                        }}
                        inputProps={{
                            min: moment().format("YYYY-MM-DD"),
                        }}
                    />
                    <TextField
                        id="date"
                        label="End Date"
                        type="date"
                        value={end}
                        className={classes.textField}
                        onChange={this.handleInputChange('end')}
                        InputLabelProps={{
                            shrink: true,
                            className: classes.floatingLabelFocusStyle,
                        }}
                        inputProps={{
                            min: start
                        }}
                    /> */}
                            <DateRangePicker 
                                onSelect={this.handleSelect}
                                showLegend={true}
                                singleDateRange={true}
                                value={this.state.value}
                                stateDefinitions={stateDefinitions}
                                defaultState="available"
                                selectionType='range'
                                dateStates={dateRanges}
                            />
                </div>
            </>
        )
    }
    render() {
        const { classes } = this.props;
        console.log(this.props)
        console.log(this.state)


        return (
            <div class="d-flex justify-content-around">

                <Dialog
                    open={this.props.open}
                    onClose={this.props.click}
                    scroll='paper'
                    maxWidth='xl'
                    aria-labelledby="scroll-dialog-title"
                >
                    <form onSubmit={this.onSubmit}>
                        <DialogContent className={classes.content}>
                            <h3>Add Availability</h3>
                                {this.timeSlot()}
                                <hr></hr>
                                {/* <button style={{border: 'none', color: "#da5c48", display: "flex", align: "baseline"}}><Add></Add>Add another time slot</button> */}
                            </DialogContent>
                        <DialogActions >
                            <Button type="submit" variant="contained"  color="primary">
                                Add
                            </Button>
                        </DialogActions>
                    </form>
                </Dialog>
            </div>
        )
    }
}

const AddAvailabiliity = compose(
    withStyles(styles),
    withFirebase,
  )(Availability);
  
  
  export default AddAvailabiliity;
