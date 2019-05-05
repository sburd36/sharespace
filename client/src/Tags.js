import React, { Component } from 'react';
import { withFirebase } from './Firebase';
import { compose } from 'recompose';
import { Link, withRouter } from 'react-router-dom';

const INITIAL_STATE = {
    listingName: '',
    location: '',
    address1: '',
    address2: '',
    city: '',
    country: '',
    zip: '',
    photos: [],
    numOfGuests: '',
    homeType: '',
    homeDescription: '',
    checkInDescription: '',
    amenities: [],
    accomodations: [],
    houseRules: []

}

class AddNewBookingBase extends Component {
    constructor(props) {
        super(props);

        this.state = {INITIAL_STATE};
    };

    render() {
        return (
            <div>
            <form action="/action_page.php">
            
            <h6>Location</h6>
            <select name="Location">
                <option value="Becon Hill">Becon Hill</option>
                <option value="Capital Hill">Capital Hill</option>
                <option value="University District">University District</option>
                <option value="Down Town">Down Town</option>
                <option value="Bellevue">Belleuve</option>

            </select>
            <br></br>
            <h6>Country</h6>
            <select name="Country">
                <option value="United States">United States</option>
            </select>
            <br></br>
            <h6>Home Type</h6>
            <select name="Home Type" >
                <option value="United States">Private Bedroom</option>
                <option value="United States">Own living space</option>

            </select>            
            <br></br>
            <h6>Amenities</h6>
            <select name="amenitites" size="12" multiple>
                <option value="volvo">Kitchen</option>
                <option value="saab">Microwave</option>
                <option value="fiat">Meals</option>
                <option value="audi">Laundry</option>
                <option value="volvo">Self-Check in</option>
                <option value="saab">Voicemail</option>
                <option value="fiat">Fridge</option>
                <option value="audi">Parking</option>
                <option value="volvo">Computer Access</option>
                <option value="saab">Wifi</option>
                <option value="fiat">Bike Storage</option>
                <option value="audi">Private Bathroom</option>
            </select>
            <br></br>
            <h6>Accomodations</h6>
            <br></br>
            <h6>bedrooms:</h6> 
            <select name="amenitites" size="3" multiple>
                <option value="volvo">0-1</option>
                <option value="saab">2-3</option>
                <option value="fiat">4-5</option>
            </select>
            <h6>bathrooms:</h6> 
            <select name="amenitites" size="3" multiple>
                <option value="volvo">0-1</option>
                <option value="saab">2-3</option>
                <option value="fiat">4-5</option>
            </select>


            <input type="submit"></input>
            </form>

            </div>

        );
    }
    
}
const Tags = compose(
    withRouter, 
    withFirebase,
)(AddNewBookingBase)

export default Tags;