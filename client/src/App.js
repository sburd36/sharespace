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
import Calendar from './Calendar'
import Situation from './Situation'
import { withAuthentication } from './Sessions';
import SearchBooking from './Advocate/SearchBooking';
import PasswordForgetPage from './PassForget';
import Admin from './Admin';
import SignUpHost from './SignUpHost';
import HostDash from './Host/HostDash';
import CreateProfile from './Host/CreateProfile'
import Listing from './Host/AddSpace'
import {BrowserRouter as Router, Switch, Redirect, Route} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {

      currentUser: {
        type: "",
        uid: "",
        firstName: "",
        lastName: "",
        email: ""

      },
      profile: {
        phone: '',
        gender: 'non given',
        languages: [],
        ethnicities: [],
        religion: [],
        story: 'none given',
        haveListing: false      
      },

      listings: [{
        id: "",
        address: "",
        amenities: [],
        description: "",
        instructions: "",
        guestCount: "",
        hostID: "",
        houseRules: [],
        location:"",
        state: "",
        houseType: "",
        zip: "",
        availability: [],
        currentBookings: [

        ],
        pastBookings: []
      }]
    }
  }

  clickSituation = () => {
    this.setState({})
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
  updateListingInfo = (value) => {
    this.setState({
      listings: value
    })
  }

  updateType = (value) => {
    this.setState({
      userType: value
    })
  }

  updateProfile = (target, value) => {
    this.setState({
      porfile: {
        target: value
      }
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
                  <Route path="/currentbookings" component={CurrentBookings} />
                  <Route path="/bookings" component={SearchBooking} />

                  {/* Host */}
                  <Route path="/createprofile" render={(props) => <CreateProfile {...props} updateProfile={this.updateProfile} user={this.state.currentUser}/>} />
                  <Route path="/listing" component={Listing} />
                  {/* <Route path="/hostdash" component={HostDash} /> */}
                  <Route path="/hostdash" render={(props) => <HostDash {...props} updateListing= {this.updateListingInfo} user = {this.state.currentUser} profile={this.state.profile}/>} />

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