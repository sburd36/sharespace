import React from "react";
import graphic1 from '../img/landing-graphic1.png'
import logoLong from '../img/logo-long.png'
import graphic2 from '../img/section2-graphic.png'
import shopping from '../img/shoppingcart.jpg'
import group from '../img/53-.jpg'
import connect from '../img/Connecting.jpg'
import APIChaya from '../img/apichaya.png'
import iSchool from '../img/iSchool.png'
import MarysPlace from '../img/marysplace.png'
import Pastry from '../img/pastry.jpg'
import { Link } from 'react-router-dom'

export default class Landing extends React.Component {
    render() {
        return (
            <>
                <section id="section-1">
                    <div class="row" id="what-we-do">
                        <div class="col-12 col-md-6">
                            <img class="logo-img" src={logoLong}></img>
                            <h3>Share your space for good.</h3>
                            <p class="font-light pb-1">Sharespace is a online temporary housing platform for your community. 
                            By working directly with local nonprofits, together we can dynamically share housing resources
                            for survivors transitioning out of domestically abusive relationships.
                            </p>
                            <p class="font-light pb-1">Our team works closely with your nonprofit to take out the bureaucracy,
                            wait time, and lack of integration, out of housing resource planning by providing this easy-to-use 
                            platform to dynamically find and book spaces for those who need it..
                            </p>
                            <p class="font-light">Consider opening up your home today.
                            </p>
                            <Link to='/ourtool'>
                                <button class="btn btn-yellow-empty mt-2 mr-4">LEARN MORE</button>
                            </Link>
                            <Link to='/situation'>
                                <button class="btn btn-teal-empty mt-2">SIGN UP</button>
                            </Link>
                        </div>
                        <div class="col-12 col-md-6">
                            <img src={graphic1}/>
                        </div> 
                    </div>
                </section>
                    
                <div class="divider mb-3"></div>
                
                <section id="section-2"> 
                        <div>
                            <h4> <span style={{color: "#7e95cd"}}>We all face unexpected situations.</span> For millions of women, it means having to leave their home.</h4>
                            <p class="font-light">Emergency shelter and transitional housing continue to be
                            the most urgent unmet needs for domestic violence survivors. It is becoming more
                            necessary coordinate our resources so that more people
                            can stay off the streets and avoid longer term consequences like debt and homelessness.</p>
                        </div>
                        <img src={graphic2}></img>
                </section>

                <div class="divider mb-3"></div>

                <section id="section-3">
                    <h3>How can you help</h3>
                    <div class="mt-4 row row-cards ml-0">
                        <div class="card col col-12 col-md-4 d-flex">
                            <img src={shopping} class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Refer community members to host with a local organization.</h5>
                                <p class="card-text font-light">You know your community best. With the help of cloud technology,
                                Sharespace can effectively connect hosts with nonprofits’ calendars in real time to ensure 
                                housing availability is an option for those who need it.
                                </p>
                            </div>
                        </div>
                        <div class="card col col-12 col-md-4 d-flex">
                            <img src={group} class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Connect surviors with us or a local organization.</h5>
                                <p class="card-text font-light">Survivors turn to their friends and family first, but
                                sometimes it's better to get them the special support they really need. Sharespace works closely with 
                                local nonprofits and organizers to to find affordable and safe housing. 
                                </p>
                            </div>
                        </div>
                        <div class="card col col-12 col-md-4 d-flex">
                            <img src={connect} class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Share your home with people on the road
                                to independence.</h5>
                                <p class="card-text font-light">Anything helps. Whether you have an extra bed, 
                                a guest home that lays empty some nights, or an Airbnb listing that you’d like 
                                to do more with, your space can become a meaningful experience and a way to give back to your community.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <div class="divider mb-3"></div>

                <section id="section-4">
                    <div class="row">
                        <div class="col col-12 col-md-6">
                            <h4>Who we work with</h4>
                            <p class="font-light">We're always looking to learn from experts in the causes we support. That's why we've partnered with organizations,
                                both global and local, to truly understand the communities we serve and how to best help them. These registered
                                nonprofits user Open Homes to find accomodations for their clients and help provide support for hosts during a stay.
                            </p>
                            <div class="row">
                                <img class="col-3" src={iSchool}></img>
                                <div class="col-9">
                                    <h5>University of Washington Information School</h5>
                                    <p class="font-light">Lorem Ipsum</p>
                                </div>
                            </div>

                            <div class="row">
                                <img class="col-3" src={APIChaya}></img>
                                <div class="col-9">
                                    <h5>API Chaya</h5>
                                    <p class="font-light">Lorem Ipsum</p>
                                </div>
                            </div>

                            <div class="row">
                                <img class="col-3" src={MarysPlace}></img>
                                <div class="col-9">
                                    <h5>Mary's Place</h5>
                                    <p class="font-light">Lorem Ipsum</p>
                                </div>
                            </div>

                        </div>
                        <div class="col col-12 col-md-6">
                            <h4>How we support you</h4>
                            <p class="font-light">We understand this can sound like a lot to sign up for. That’s why
                            Sharespace will be there to offer support and resources every step of the way.</p>
                            <div class="row support-cards">
                                <div class="card col col-12 col-md-6 d-flex">
                                    <img class="card-img-top" alt="..." src={Pastry}/>
                                    <div class="card-body">
                                        <p class="card-title">Screenings and Checks</p>
                                        <p class="card-text font-light">Background checks will be conducted on guests and local 
                                        organizations are vetted before joining our platform. All must meet safety qualifications 
                                        before being considered for a homestay.
                                        </p>
                                    </div>
                                </div>
                                <div class="card col col-12 col-md-6 d-flex">
                                    <img class="card-img-top" alt="..." src={Pastry}/>
                                    <div class="card-body">
                                        <p class="card-title">Connecting with an Advocate</p>
                                        <p class="card-text font-light">Before any stay, advocates from the local organization we 
                                        partner with will personally handle the booking, communications, needs-assessment, and 
                                        cultural preferences matching to ensure the right pairing.
                                        </p>
                                    </div>
                                </div>
                                <div class="card col col-12 col-md-6 d-flex">
                                    <img class="card-img-top" alt="..." src={Pastry}/>
                                    <div class="card-body">
                                        <p class="card-title">Routine Evaluations</p>
                                        <p class="card-text font-light">We’re constantly building, integrating, and improving our 
                                        platform. Hosts and organizations make this level of impact possible, so it's our priority 
                                        to make sure your needs are met and tackle issues as they arise.
                                        </p>
                                    </div>
                                </div>
                                <div class="card col col-12 col-md-6 d-flex">
                                    <img class="card-img-top" alt="..." src={Pastry}/>
                                    <div class="card-body">
                                        <p class="card-title">Online Support and Resources</p>
                                        <p class="card-text font-light">We have your back. Our platform supports a 24/7 chat service that is 
                                        available to you, in addition to the local organization leader who will be your main point of contact. 
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section id="section-5" class="pink-background">
                    <h1>Join your community to give back in a more meaningful way. Let's help end the cycle of domestic violence.</h1>
                    <Link to='/signup'>
                        <button class="btn btn-white-fill mt-2">SIGN UP</button>
                    </Link>
                </section>

                {/* <section id="section-6">
                    <h4 class="font-light">Have questions?</h4>
                    <h4 class="font-light">Contact our team at <a href="mailto:hearu.info@gmail.com">hearu.info@gmail.com</a> or find a local organization near you.</h4>
                </section> */}
            </>
        )
    }
}