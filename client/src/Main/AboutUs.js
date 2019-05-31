import React from "react";
import logo from '../img/logo-new.png'
import {HashRouter as Link} from "react-router-dom";
import logoLong from '../img/logo-long.png'
import phone from '../img/mobile-phone.jpg'
import fourLadies from '../img/four-ladies.png'
import Abby from '../img/headshots/abby-huang.JPG'
import Steph from '../img/headshots/stephanie-burd.JPG'
import Min from '../img/headshots/min_yang.jpg'
import Mary from '../img/headshots/mary-huibregtse.png'

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
                        <p class="font-light">Sharespace is a online temporary housing platform for your community.
                        </p>
                        <p class="font-light">By working directly with local nonprofits, together we can dynamically share housing 
                        resources for survivors transitioning out of domestically abusive relationships.
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
                        <p class="font-light">We are a team of four women studying Informatics (Information + Technology + People) at the 
                        University of Washington, ready to make an impact with technology. For our culminating senior project, we were given 
                        20 weeks to design and develop a technology solution for a problem we saw in the world.

                        </p>
                        <p class="font-light">Using a build-measure-learn methodology, we committed to create a product that supported our 
                        communities to put an end to the cycle of domestic violence.
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
                            <p class="font-light">Min is passionate in solving real-world problems using technology. Being a Taiwanese-American
                                immigrant, Min advocates for diversity and inclusion for minority groups.</p>
                        </div>
                    </div>
                </div>
            </section>
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