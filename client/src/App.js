import React, { Component } from 'react';
import './style/index.css';
import Nav from './Main/Nav'
import SignUp from './Signup'
import Stay from './Stay'
import Landing from './Main/landing'
import Footer from './Main/Footer'
import AboutUs from './Main/AboutUs'
import OurTool from './Main/OurTool'
import CurrentBookings from './Advocate/CurrentBookings'
import SignIn from './Main/SignIn'
import Calendar from './Advocate/AdvoCalendar'
import Situation from './Situation'
import { withAuthentication } from './Sessions';
import SearchBooking from './Advocate/SearchBooking';
import PasswordForgetPage from './PassForget';
import Admin from './Admin';
import SignUpHost from './SignUpHost';
import HostDash from './Host/HostDash';
import CreateProfile from './Host/CreateProfile'
import {BrowserRouter as Router, Switch, Redirect, Route} from "react-router-dom";
import MyListing from './Host/MyListing'
import { listing } from './filter';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      currentUser: {
        type: "",
        uid: "",
        firstName: "Mary",
        lastName: "Huibregtse",
        email: "mary@gmail.com"

      },
      profile: {
        phone: '1234567890',
        gender: 'Female',
        languages: ["english"],
        ethnicities: ["White"],
        religion: ["None"],
        listings: [{
          address: "2525 minor Ave E",
          amenities: ["Kitchen", "Parking", "Bike Storage"],
          description: "hello",
          guestCount: 3,
          hostID: "zSrR3ts6r4cM9z1LG2TyW26uVR42",
          houseRules: ["No Smoking", "No Alcohol"],
          id: "-Lg9OGG55kjo4HuwA1B9",
          information: "world",
          location: "Belltown",
          name: "Listing A",
          photos: "no photos currently",
          type: "Hotel Room",
          zip: "98102",
          availability: [],
          currentBookings: [],
          pendingBookings: [],
        }],
        listingIDs: ['-LgQLVKa-hPfhrupdcUB'],
        story: 'none given',     
      }
      // profile: {
      //   phone: '',
      //   gender: 'non given',
      //   languages: [],
      //   ethnicities: [],
      //   religion: [],
      //   listings: [],
      //   listingIDs: [],
      //   story: 'none given',     
      // }

      
    }
  }

 

  updateAvailability = (id, value) => {
    let l = this.state.profile.listings
    for (let i = 0; i < l.length; i ++) {
      let obj = l[i]
      if(obj.id == id) {
        l[i].availability.push(value)
      }
    }
    console.log('AVAILABILITY!!!!!!')
    console.log(this.state)
  }

  updateUser = (value) => {
    this.setState({
      currentUser: {
        type: value.type,
        uid: value.uid,
        firstName: value.firstName,
        lastName: value.lastName,
        email: value.email
      }

    }) 
    console.log(this.state.currentUser)
  }
  updateListing = (value) => {
    if (this.state.profile.listings == undefined || this.state.profile.listingIDs === undefined) {
      this.setState({
        profile: {
          listings: [value],
          listingIDs: [value.id]
        }         
      })
    } else {
      this.state.profile.listings.push(value)
      this.state.profile.listingIDs.push(value.id)
    }

    console.log(this.state)
  }

  updateType = (value) => {
    this.setState({
      userType: value
    })
  }



  updateProfile = (value) => {
    this.setState({
      profile: {
        phone: value.phone,
        gender: value.gender,
        languages: value.languages,
        ethnicities: value.ethnicities,
        religion: value.religion,
        listings: value.listings,
        story: value.story,
        haveListing: value.haveListing      
      },
    })
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
              <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/signup" render={(props) => <SignUp {...props} updateUser={this.updateUser}/>} />
                  <Route path="/stay" component={Stay} />
                  <Route path="/aboutus" component={AboutUs} />
                  <Route path="/ourtool" component={OurTool} />
                  <Route path="/Admin" component={Admin} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/situation" component={Situation} />
                  <Route path="/PassForget" component={PasswordForgetPage} />
                  <Route path="/calendar" component={Calendar} />

                  {/* Advocate */}
                  <Route path="/advocate/currentbookings" component={CurrentBookings} />
                  <Route path="/advocate/searchbookings" component={SearchBooking} />

                  {/* Host */}
                  <Route path="/createprofile" render={(props) => <CreateProfile {...props} updateProfile={this.updateProfile} user={this.state.currentUser}/>} />
                  {/* <Route path="/listing" render={(props) => <MyListing {...props} updateListing={this.updateListing} user={this.state.currentUser}/>} /> */}

                  {/* <Route path="/hostdash" component={HostDash} /> */}
                  <Route path="/host/hostdash" render={(props) => <HostDash {...props} updateListing= {this.updateListing} currentUser = {this.state.currentUser} profile={this.state.profile} updateAvailability = {this.updateAvailability}/>} />                  


              </Switch>
          </div>    
        </Router>
        <Footer />
      </div>
    );
  }
}

export default withAuthentication(App);
// <img src={logo} className="App-logo" alt="logo" />

// <a
//   className="App-link"
//   href="https://reactjs.org"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   Learn React
// </a>