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
            <section id="dash-sample">
                <img src={hero}></img>
                <h3>All your housing resources in one place.</h3>
                <p class="font-light">Our team works closely with your non-profit to take out the bureaucracy, 
                wait time, and lack of integration, out of housing resource planning by providing this easy-to-use platform.</p>
            </section>
            {/* <div class="container p-4 d-md-flex">
                <form id="contact" class="container" action="https://formspree.io/turtlemaster0828@gmail.com" method="POST">
                    <h2 class="mt-5">Join Email List</h2>
                    <div class="form-group">
                        <input id="emailAddress" type="email" class="form-control" placeholder="Enter email" name="_replyto" aria-label="Name" aria-describedby="basic-addon1"
                            required />
                    </div>
                    <button type="submit" class="btn btn-primary">JOIN</button>
                    <input type="hidden" name="_next" value="/"></input>
                </form>
            </div> */}
            <div class="divider mb-3"></div>

            <section id="calendar">
                <div class="row">
                    <div class="col col-md-3">
                        <h3>A calendar of all calendars.</h3>
                        <p class="font-light">Get a one-glance overview of all your participant’s availabilities and existing 
                        bookings. Our powerful software provides real time updates of interactions so your organization can maximize scheduling and minimize the costs of coordination.
                        </p>
                        <div>
                            <form id="contact" class="container pl-0" action="https://formspree.io/turtlemaster0828@gmail.com" method="POST">
                                <h5>Join our Mailing List</h5>
                                <div class="form-group">
                                    <input id="emailAddress" type="email" class="form-control" placeholder="Enter email" name="_replyto" aria-label="Name" aria-describedby="basic-addon1"
                                        required />
                                </div>
                                <button type="submit" class="btn btn-yellow-fill">Join Now</button>
                                <input type="hidden" name="_next" value="/"></input>
                            </form>
                            {/* <Link to='/signup'>
                                <button class="btn btn-teal-fill">SIGN UP</button>
                            </Link> */}
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
                        <p class="font-light">Our platform makes contacting and verifying bookings easy. 
                        Contact cards show booking dates, host name, host location, guest number, and advocate name. 
                        Customer management relationships for housing advocates has never been more accessible.
                        </p>
                        {/* <Link to='/situation'>
                            <button class="btn btn-teal-fill">SIGN UP</button>
                        </Link> */}
                    </div>
                </div>
            </section>

            <section id="analytics">
                <div class="row">
                    <div class="col col-md-3">
                        <h3>Track your impact.</h3>
                        <p class="font-light pb-2">Starting in 2017, organizations have greater responsibility to 
                        measure impact and demonstrate their need for competitive support or grant programs 
                        from King County. We provide a platform to view your impact and collect data to use when
                        applying to grants.</p>
                        {/* <Link to='/situation'>
                            <button class="btn btn-teal-fill">SIGN UP</button>
                        </Link> */}
                        <div>
                        </div>
                    </div>
                    <div class="col col-md-9">
                        <img src={analytics}></img>
                    </div>
                </div>
            </section>

            <div class="divider mb-3"></div> 

            <div class="container p-4 d-md-flex">
                <form id="contact" class="container" action="https://formspree.io/sharespace.app@gmail.com" method="POST">
                    <h3 class="mt-5">Send Us a Message</h3>
                    <div class="form-group">
                        <label for="email" class="mb-0">
                            Email Address
                            <label class="text-danger">*</label>
                        </label>
                        <input id="emailAddress" type="email" class="form-control" placeholder="Your email" name="_replyto" aria-label="Name" aria-describedby="basic-addon1"
                            required />
                    </div>
                    <div class="form-group">
                        <label for="subject" class="mb-0">
                            Subject
                            <label class="text-danger">*</label>
                        </label>
                        <input type="text" class="form-control" placeholder="Title your message" name="subject" aria-label="Name" aria-describedby="basic-addon1"
                            required></input>
                    </div>
                    <div class="form-group">
                        <label for="comment" class="mb-0">
                            Message
                            <label class="text-danger">*</label>
                        </label>
                        <textarea class="form-control" placeholder="Type your message here" name="comment" rows="5" id="comment" required></textarea>
                    </div>
                    <button type="submit" class="btn btn-teal-fill">Submit</button>
                    <input type="hidden" name="_next" value="/"></input>
                </form>
                </div>
        <div class="divider mb-3"></div>  
            </>
        )
    }
}