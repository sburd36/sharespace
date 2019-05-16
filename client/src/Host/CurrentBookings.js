import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import BookingInfo from './BookingInfo';
import { Host } from '../filter';
const styles = theme => ({
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
            <div>
                {
                    this.state.bookings.map((data) => {
                        return(
                            <Paper onClick={this.handleCardClick}>
                                <b>Guest ID</b> 
                                {data.guestID}
                                Number of Guest: {data.numberOfGuest}
                                Notes: {data.notes}
                                {
                                    data.info.map((amenity) =>{
                                        return (
                                            <div>{amenity}</div>
                                        )
                                    })
                                }
                                {data.begin}
                                {data.end}
                                <BookingInfo booking={data} open={this.state.open} click={this.handleCardClick}></BookingInfo>
                            </Paper>
                        )
                    })
                }
                {/* {
                    Host.map((data) => {
                        return(
                            <Paper onClick={this.handleCardClick}>
                                <b>Guest ID</b> 
                                {/* {data.guestID} */}
                                {/* Number of Guest: {data.numberOfGuest}
                                Notes: {data.notes}
                                {
                                    data.info.map((amenity) =>{
                                        return (
                                            <div>{amenity}</div>
                                        )
                                    })
                                }
                                {data.begin}
                                {data.end} */}
                                {/* <BookingInfo booking={data} open={this.state.open} click={this.handleCardClick}></BookingInfo>
                            </Paper>
                        )
                    }) */}
                {/* }  */}
            </div>
        )
    }
})