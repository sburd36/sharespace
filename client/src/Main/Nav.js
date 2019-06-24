import React from "react";
import logo from '../img/logo-new.png'
import { Link } from "react-router-dom";
import SignOutButton from '../SignOut';
import { AuthUserContext } from '../Sessions';

// import Nav from "./OurTool";

const Navigation = () => (
    <div>
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? <NavigationAuth /> : <NavigationNonAuth />
        }
      </AuthUserContext.Consumer>
    </div>
  );
const NavigationAuth = () => (
    <nav class="navbar navbar-expand-md" style={{height: "5.5rem"}}>
    <div class="d-flex">
        <Link to="/">
            <img src={logo} class="logo" alt="logo"/>
        </Link>
    </div>     
    <div id="nav-buttons">
        <Link to="/">    
            <SignOutButton />
        </Link>
    </div>
</nav>
);

const NavigationNonAuth = () => (
    <nav class="navbar navbar-expand-md d-flex justify-content-between" style={{height: "5.5rem"}}>
    <div class="d-flex">
        <Link to="/sharespace">
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

            <Link to="/advocate/currentbookings">
                <li class="nav-item">
                    <b>ADVOCATE VIEW</b>
                </li>
            </Link>

            <Link to="/host/hostdash">
                <li class="nav-item">
                    <b>HOST VIEW</b>
                </li>
            </Link>
        </ul>
    </div>     
    <div class="d-flex align-items-center">
        <form id="contact" class="d-flex justify-content-end align-items-center" action="https://formspree.io/sharespace.app@gmail.com" method="POST">
            <div class="p-2">JOIN US</div>
            <div class="form-group pt-3 pr-2">
                <input id="emailAddress" type="email" class="form-control" placeholder="Enter email" name="_replyto" aria-label="Name" aria-describedby="basic-addon1"
                    required />
            </div>
            <button type="submit" class="btn btn-sm btn-teal-fill">Submit</button>
            <input type="hidden" name="_next" value="/"></input>
        </form>
        <div id="nav-buttons">
            <Link to="/signin"><button class="btn btn-yellow-fill" id="log-in">Sign In</button></Link>
        </div>
    </div>
</nav>

);

export default Navigation;
