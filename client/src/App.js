import React, { Component } from 'react';
import './style/index.css';
import Nav from './Nav'
import SignUp from './Signup'
import Stay from './Stay'
import Landing from './landing'
import Footer from './Footer'
import AboutUs from './AboutUs'
import OurTool from './OurTool'
import Advocate from './Advocate/Advocate'
import SignIn from './SignIn'
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
import {HashRouter as Router, Switch, Redirect, Route} from "react-router-dom";

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
              <Switch>
                  <Route exact path="/" component={Landing} />
                  <Route path="/signup" component={SignUp} />
                  <Route path="/stay" component={Stay} />
                  <Route path="/aboutus" component={AboutUs} />
                  <Route path="/ourtool" component={OurTool} />
                  <Route path="/advocate" component={Advocate} />
                  <Route path="/signin" component={SignIn} />
                  <Route path="/calendar" component={Calendar} />
                  <Route path="/situation" component={Situation} />
                  <Route path="/PassForget" component={PasswordForgetPage} />
                  <Route path="/bookings" component={SearchBooking} />
                  <Route path="/Admin" component={Admin} />
                  <Route path="/profile" component={CreateProfile} />
                  <Route path="/listing" component={Listing} />
                  <Route path="/hostdash" component={HostDash} />
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