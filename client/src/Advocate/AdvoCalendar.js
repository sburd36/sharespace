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
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import HostInfo from './HostInfo';
import { Host } from '../filter';

const DnDCalendar = withDragAndDrop(BigCalendar);

moment.locale('en-GB');

const localizer = BigCalendar.momentLocalizer(moment)

export default class Calendar extends React.Component {
    constructor(props) {
      super(props);
      var events = []
      Host.map((host) => {
        host.space[0].availability.map((available) => {
          events.push({
            id: events.length,
            start: new Date(available.start),
            end: new Date(available.end),
            title: host.information.name, 
            host: host
          })
        },
        )
      })
      this.state = {
        events: events,
        host: Host[0]
      }
    }

    componentDidMount = () => {
      // console.log(this.state.events)
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
        this.setState({
          open: !this.state.open,
          host: event.host
        })
    }

  render() {
      return (
        <div className="App advocate-calendar calendar">
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
            />
            <HostInfo booking={this.state.host} open={this.state.open} click={this.onEventClick}/>
      </div>
      )
  }
}
