import React, { Component } from 'react';
import './style/index.css';
import Nav from './Nav'
import Signup from './Signup'
import Stay from './Stay'
import Landing from './landing'
// import Footer from './Footer'
import {HashRouter as Router, Switch, Redirect, Route} from "react-router-dom";

class App extends Component {
  render() {
    return (
      <div>
        <Nav />
        <Landing />
        <Router>
            <Switch>
                <Route exact path="/landing" component={Landing}></Route>
                <Route path="/signup" component={Signup}></Route>
                <Route path="/stay" component={Stay}></Route>
            </Switch>
        </Router>
        
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