import React from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// import './main.scss' // webpack must be configured to do this
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
//import 'react-big-calendar/lib/css/react-big-calendar.css';
import "../style/App.css";
//import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HostInfo from './HostInfo';
import { Host } from '../filter';
import { withFirebase } from '../Firebase';
import { compose } from 'recompose';
const DnDCalendar = withDragAndDrop(BigCalendar);

moment.locale('en-GB');

const localizer = BigCalendar.momentLocalizer(moment)

class Calendar extends React.Component {
    constructor(props) {
      super(props); 
      console.log(this.props)    
      this.resetHost.bind(this) 
      this.state = {
        events: [],
        avail: [],
        user: {},
        host: ""
      }
    }
    resetHost = () => {
      this.setState({
        host: ""
      })
    }
    componentDidMount() {

      this.props.firebase.auth.onAuthStateChanged((user)=> {
        if(user) {
          this.props.firebase.user(user.uid).on('value', snapshot=>{
           const currentAdv = snapshot.val()
            currentAdv['uid'] = user.uid
            this.setState({
              user: currentAdv
            });
            
          })

        }

    }); 
      if(this.props.allAvail != undefined && this.props.allAvail.length != 0) {
      
        var events = []    
        this.props.allAvail.map((a) => {
          console.log(a)
            events.push({
              id: a.key,
              start: new Date(a.start),
              end: new Date(a.end),
              title: a.firstName + " " + a.lastName, 
              host: a
            })

        })
        this.setState({
          events: events
        })
      }
    }
    onEventResize = (type, { event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        });
    };

    onEventDrop = ({ event, start, end, allDay }) => {
        this.setState(state => {
            console.log(event)
            state.events[event.id].start = start;
            state.events[event.id].end = end;
            return { events: state.events };
        });
        // console.log(start)
    };

    /* When you choose a particular slot on the calendar */
    onSlotChange = (slotInfo) => {
      var startDate = moment(slotInfo.start.toLocaleString()).format("YYYY-MM-DDm:ss");
      var endDate = moment(slotInfo.end.toLocaleString()).format("YYYY-MM-DDm:ss");
      console.log(slotInfo.start); //shows the start time chosen
      console.log(endDate); //shows the end time chosen
    }

    /* When you click on an already booked slot */
    onEventClick = (event) => {
      if(event !== undefined) {
        this.setState({
          open: !this.state.open,
          host: event.host
        })

      } else {
        this.setState({
          open: !this.state.open,
        })
      }
    }

  render() {
    console.log(this.props.allAvail)
    let events = []    
    console.log(this.state.host)
    if(this.props.allAvail !== undefined && this.props.allAvail.length != 0) {
      this.props.allAvail.map((a) => {
          events.push({
            id: a.key,
            start: new Date(a.start),
            end: new Date(a.end),
            title: a.firstName + " " + a.lastName, 
            host: a
          })
          console.log(events)
      })
    }
    this.state.events = events

    // console.log(this.state)
      return (
        <div className="App advocate-calendar calendar">
        {
          events.length === 0 && <h5>No Search Results</h5>
        }
        {console.log(this.state.events)}
            <DnDCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
            resizable
            selectable
            onSelectEvent={this.onEventClick}
            onSelectSlot={this.onSlotChange}
            style={{ height: "65vh" }}
            views={['month', 'week', 'day']}
            />
            {this.state.events !== undefined && this.state.events != 0  ?
              <HostInfo booking={this.state.host} open={this.state.open} click={this.onEventClick} user={this.state.user} resetHost={this.resetHost}/>
            : <h3>No Current Availabilities</h3>}
            
      </div>
      )
  }
}

const AdvoCalendar = compose(
  withFirebase,
)(Calendar);

export default AdvoCalendar;

