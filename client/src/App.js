import React, { Component } from 'react';
import './style/index.css';
import Nav from './Nav'
import Signup from './Signup'
import Stay from './Stay'
import Landing from './landing'
import Footer from './Footer'
import AboutUs from './AboutUs'
import OurTool from './OurTool'
import {HashRouter as Router, Switch, Redirect, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Router>
          <div>
            <Nav />
              <Switch>
                  <Route exact path="/" component={Landing}></Route>
                  <Route path="/signup" component={Signup}></Route>
                  <Route path="/stay" component={Stay}></Route>
                  <Route path="/aboutus" component={AboutUs}></Route>
                  <Route path="/ourtool" component={OurTool}></Route>
              </Switch>
          </div>
        </Router>
        <Footer />
      </div>

      // <div className="App">
      //   <header className="App-header">
      //     {/* <Router> */}
      //       {/* <div> */}
      //         <Signup />
      //         {/* <Footer /> */}
      //       {/* </div>
      //     </Router> */}
      //   </header>
      // </div>
    );
  }
}

export default App;
// <img src={logo} className="App-logo" alt="logo" />

// <a
//   className="App-link"
//   href="https://reactjs.org"
//   target="_blank"
//   rel="noopener noreferrer"
// >
//   Learn React
// </a>