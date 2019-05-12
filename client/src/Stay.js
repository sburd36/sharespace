import React, { Component } from 'react';
import connect from "./img/Connecting.jpg"
import Select from 'react-select'
import Animated from 'react-select/lib/animated'
import chaya from "./img/apichaya.png"
import info from './img/iSchool.png';
import mary from './img/marysplace.png';
import physical from './img/physical-safety.jpg'
import mental from './img/mental-health.jpg'
import children from './img/children.jpg'
import finances from './img/finances.jpg'
import { withFirebase } from './Firebase';
import { compose } from 'recompose';
import {BrowserRouter as Link, withRouter} from "react-router-dom"
const INITIAL_STATE = {
    next: false,
    physicalSaftey: false, 
    mentalHealth: false, 
    finances: false, 
    children: false  
}
class Stay extends React.Component {
    constructor(props) {
        super(props) 
        this.state = { INITIAL_STATE}
    }

    handleClick = (e) => {
        var elem = e.target.parentNode;
        this.setState({ [e.target.name]: !this.props.state });
        console.log(this.props.state)
        if (elem.style['background-color'] == 'rgb(233, 133, 133)') {
            elem.setAttribute("style", "background-color: none; width: 10rem; cursor: pointer;")
        } else {
            elem.setAttribute("style", "background-color: #E98585; width: 10rem; cursor: pointer;")
        }
    }

    handleNext = () => {
        const { physicalSaftey, mentalSaftey,finances, children } = this.state
        console.log(physicalSaftey)
        this.props.firebase.survivors({
            physicalSaftey,
            mentalSaftey,
            finances,
            children
        })
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
                    <Link to='/signup'>
                        <h4 class="back-button">BACK</h4>
                    </Link>
                    <div class="d-flex justify-content-around" style={{padding: "20px"}}>
                    <div class="card" style={{width: "30rem"}}>
                        <img class="card-img-top" src={connect}></img>
                        <div class="card-body">
                            <h4 class="font-light">I need a place to stay</h4>
                        </div>
                    </div>
                    <div style={{width: window.screen.availWidth / 2}}>
                        <div class="d-flex align-items-center mb-5">
                            <p class="mb-0">Preferred neighborhood</p> 
                            <div style={{paddingLeft: "20px", width: "500px"}}>                               
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
                            <div id="type1" class="card m-3" name="physicalSaftey"
                            style={{width: "10rem", cursor: "pointer"}} 
                            onClick={this.handleClick}>
                                <img class="card-img-top" src={physical}></img>
                                <div class="card-body" >
                                    Physical Safety
                                </div>
                            </div>
                            <div id="type2" name="mentalHealth" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={mental}></img>
                                <div class="card-body">
                                    Mental Health
                                </div>
                            </div>
                            <div id="type3" name="finances" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={finances}></img>
                                <div class="card-body">
                                    Finances
                                </div>
                            </div>
                            <div id="type4" name="children" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={children}></img>
                                <div class="card-body">
                                    Children
                                </div>
                            </div>
                            <div id="type5" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={children}></img>
                                <div class="card-body">
                                    Lorem Ipsum
                                </div>
                            </div>                                 
                        </div> 
                        {/* <Link to="/organization" onClick={this.handleNext}>
                            Next
                        </Link> */}
                        <button type="button" class="btn btn-teal-fill" onClick={this.handleNext} >
                            NEXT
                        </button> 
                    </div>
                </div>  
                </>
            }               
            {
                this.state.next && 
                <div class="m-5 orgs">
                    <h3 class="m-5 font-light">Here are your neighborhood organizations</h3>
                    <div class="d-flex justify-content-around">
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mt-4" src={chaya}
                            style={{width: '10rem', position: "relative", left: "3rem"}}/>
                            <div class="card-body">
                                {/* <h4>API Chaya</h4> */}
                                <a href="www.apichaya.org">apichaya.org</a>
                                <p><a href="mailto:info@apichaya.org">info@apichaya.org</a></p>
                                <p>+1 (206)467-9976</p>
                            </div>
                        </div>
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mt-4" src={info} 
                            style={{width: '8rem', position: "relative", left: "3rem"}}/>
                            <div class="card-body">
                                {/* <h4>Information School</h4> */}
                                <a href="www.apichaya.org">Website</a>
                                <p><a href="mailto:info@apichaya.org">info@apichaya.org</a></p>
                                <p>+1 (206)467-9976</p>
                            </div>
                        </div>
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mb-4 mt-5 p-2" src={mary}/>
                            <div class="card-body">
                                {/* <h4>Mary's Place</h4> */}
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
const StayData = compose(
    withRouter,
    withFirebase,
  )(Stay);
  
  
  export default StayData;