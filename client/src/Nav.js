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
            <nav class="navbar navbar-expand-md border-bottom" style={{height: "5.5rem"}}>
                <div class="d-flex">
                <Link to="/landing" style={{width: "200px"}}>
                    <img src={logo}  class="logo" alt="logo" />
                </Link>
                <ul class="navbar-nav d-flex justify-content-start align-items-center">
                    <li class="nav-item">
                        <a class="nav-link" href="#">
                            <b>ABOUT US</b>
                        </a>
                    </li>
                    <Link to="/signup" style={{textDecoration: "none", color: "inherit"}}>
                        <li class="nav-item">
                            <b>OUR TOOLS</b>
                        </li>
                    </Link>
                </ul>
                </div>     
                <div id="nav-buttons">
                    <Link to="/login"><button class="btn btn-yellow-empty" id="log-in">LOG IN</button></Link>
                    <button class="btn btn-teal-empty" id="donate">DONATE</button>
                </div>
            </nav>
        )
    }
}