import React from "react";
import logo from './img/logo-new.png'
import { Link } from "react-router-dom";
import { NONAME } from "dns";

export default class Nav extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <nav class="navbar navbar-expand-md" style={{height: "5.5rem"}}>
                <div class="d-flex">
                    <Link to="/">
                        <img src={logo} class="logo" alt="logo"/>
                    </Link>
                    <ul class="navbar-nav d-flex justify-content-start align-items-center">
                        <Link to="/aboutus">
                            <li class="nav-item">
                                <b>ABOUT US</b>
                            </li>
                        </Link>
                        
                        <Link to="/ourtool">
                            <li class="nav-item">
                                <b>OUR TOOL</b>
                            </li>
                        </Link>
                    </ul>
                </div>     
                <form id="contact" class="container d-flex justify-content-end" action="https://formspree.io/turtlemaster0828@gmail.com" method="POST">
                    <div class="p-2"><b>JOIN US</b></div>
                    <div class="form-group pt-3 pr-2">
                        <input id="emailAddress" type="email" class="form-control" placeholder="Enter email" name="_replyto" aria-label="Name" aria-describedby="basic-addon1"
                            required />
                    </div>
                    <button type="submit" class="btn btn-primary btn-sm">Submit</button>
                    <input type="hidden" name="_next" value="/"></input>
                </form>
                <div id="nav-buttons">
                    <Link to="/signin"><button class="btn btn-yellow-empty" id="log-in">LOG IN</button></Link>
                    <button class="btn btn-teal-empty" id="donate">DONATE</button>
                </div>
            </nav>
        )
    }
}