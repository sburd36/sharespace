import React, { Component } from 'react';
import connect from "./img/need-help.png"
import Select from 'react-select'
import Animated from 'react-select/lib/animated'
import chaya from "./img/apichaya.png"
import YWCA from './img/YWCA.png';
import mary from './img/marysplace.png';
import physical from './img/physical-safety.jpg'
import mental from './img/mental-health.jpg'
import children from './img/children.jpg'
import finances from './img/finances.jpg'

import {BrowserRouter as Router, Route, Link} from "react-router-dom"

export default class Stay extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            next: false
        }
    }

    handleClick = (e) => {
        var elem = e.target.parentNode
        if (elem.style['background-color'] == 'rgb(233, 133, 133)') {
            elem.setAttribute("style", "background-color: none; width: 10rem; cursor: pointer;")
        } else {
            elem.setAttribute("style", "background-color: #E98585; width: 10rem; cursor: pointer;")
        }
    }

    handleNext = () => {
        this.setState({
            next: true
        })
        console.log("hellow")
    }

    render() {
        const options = [
            { value: 'U-District', label: 'U-District' },
            { value: 'Roosevelt', label: 'Roosevelt' },
            { value: 'Northgate', label: 'Northgate' },
            { value: 'Downtown', label: 'Downtown' },
            { value: 'Bellevue', label: 'Bellevue' }
        ];
        console.log(this.state.next)

        return ( 
            <div id="place-to-stay">
                {   !this.state.next && 
                    <>
                    <Link to='/situation'>
                        <h4 class="back-button ml-0">&#60;  BACK</h4>
                    </Link>
                    <div class="d-flex justify-content-around" style={{padding: "20px"}}>
                    <div class="card">
                        <img class="card-img-top" src={connect}></img>
                        <div class="card-body">
                            <h5 class="font-light">I need a place to stay</h5>
                        </div>
                    </div>
                    <div style={{width: window.screen.availWidth / 2}}>
                        <div class="d-flex align-items-center mb-5">
                            <p class="mb-0 font-light mr-2">Preferred neighborhood</p> 
                            <div style={{width: "500px", fontWeight: 300}}>                               
                                <Select
                                    closeMenuOnSelect={false}
                                    components={Animated()}
                                    isMulti
                                    options={options}
                                />
                            </div>
                        </div>
                        <h4 class="font-light">I'm concerned about...</h4>
                        <div class="row d-flex justify-content-center align-items-end p-3 concerns" >
                            <div id="type1" class="card m-3" 
                            style={{width: "10rem", cursor: "pointer"}}
                            onClick={this.handleClick}>
                                <img class="card-img-top" src={physical}></img>
                                <div class="card-body">
                                    Physical Safety
                                </div>
                            </div>
                            <div id="type2" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={mental}></img>
                                <div class="card-body">
                                    Mental Health
                                </div>
                            </div>
                            <div id="type3" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={finances}></img>
                                <div class="card-body">
                                    Finances
                                </div>
                            </div>
                            <div id="type4" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={children}></img>
                                <div class="card-body">
                                    Children
                                </div>
                            </div>
                            {/* <div id="type5" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={children}></img>
                                <div class="card-body">
                                    Lorem Ipsum
                                </div>
                            </div>                                  */}
                        </div> 
                        {/* <Link to="/organization" onClick={this.handleNext}>
                            Next
                        </Link> */}
                        <button class="btn btn-teal-fill" onClick={this.handleNext} >
                            Next
                        </button> 
                    </div>
                </div>  
                </>
            }               
            {
                this.state.next && 
                <div class="m-5 orgs">
                    <h3 class="m-5 font-light">Here are some of your neighborhood organizations:</h3>
                    <div class="d-flex justify-content-around">
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mt-4 pt-4 pb-4" src={chaya}
                            style={{width: '10rem'}}/>
                            <div class="card-body">
                                <a href="www.apichaya.org">apichaya.org</a>
                                <p><a href="mailto:info@apichaya.org">info@apichaya.org</a></p>
                                <p>+1 (206)467-9976</p>
                            </div>
                        </div>
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mt-4 pt-5 pb-5" src={YWCA} 
                            style={{width: '8rem'}}/>
                            <div class="card-body">
                                <a href="https://www.ywcaworks.org/programs/domestic-violence-shelter">www.ywcaworks.org</a>
                                <p><a href="https://www.addthis.com/tellfriend_v2.php?v=300&winname=addthis&pub=ra-5a036112896ccb76&source=smlsh-1.0&lng=en&s=email&wid=l99z&url=https%3A%2F%2Fwww.ywcaworks.org%2F&title=YWCA%20Seattle%20King%20Snohomish%20Empowering%20Women&ate=AT-ra-5a036112896ccb76/-/-/5cf1d8bfac2686ea/3&uid=5c51ff89096a4271&uud=1&ct=1&ui_email_to=&ui_email_from=&ui_email_note=&pre=https%3A%2F%2Fwww.ywcaworks.org%2Fcontact-us&tt=0&captcha_provider=recaptcha2&pro=1&ats=imp_url%3D0%26smd%3Drsi%253D%2526gen%253D0%2526rsc%253D%2526dr%253Dhttps%25253A%25252F%25252Fwww.ywcaworks.org%25252Fcontact-us%2526sta%253DAT-ra-5a036112896ccb76%25252F-%25252F-%25252F5cf1d8bfac2686ea%25252F1%26hideEmailSharingConfirmation%3Dfalse%26service%3Demail%26media%3Dundefined%26description%3Dundefined%26passthrough%3Dundefined%26email_template%3Dundefined%26email_vars%3Dundefined&atc=username%3Dra-5a036112896ccb76%26services_exclude%3D%26services_exclude_natural%3D%26services_compact%3Dfacebook%252Ctwitter%252Cprint%252Cemail%252Cpinterest_share%252Cgmail%252Clinkedin%252Cmailto%252Ctumblr%252Cmessenger%252Cmore%26product%3Dsmlsh-1.0%26widgetId%3Dl99z%26pubid%3Dra-5a036112896ccb76%26ui_pane%3Demail&rb=true">Contact via Email</a></p>
                                <p>+1 (206)461-4882</p>
                            </div>
                        </div>
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mb-4 mt-5 p-2 pb-5 pt-5" src={mary}/>
                            <div class="card-body">
                                <a href="www.marysplaceseattle.org">marysplaceseattle.org</a>
                                <p><a href="mailto:info@marysplaceseattle.org">info@marysplaceseattle.org</a></p>
                                <p>+1 (206)621-8474</p>
                            </div>
                        </div>
                    </div>
                </div>    
            }
            </div>
        )
    }
}