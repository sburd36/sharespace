import React from "react";
import logo from './img/logo-new.png'
import {HashRouter as Link} from "react-router-dom";
import logoLong from './img/logo-long.png'
import phone from './img/mobile-phone.jpg'
import fourLadies from './img/four-ladies.png'
import Abby from './img/headshots/abby-huang.JPG'
import Steph from './img/headshots/stephanie-burd.JPG'
import Min from './img/headshots/min_yang.jpg'
import Mary from './img/headshots/mary-huibregtse.png'

export default class Nav extends React.Component {
    // constructor(props) {
    //     super(props);
    // }
    render() {
        return (
            <>
            <section id="what-is-sharespace">
                <div class="row">
                    <div class="col col-12 col-md-6">
                        <h2 style={{color: "#f9c1b3"}}>What is <span><img class="logo-long" src={logoLong}></img></span> ?</h2>
                        <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                        Aenean velnisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
                        </p>
                        <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                        Aenean velnisl justo.
                        </p>
                        <button class="btn btn-teal-fill">LEARN MORE</button>
                    </div>
                    <div class="col col-12 col-md-6">
                        <img src={phone} class="phone-img"></img>
                    </div>
                </div>
            </section>

            <div class="divider mb-3"></div>

            <section id="who-are-we">
                <div class="row">
                    <div class="col col-12 col-md-6">
                        <h3 class="font-light">Who are we?</h3>
                        <p class="font-light">We are a team of four women at the University of Washington passionate about making an impact.
                        For our culminating senior project, we were given the opporunity to... Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                        </p>
                        <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                        Aenean velnisl justo.
                        </p>
                    </div>
                    <div class="col col-12 col-md-6">
                        <img src={fourLadies}></img>
                    </div>
                </div>
            </section>

            <section class="pink-background">
                <h1>We made it our mission to use this opportunity to make a difference.</h1>
            </section>

            <section id="meet-the-team">
                <h3 class="font-light">Meet the Team</h3>
                <p class="font-light team-desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                            Aenean velnisl justo.
                </p>
                <div class="row team-row">
                    <div class="row team-member col-xl-6 col-md-12 p-0 mr-0 ml-0">
                        <img src={Abby} class="team-img col-md-6 col-12"/>
                        <div class="col-md-6 col-12">
                            <h5 class="">Abby Huang</h5>
                            <p id="position">Project Manager</p>
                            <p class="font-light">A Seattle native, Abby is an active advocate for
                                immigration law, POC in politics, closing the gender gap, LGBTQ allyship,
                                and reducing barriers to entry in entrepreneurship.</p>
                        </div>
                    </div>
                    <div class="row team-member col-xl-6 col-md-12  p-0 mr-0 ml-0">
                        <img src={Steph} class="team-img col-md-6 col-12"/>
                        <div class="col-md-6 col-12">
                            <h5 class="">Stephanie Burd</h5>
                            <p id="position">Lead Designer</p>
                            <p class="font-light">Stephanie is interested in women’s empowerment, specifically in the technology space. 
                                She focuses on social psychology and the impact of technology on people and society.</p>
                        </div>
                    </div>
                    <div class="row team-member col-xl-6 col-md-12  p-0 mr-0 ml-0">
                        <img src={Mary} class="team-img col-md-6 col-12"/>
                        <div class="col-md-6 col-12">   
                            <h5 class="">Mary Huibregtse</h5>
                            <p id="position">Lead Data Scientist</p>
                            <p class="font-light">After leaving an abusive relationship, Mary experienced the power having a community
                                can have in making action possible. Since, she has been supporting young students by hosting 
                                STEM workshops mentoring.</p>
                        </div>
                    </div>
                    <div class="row team-member col-xl-6 col-md-12  p-0 mr-0 ml-0">
                        <img src={Min} class="team-img col-md-6 col-12"/>
                        <div class="col-md-6 col-12">
                            <h5 class="">Min Yang</h5>
                            <p id="position">Lead Developer</p>
                            <p class="font-light">Min is passionate in solving real-world problems using technology. Begin a Taiwanese-American
                                immigrant, Min advocates for diversity and inclusion for minority groups.</p>
                        </div>
                    </div>
                </div>
            </section>
        <div class="divider mb-3"></div>
            </>
        )
    }
}