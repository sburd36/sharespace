import React from "react";
import logo from '../img/logo-new.png'
import { Link } from "react-router-dom";
import hero from "../img/dash.png"
import monthView from "../img/month-view.png"
import hostDisplay from "../img/host-display.png"
import analytics from "../img/analytics.png"

export default class Nav extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <>
            <div class="d-flex justify-content-center p-3">
                <Link to="/calendar">                            
                    <button class="btn btn-teal-fill">GO TO CALENDAR</button>
                </Link>
            </div>
            <section id="dash-sample">
                <img src={hero}></img>
                <h3>ALL YOUR HOUSING RESOURCES IN ONE PLACE.</h3>
                <p class="font-light">Our team works closely with your nonprofit to take out the bureaucracy, 
                wait time, and lack of integration, out of housing resource planning by providing this easy-to-use platform.</p>
            </section>
            <div class="container p-4 d-md-flex">
                <form id="contact" class="container" action="https://formspree.io/turtlemaster0828@gmail.com" method="POST">
                    <h2 class="mt-5">Join Email List</h2>
                    <div class="form-group">
                        <input id="emailAddress" type="email" class="form-control" placeholder="Enter email" name="_replyto" aria-label="Name" aria-describedby="basic-addon1"
                            required />
                    </div>
                    <button type="submit" class="btn btn-primary">JOIN</button>
                    <input type="hidden" name="_next" value="/"></input>
                </form>
            </div>
            <div class="divider mb-3"></div>

            <section id="calendar">
                <div class="row">
                    <div class="col col-md-3">
                        <h3>A calendar of all calendars.</h3>
                        <p class="font-light">Get a one-glance overview of all your participant’s availabilities and existing 
                        bookings. Our powerful software provides real time updates of interactions so your organization can maximize scheduling and minimize the costs of coordination.
                        </p>
                        <div>
                            <Link to='/signup'>
                                <button class="btn btn-teal-fill">SIGN UP</button>
                            </Link>
                            {/* <button class="btn btn-teal-fill">LEARN MORE</button> */}
                        </div>
                    </div>
                    <div class="col col-md-9">
                        <img src={monthView}></img>
                    </div>
                </div>
            </section>

            <section id="host-dash">
                <div class="row">
                    <div class="col col-md-9">
                        <img src={hostDisplay}></img>
                    </div>
                    <div class="col col-md-3">
                        <h3>Contact hosts efficiently.</h3>
                        <p class="font-light">Our platform makes contacting and verifying hosts easy. Contact cards show host locations, reviews, phone, email, and receipts from past 
                        trips. Customer management relationships for housing advocates have never been more accessible.
                        </p>
                        <Link to='/signup'>
                            <button class="btn btn-teal-fill">SIGN UP</button>
                        </Link>
                    </div>
                </div>
            </section>

            <section id="analytics">
                <div class="row">
                    <div class="col col-md-3">
                        <h3>Track your impact.</h3>
                        <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                        Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.</p>
                        <Link to='/signup'>
                            <button class="btn btn-teal-fill">SIGN UP</button>
                        </Link>
                        <div>
                        </div>
                    </div>
                    <div class="col col-md-9">
                        <img src={analytics}></img>
                    </div>
                </div>
            </section>

            </>
        )
    }
}