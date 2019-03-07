import React, { Component } from 'react';
import { HashRouter as Router } from 'react-router-dom';
import './style/index.css';
import Nav from './Nav'
import Hero from './Hero'
import Footer from './Footer'

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <Router>
            <div>
              <Nav />
              <Hero />
              <Footer />
            </div>
          </Router>
        </header>
      </div>
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