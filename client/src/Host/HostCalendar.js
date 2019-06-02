import React, {Children} from 'react'

// import './main.scss' // webpack must be configured to do this
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../style/App.css";
import Add from '@material-ui/icons/AddCircleOutline';
import AddAvailabiliity from './AddAvailability';

import DateRangePicker from 'react-daterange-picker'
import "react-daterange-picker/dist/css/react-calendar.css";

import 'react-dates/initialize';

import { Button, Select, MenuItem, Input, FormControl, InputLabel, Chip, Dialog, DialogContent, DialogActions} from '@material-ui/core/';

import { listings } from '../filter';
import { Grid } from '@material-ui/core';

moment.locale('en-GB');

const localizer = BigCalendar.momentLocalizer(moment)

export default class Calendar extends React.Component {
    constructor(props) {
      super(props);
    //   let spaces = {};
    //   let space = '';
    //   listings.map((listing) => {
    //       spaces[`${listing.name}`] = {};
    //       space = spaces[`${listing.name}`];
    //       space['bookings'] = []
    //       space['availability'] = []
    //       listing.currentBookings.map((data) => {
    //         space['bookings'].push({
    //             id: space['bookings'].length,
    //             start: new Date(data.start),
    //             end: new Date(data.end),
    //             title: listing.name,
    //             info: data.information
    //           })
    //       })
    //       listing.availability.map((data) => {
    //           space['availability'].push({
    //             start: new Date(data.start),
    //             end: new Date(data.end),
    //           })
    //       })
    //     })
      this.state = {
            view: [],
            space: 0,
            info: '',
            selectedLabel: 'Block'
      }
      console.log(this.state)
    }


    // /* When you choose a particular slot on the calendar */
    // onSlotChange = (slotInfo) => {
    //   var start = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DDm:ss");
    //   var end = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DDm:ss");
    // //   var newAvailability = {
    // //       id: .length,
    // //       start: start,
    // //       end: end,
    // //       title: slotInfo.host.information.name
    // //   }
    //   console.log(start); //shows the start time chosen
    //   console.log(end); //shows the end time chosen
    //   return{
    //       style: {
    //           backgroundColor: '#9138fd'
    //       }
    //   }
    // }

    /* When you click on an already booked slot */
    onEventClick = (event) => {
        this.setState({
          guest: !this.state.guest,
          info: event.information
        })
    }

    handleClickAdd = () => (event) => {
        this.setState({
            add: !this.state.add,
        })
        console.log(event)
    }

    handleView = (data) => (event) => {

    }

    handleChange = (name) => (event) => {
        this.setState({
            [name]: event.target.value
        })
        console.log(this.state)
    }

    // eventStyleGetter = (event, start, end, isSelected) => {
    //     console.log(event);
    //     var backgroundColor = '#da5c48';
    //     var style = {
    //         backgroundColor: backgroundColor,
    //         borderRadius: '0px',
    //         opacity: 0.8,
    //         color: 'black',
    //         border: '0px',
    //         display: 'block'
    //     };
    //     return {
    //         style: style
    //     };
    // }
    availability = (value) => {
        var availability = listings[0].availability;
        var length = availability.length;

        for (var i = 0; i < length; i++) {
            var start = new Date(availability[i].start);
            var end = new Date(availability[i].end);
            if (value < end && value > start) {
                return true;
            }
        }
        return false;
    }
    // onSelect = dates => this.setState({dates})
    handleSelect = (range, states) => {
        // range is a moment-range object

        var availability = listings[this.state.space].availability

        var rangeStart = moment(range.start['_i'].toLocaleString()).format("YYYY-MM-DD");
        var rangeEnd = moment(range.end['_i'].toLocaleString()).format("YYYY-MM-DD");

        // sort availability
        availability.sort((a, b) => moment(a.start).isBefore(moment(b.start)) ? -1 : 1)
        let notFound = true;
                // START CODE FOR ADD AVAIABILITY (HERE FOR TESTING PURPOSE!!)
                // for (var i = 0; i < availability.length; i++) {
                //     // console.log(availability[i].end)
                //     var availStart = moment(availability[i].start.toLocaleString()).format("YYYY-MM-DD");
                //     var availEnd  = moment(availability[i].end.toLocaleString()).format("YYYY-MM-DD");
                //     let nextAvailStart = '';

                //     if (availEnd === rangeStart) {
                //         if (i < availability.length - 1) {
                //             nextAvailStart = moment(availability[i + 1].start.toLocaleString()).format("YYYYMMDD");
                //         } 
                //         // full range and grab/delete TWO availabilities and add ONE new availability
                //         if (nextAvailStart === rangeEnd) {
                //             console.log('CASE 1');
                //             notFound = false;
                //         } else {  // delete current availability and add new one with (availStart and rangeEnd)
                //             console.log('CASE 2')
                //             notFound = false;
                //         }
                //     } else if (notFound && availStart === rangeEnd) { // delete current availability and add new one with (rangeStart and availEnd)
                //         console.log('CASE 3')
                //         notFound = false;
                //     } 
                // }
                // if (notFound) { // add new availability with (rangeStart and rangeEnd)
                //     console.log('LAST CASE')
                // }
        // END OF CODE FOR ADD AVAILABILITY
        for (var i = 0; i < availability.length; i++) {
            var availStart = moment(availability[i].start.toLocaleString()).format("YYYY-MM-DD");
            var availEnd  = moment(availability[i].end.toLocaleString()).format("YYYY-MM-DD");

            if (new Date(rangeStart) >= new Date(availStart) && new Date(rangeEnd) <= new Date(availEnd)) {
                console.log('HELLO')
                if (rangeStart === availStart) {
                    if (rangeEnd === availEnd) { // whole availability slot blocked so DELETE 
                        console.log('CASE 1');
                        notFound = false;
                    } else { // first half of availability selected, DELETE and INSERT (rangeEnd -> availEnd)
                        console.log('CASE 2');
                        notFound = false;
                    }
                } else if (rangeEnd === availEnd) { // second half selected, DELETE and INSERT (availStart -> rangeStart)
                    console.log('CASE 3')
                } else {
                    console.log('CASE 4')
                }
            }
        }
        // START CODE FOR BLOCKING 

        // END CODE FOR BLOCKING

        // console.log(availability)
        this.setState({
          value: range,
          states: states,
        });
        // console.log(this.state)
      }
    booked = (date) => {
        var bookings = listings[0].currentBookings;
        for (var i = 0; i < bookings.length; i++) {
            var start = new Date(bookings[i].start);
            var end = new Date(bookings[i].end);
            if (date < end && date > start) {
                return true;
            }
        }
        return false;
    }
  render() {
      var style = {
          head: {
            display: 'flex',
            justifyContent: 'space-between',
            padding: '20px'
          },
          view: {
            width: '10rem'
          },
          controls: {
              //width: '50%',
              display: 'flex',
              justifyContent: 'around',
              alignItems: 'center',
              marginRight: "20px"
          }
      } 

      const { guest, info, space, add, selectedLabel } = this.state;
      const currentBookings = listings[space].currentBookings;
      const availability = listings[space].availability;
      const dateCellWrapper = ({children, value}) => 
            React.cloneElement(Children.only(children), {
                className:  children.props.className + (this.availability(value) ? '' : ' rbc-off-range-bg'),
                // style: {
                //     ...children.style,
                //     // backgroundColor: ((value < moment().add(5, 'days') &&  value > moment().toDate()) || 
                //     // (value < moment().add(15, 'days') &&  value > moment().add(8, 'days'))) ? 'white' : 'lightgray',
                //     backgroundColor: this.booked(value) ? 'white' : 'lightgray',
                // }, 
        });       

        return (
        <div className="App" style={{width: "100%"}}>
        <div style={style.head}>
            <Button 
                id="button"
                style={{fontSize: "14pt", padding: "0px 25px"}}
                variant="contained"
                onClick={this.handleClickAdd('')} >
                <Add style={{width: "2em"}}/> 
                Add Availability
            </Button>
            <div style={style.controls}>
                {/* <MultiSelect handleView={this.handleView}/> */}
                <FormControl style={style.view}>
                    <InputLabel for='space'>Select Space</InputLabel>
                    <Select
                        value={space}
                        defaultValue={space}
                        onChange={this.handleChange('space')}
                        id='space'
                    >
                    {
                        listings.map((listing, index) => {
                            return (
                                <MenuItem value={index}>{listing.name}</MenuItem>
                            )
                        })
                    }
                    </Select>
                </FormControl>
            </div>
        </div>

        <Grid container>
            <div className="calendar">
                <BigCalendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={currentBookings}
                    resizable
                    onSelectEvent={this.onEventClick}
                    onSelectSlot={(this.onSlotChange)}
                    views={['month', 'week', 'day']}
                    // dayPropGetter={dayPropGetter}
                    // eventPropGetter={(this.eventStyleGetter)}

                    components={{
                        // you have to pass your custom wrapper here
                        // so that it actually gets used
                        dateCellWrapper: dateCellWrapper,
                    }}
                    style={{ height: "70vh" }}
                />
            </div>
        </Grid>
            <GuestInfo open={guest} info={info} click={() => this.setState({guest: false})}/>
            <AddAvailabiliity open={add} space={space} click={this.handleClickAdd('')} listings={listings} />
      </div>
      
      )
  }
}

function GuestInfo(props) {

    return (
        <Dialog
            open={props.open}
            onClose={props.click}
            scroll='paper'
            fullWidth='false'
            maxWidth='sm'
            aria-labelledby="scroll-dialog-title"
        >
            <DialogContent>
                {props.info.notes}
            </DialogContent>
            <DialogActions>
                <Button ></Button>
            </DialogActions>
        </Dialog>
    )
}