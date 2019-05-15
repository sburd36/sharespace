import React from 'react'
// import FullCalendar from '@fullcalendar/react'
// import dayGridPlugin from '@fullcalendar/daygrid'
// import timeGridPlugin from "@fullcalendar/timegrid";
// import interactionPlugin from "@fullcalendar/interaction";

// import './main.scss' // webpack must be configured to do this
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css';
import "./style/App.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
const DnDCalendar = withDragAndDrop(BigCalendar);

moment.locale('en-GB');

const localizer = BigCalendar.momentLocalizer(moment)

export default class Calendar extends React.Component {
    state = {
        events: [
          {
            start: new Date(),
            end: new Date(moment().add(1, "days")),
            title: "Marry Potter"
          }
        ]
      };
    
    onEventResize = (type, { event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        });
    };

    onEventDrop = ({ event, start, end, allDay }) => {
        this.setState(state => {
            state.events[0].start = start;
            state.events[0].end = end;
            return { events: state.events };
        });
    };
  render() {
      return (
        // <div style={{ height: 700 }}>
        //     <BigCalendar
        //     localizer={localizer}
        //     events={[
        //         {
        //           'title': 'My event',
        //           'allDay': false,
        //           'start': new Date(2018, 0, 2, 10, 0), // 10.00 AM
        //           'end': new Date(2018, 0, 2, 14, 0), // 2.00 PM 
        //         }
        //       ]}
        //       step={60}
        //       view='month'
        //       views={['month']}
        //     //   min={new Date(2008, 0, 1, 8, 0)} // 8.00 AM
        //     //   max={new Date(2008, 0, 1, 17, 0)} // Max will be 6.00 PM!
        //     //   date={new Date(2018, 0, 1)}
        //     // startAccessor="start"
        //     // endAccessor="end"
        //     />
        // </div>
        <div className="App">
            <DnDCalendar
            localizer={localizer}
            defaultDate={new Date()}
            defaultView="month"
            events={this.state.events}
            onEventDrop={this.onEventDrop}
            onEventResize={this.onEventResize}
            resizable
            style={{ height: "100vh" }}
            />
      </div>
      )
  }
}
