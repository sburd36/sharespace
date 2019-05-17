import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BookingInfo from './BookingInfo';
import { Host } from '../filter';
const styles = theme => ({
    cards: {
        display: "flex",
        flexWrap: "wrap",
        //paddingLeft: "48px"
        color: "#202e57"
    },
    card: {
        maxWidth: 500,
        margin: "0rem 5rem 1rem 3rem",
        border: "0.5px solid #d3dbee",
        boxShadow: "none",
        fontFamily: 'Source Sans Pro',
        borderRadius: "12px",
        padding: "25px"
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
            bookings: [
                {
                    guestID: 1,
                    homeName: 'House 1',
                    numberOfGuest: 1,
                    begin: '2019-05-14',
                    end: '2019-05-20',
                    notes: "oahgpoawn;fgl ;foiawoajgpoaw;oaw nws o; jiofaooaiwn",
                    info: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking'],
                    address: '1234 Mary Gates Way NE Apt. 430 Seattle, WA 98105',
                    homeType: 'Shared Room',
                    location: 'GREEN LAKE',
                    advocate: {
                        name: 'Jenny Chen',
                        phone: '(206)396-3860',
                        email: 'jennychen@gmail.com'
                    }
                },
                {
                    guestID: 1,
                    homeName: 'House 1',
                    numberOfGuest: 1,
                    begin: '2019-05-14',
                    end: '2019-05-20',
                    notes: "oahgpoawn;fgl ;foiawoajgpoaw;oaw nws o; jiofaooaiwn",
                    info: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking'],
                    address: '1234 Mary Gates Way NE Apt. 430 Seattle, WA 98105',
                    homeType: 'Shared Room',
                    location: 'GREEN LAKE',
                    advocate: {
                        name: 'Jenny Chen',
                        phone: '(206)396-3860',
                        email: 'jennychen@gmail.com'
                    }
                },
                {
                    guestID: 1,
                    homeName: 'House 1',
                    numberOfGuest: 1,
                    begin: '2019-05-14',
                    end: '2019-05-20',
                    notes: "oahgpoawn;fgl ;foiawoajgpoaw;oaw nws o; jiofaooaiwn",
                    info: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking'],
                    address: '1234 Mary Gates Way NE Apt. 430 Seattle, WA 98105',
                    homeType: 'Shared Room',
                    location: 'GREEN LAKE',
                    advocate: {
                        name: 'Jenny Chen',
                        phone: '(206)396-3860',
                        email: 'jennychen@gmail.com'
                    }
                },
                {
                    guestID: 1,
                    homeName: 'House 1',
                    numberOfGuest: 1,
                    begin: '2019-05-14',
                    end: '2019-05-20',
                    notes: "oahgpoawn;fgl ;foiawoajgpoaw;oaw nws o; jiofaooaiwn",
                    info: ['Kitchen', 'Laundry', 'Refrigerator', 'Wifi', 'Parking'],
                    address: '1234 Mary Gates Way NE Apt. 430 Seattle, WA 98105',
                    homeType: 'Shared Room',
                    location: 'GREEN LAKE',
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
    render() {
        const { classes } = this.props;
        return(
            <div >
                <h4 class="pl-5 pb-2">CURRENT BOOKINGS</h4>
                <div className={classes.cards}>
                    {
                        this.state.bookings.map((data) => {
                            return(
                                <Paper onClick={this.handleCardClick} className={classes.card} id="hoverCard">
                                    <div className={classes.cardHeader}>
                                        <div>
                                            <p>Guest #: {data.guestID}</p>
                                            <p style={{fontSize: "16px", fontWeight: 300}}>{data.numberOfGuest} Guests</p>
                                            <p style={{fontSize: "16px", fontWeight: 300, color: "#da5c48"}}>Property</p>
                                        </div>
                                        <div>
                                            {data.begin} - <br/>
                                            {data.end}
                                        </div>
                                    </div>
                                    
                                    <div style={{fontWeight: 300, paddingTop: "10px"}}><b>Notes:</b> {data.notes}</div>
                                    
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
                                    
                                    <BookingInfo booking={data} open={this.state.open} click={this.handleCardClick}></BookingInfo>
                                </Paper>
                            )
                        })
                    }
                </div>
                
            </div>
        )
    }
})