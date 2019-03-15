import React from "react";
import graphic1 from './img/landing-graphic1.png'
import logoLong from './img/logo-long.png'
import graphic2 from './img/section2-graphic.png'
import shopping from './img/shoppingcart.jpg'
import group from './img/53-.jpg'
import connect from './img/Connecting.jpg'
import APIChaya from './img/apichaya.png'
import iSchool from './img/iSchool.png'
import MarysPlace from './img/marysplace.png'
import Pastry from './img/pastry.jpg'
import { Link } from 'react-router-dom'

export default class Landing extends React.Component {
    render() {
        return (
            <>
                <section id="section-1">
                    <div class="row" id="what-we-do">
                        <div class="col-12 col-md-6">
                            <img class="logo-img" src={logoLong}></img>
                            <h2>Share your space for good.</h2>
                            <p class="font-light">Sharespace is a women sponsoring women platform where socially and economically stable women
                                can sponsor, support, and enable women in difficult situations. 
                            </p>
                            <p class="font-light">Through community support, we help them take the first steps towards leaving while
                                developing their social skills, planning skills, and stability to build long term confidence.
                            </p>
                            <p class="font-light">We take out the bureaucracy, wait time, and lack of usability out of resource
                                planning by providing an easy-to-use platform.
                            </p>
                            <Link to='/ourtool'>
                                <button class="btn btn-yellow-empty mt-2 mr-4">LEARN MORE</button>
                            </Link>
                            <Link to='/signup'>
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
                            <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
                                Sed nec elementum mi, eu laoreet libero. Sed lacus neque, cursus ut elit ac, rutrum mollis libero.</p>
                        </div>
                        <img src={graphic2}></img>
                </section>

                <div class="divider mb-3"></div>

                <section id="section-3">
                    <h3>How you can help</h3>
                    <div class="mt-4 row row-cards ml-0">
                        <div class="card col col-12 col-md-4 d-flex">
                            <img src={shopping} class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Refer community members to host with a local organization.</h5>
                                <p class="card-text font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
                                Sed nec elementum mi, eu laoreet libero. Sed lacus neque, cursus ut elit ac, rutrum mollis libero.
                                </p>
                            </div>
                        </div>
                        <div class="card col col-12 col-md-4 d-flex">
                            <img src={group} class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Connect surviors with us or a local organization.</h5>
                                <p class="card-text font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
                                Sed nec elementum mi, eu laoreet libero. Sed lacus neque, cursus ut elit ac, rutrum mollis libero.
                                </p>
                            </div>
                        </div>
                        <div class="card col col-12 col-md-4 d-flex">
                            <img src={connect} class="card-img-top" alt="..."/>
                            <div class="card-body">
                                <h5 class="card-title">Share your home with people on the road
                                to independence.</h5>
                                <p class="card-text font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
                                Sed nec elementum mi, eu laoreet libero. Sed lacus neque, cursus ut elit ac, rutrum mollis libero.
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
                            <p class="font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                Aenean velnisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.</p>
                            <div class="row support-cards">
                                <div class="card col col-12 col-md-6 d-flex">
                                    <img class="card-img-top" alt="..." src={Pastry}/>
                                    <div class="card-body">
                                        <p class="card-title">Lorem Ipsum</p>
                                        <p class="card-text font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                        Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
                                        </p>
                                    </div>
                                </div>
                                <div class="card col col-12 col-md-6 d-flex">
                                    <img class="card-img-top" alt="..." src={Pastry}/>
                                    <div class="card-body">
                                        <p class="card-title">Lorem Ipsum</p>
                                        <p class="card-text font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                        Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
                                        </p>
                                    </div>
                                </div>
                                <div class="card col col-12 col-md-6 d-flex">
                                    <img class="card-img-top" alt="..." src={Pastry}/>
                                    <div class="card-body">
                                        <p class="card-title">Lorem Ipsum</p>
                                        <p class="card-text font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                        Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
                                        </p>
                                    </div>
                                </div>
                                <div class="card col col-12 col-md-6 d-flex">
                                    <img class="card-img-top" alt="..." src={Pastry}/>
                                    <div class="card-body">
                                        <p class="card-title">Lorem Ipsum</p>
                                        <p class="card-text font-light">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce hendrerit ac nisi sit amet mollis.
                                        Aenean vel nisl justo. Mauris in ante quis sem convallis suscipit. Aenean at gravida ipsum.
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