import React from "react";
import logo from './img/LOGO-teal.png'

export default class Nav extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <nav class="navbar navbar-expand-md mb-2 m-0 border-bottom">
                <a href="https://sburd36.github.io/capstone2019/"><img src={logo}  class="logo"alt="logo"/></a>
                <ul class="navbar-nav">
                    <li class="nav-item">
                        <a class="nav-link" href="#">The Mission</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Resources</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Our Community</a>
                    </li>
                </ul>
                <div id="nav-buttons">
                    <button class="btn btn-yellow-fill" id="sign-up">Get Started</button>
                    <button class="btn btn-teal-empty" id="donate">Donate</button>
                </div>
            </nav>
        )
    }
}