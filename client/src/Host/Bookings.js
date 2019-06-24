import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BookingInfo from './BookingInfo';
import { Host } from '../filter';
import Switch from '@material-ui/core/Switch';
import HostCalendar from './HostCalendar';
import Availability from './AddAvailability';
import moment from 'moment'
// firebase
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

const styles = theme => ({
    cards: {
        display: "flex",
        flexWrap: "wrap",
        //paddingLeft: "48px"
        width: window.innerWidth / 2 + 230,
        color: "#202e57"
    },
    card: {
        maxWidth: 320,
        margin: "0rem 1rem 1rem 3rem",
        border: "0.5px solid #d3dbee",
        boxShadow: "none",
        fontFamily: 'Source Sans Pro',
        borderRadius: "12px",
        padding: "25px",
        flex: "1 1 50%"
    },
    cardHeader: {
        display: "flex",
        justifyContent: "space-between"
    }
})

class AvailCalendar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'calendar',
            bookings: [],
            // pendingBookings: []
        }
    }

    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged((user)=> {
            if(user) {
                if (this.props.type === 'confirmed') {
                    this.props.firebase.availabilities().orderByChild("state").equalTo("booked").on('value', snapshot=>{
                        let obj = snapshot.val();
                        console.log(obj);
                        if (obj !== null) {
                            
                            const book = Object.keys(obj).map(key => ({
                                ...obj[key],
                                id: key
                                })); 
                            console.log(book.key)
                            this.setState({
                                bookings: book  
                            })
    
                        }
                        console.log(this.state)
                    })
                } else {
                    this.props.firebase.availabilities().orderByChild("state").equalTo("pending").on('value', snapshot=>{
                        let obj = snapshot.val();
                        console.log(obj);
                        if (obj !== null) {
                            
                            const book = Object.keys(obj).map(key => ({
                                ...obj[key],
                                id: key
                                })); 
                            console.log(book.key)
                            this.setState({
                                bookings: book  
                            })
    
                        }
                        console.log(this.state)
                    })
                }
            } else {
                console.log("no current user present")
            }
        });     
    }

    handleCardClick = () => {

        this.setState({
            open: !this.state.open
        })
       
    }

    handleFireClick = (obj, decide) => {

        console.log(obj)
        console.log(decide)
        this.setState({
            open: !this.state.open
        })
        // if (obj !== undefined ) {
        //     if (decide == "accept") {
        //         console.log("inside accept")
        //         this.props.firebase.addPendingToBooked(obj)
        //     } else {
        //         console.log("inside decline")
        //        this.props.firebase.addPendingToDelete(obj) 
        //     }
        // }
       
    }


    handleSwitchView = (event) => {
        this.setState({
            view: event.target.checked ? "calendar" : "list"
        })
    }

    render() {
        const { classes, type, bookings } = this.props;
        console.log(this.state)
        // let bookings = []
        // // type == 'confirmed' ? bookings = this.state.currentBookings : bookings =this.state.pendingBookings;
        // if(type == 'confirmed') {
        //     bookings = this.state.currentBookings
        // } else {
        //     bookings = this.state.pendingBookings
        // }
        console.log(bookings)
        // console.log(type)
        return(
            <div >
                {}
                {
                    type === 'confirmed' ? <h4 class="pl-5 pb-2">CURRENT BOOKINGS</h4>
                    :    <h4 class="pl-5 pb-2">BOOKING REQUESTS</h4>

                }
                <div className={classes.cards}>

                    {
                        this.state.bookings.map((data) => {
                            return(
                                <Paper onClick={this.handleCardClick} className={classes.card} id="hoverCard">
                                    <div className={classes.cardHeader}>
                                        <div>
                                            <p>Guest #: {data.guestID}</p>
                                            <p style={{fontSize: "16px", fontWeight: 300}}>{data.guest} Guests</p>
                                            <p style={{fontSize: "16px", fontWeight: 300, color: "#da5c48"}}>{data.name}</p>
                                        </div>
                                        <div>
                                            {moment(new Date(data.start).toLocaleString()).format('MMMM DD')} - <br/>
                                            {moment(new Date(data.end).toLocaleString()).format('MMMM DD')}
                                        </div>
                                    </div>
                                    
                                    <div style={{fontWeight: 300, paddingTop: "10px"}}><b>Notes:</b> {data.notes}</div>

                                    <p style={{fontSize: "16px", fontWeight: 400}}>Guest Needs:</p>
                                    <div style={{display: 'flex', flexWrap: 'wrap'}}>
                                        {
                                            data.ethnicities.map((amenity) =>{
                                                return (
                                                    <div
                                                        id="tags"
                                                        style={{
                                                            border: "0.5px solid",
                                                            borderRadius: '0.5rem',
                                                            padding: '4px 12px 4px 12px',
                                                            margin: '2px'
                                                        }}
                                                    >
                                                        {amenity}
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                    <BookingInfo booking={data} open={this.state.open} type={type} click={this.handleFireClick}></BookingInfo>
                                </Paper>
                            )
                        }) 
                    }
                </div>

            </div>
        )
    }
}

const Bookings = compose(
    withStyles(styles),
    withFirebase,
  )(AvailCalendar);

  export default Bookings;