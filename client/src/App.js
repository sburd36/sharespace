import React, { Component } from 'react';
import './style/index.css';
import Nav from './Nav'
import Signup from './Signup'
import Stay from './Stay'
import Landing from './Landing'
import Advocate from './Advocate'
import Login from './Login'

// import Footer from './Footer'
import {HashRouter as Router, Switch, Redirect, Route} from "react-router-dom";
class App extends Component {
  render() {
    return (
      <div>
        <Router>  
          <div>
            <Nav />
            <Switch>
                <Route exact path="/landing" component={Landing} />
                <Route path="/login" component={Login} />
                <Route path="/signup" component={Signup} />
                <Route path="/stay" component={Stay} />
                <Route path="/advocate" component={Advocate} />
            </Switch>
          </div>      
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