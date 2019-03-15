import React from "react";
import logo from './img/logo-new.png'
import {HashRouter as Link} from "react-router-dom";
import hero from "./img/dash.png"
import monthView from "./img/month-view.png"
import hostDisplay from "./img/host-display.png"
import analytics from "./img/analytics.png"

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
                <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                    Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.</p>
            </section>

            <div class="divider mb-3"></div>

            <section id="calendar">
                <div class="row">
                    <div class="col col-md-3">
                        <h3>A calendar of all calendars.</h3>
                        <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                        Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.</p>
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
                        <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                        Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.</p>
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