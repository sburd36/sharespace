import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BookingInfo from './BookingInfo';
import { Host } from '../filter';
import Switch from '@material-ui/core/Switch';
import HostCalendar from './HostCalendar';
import Availability from './AddAvailability';

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

export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: 'calendar',
            bookings: [
                {
                    guestID: 1349,
                    homeName: 'Jimmy\'s Bedroom',
                    numberOfGuest: 1,
                    begin: '2019-04-10',
                    end: '2019-04-29',
                    notes: "Guest Notes Here",
                    info: ['No Smoking', 'No Alcohol'],
                    address: '1234 Mary Gates Way NE Apt. 430 Seattle, WA 98105',
                    homeType: 'Entire Room',
                    location: 'BEACON HILL',
                    advocate: {
                        name: 'Jenny Chen',
                        phone: '(206)396-3860',
                        email: 'jennychen@gmail.com'
                    }
                },
                {
                    guestID: 7859,
                    homeName: 'Lakeview Apartments',
                    numberOfGuest: 2,
                    begin: '2019-05-14',
                    end: '2019-05-20',
                    notes: "Guest Notes Here",
                    info: ['Young Child', 'Pets', 'Women Only', 'No Alcohol'],
                    address: '1234 Mary Gates Way NE Apt. 430 Seattle, WA 98105',
                    homeType: 'Entire Space',
                    location: 'GREEN LAKE',
                    advocate: {
                        name: 'Jenny Chen',
                        phone: '(206)396-3860',
                        email: 'jennychen@gmail.com'
                    }
                },
                {
                    guestID: 8562,
                    homeName: 'Lakeview Apartments',
                    numberOfGuest: 1,
                    begin: '2019-06-10',
                    end: '2019-06-30',
                    notes: "Guest Notes Here",
                    info: ['Physical Disability', 'Service Animal'],
                    address: '1234 Mary Gates Way NE Apt. 430 Seattle, WA 98105',
                    homeType: 'Entire Space',
                    location: 'GREEN LAKE',
                    advocate: {
                        name: 'Jenny Chen',
                        phone: '(206)396-3860',
                        email: 'jennychen@gmail.com'
                    }
                },
                {
                    guestID: 9757,
                    homeName: 'Vacation House',
                    numberOfGuest: 1,
                    begin: '2019-07-10',
                    end: '2019-07-20',
                    notes: "Guest Notes Here",
                    info: ['Young Child', 'High Chair'],
                    address: '1234 Mary Gates Way NE Apt. 430 Seattle, WA 98105',
                    homeType: 'Entire Space',
                    location: 'DOWNTOWN',
                    advocate: {
                        name: 'Jenny Chen',
                        phone: '(206)396-3860',
                        email: 'jennychen@gmail.com'
                    }
                },
            ]
        }
    }

    handleCardClick = () => {
        this.setState({
            open: !this.state.open
        })
    }

    handleSwitchView = (event) => {
        this.setState({
            view: event.target.checked ? "calendar" : "list"
        })
    }

    render() {
        const { classes, type } = this.props;
        // console.log(type)
        return(
            <div >
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
                                            <p style={{fontSize: "16px", fontWeight: 300}}>{data.numberOfGuest} Guests</p>
                                            <p style={{fontSize: "16px", fontWeight: 300, color: "#da5c48"}}>{data.homeName}</p>
                                        </div>
                                        <div>
                                            {data.start} - <br/>
                                            {data.end}
                                        </div>
                                    </div>
                                    
                                    <div style={{fontWeight: 300, paddingTop: "10px"}}><b>Notes:</b> {data.notes}</div>

                                    <p style={{fontSize: "16px", fontWeight: 400}}>Guest Needs:</p>
                                    <div style={{display: 'flex', flexWrap: 'wrap', margin: '5px'}}>
                                        {
                                            data.info.map((amenity) =>{
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
                                    <BookingInfo booking={data} open={this.state.open} type={type} click={this.handleCardClick}></BookingInfo>
                                </Paper>
                            )
                        }) 
                    }
                </div>

            </div>
        )
    }
})