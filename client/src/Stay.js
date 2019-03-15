import React, { Component } from 'react';
import connect from "./img/Connecting.jpg"
import Select from 'react-select'
import Animated from 'react-select/lib/animated'
import chaya from "./img/apichaya.png"
import info from './img/iSchool.png';
import mary from './img/marysplace.png';
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
            <div>
                {   !this.state.next && 
                    <div class="d-flex justify-content-around p-5" style={{padding: "20px"}}>
                    <div class="card" style={{width: "30rem"}}>
                        <img class="card-img-top" src={connect}></img>
                        <div class="card-body">
                            <h5>I need a place to stay</h5>
                        </div>
                    </div>
                    <div style={{width: window.screen.availWidth / 2}}>
                        <div class="d-flex align-items-center p-5">
                            <h5>Preferred neighborhood</h5> 
                            <div style={{paddingLeft: "20px", width: "500px"}}>                               
                                <Select
                                    closeMenuOnSelect={false}
                                    components={Animated()}
                                    isMulti
                                    options={options}
                                />
                            </div>
                        </div>
                        <h4>I'm concerned about...</h4>
                        <div class="d-flex justify-content-center align-items-end p-3" >
                            <div id="type1" class="card m-3" 
                            style={{width: "10rem", cursor: "pointer"}}
                            onClick={this.handleClick}>
                                <img class="card-img-top" src={connect}></img>
                                <div class="card-body" style={{fontSize: "20px"}}>
                                    Type
                                </div>
                            </div>
                            <div id="type2" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={connect}></img>
                                <div class="card-body" style={{fontSize: "20px"}}>
                                    Type
                                </div>
                            </div>
                            <div id="type3" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={connect}></img>
                                <div class="card-body" style={{fontSize: "20px"}}>
                                    Type
                                </div>
                            </div>
                            <div id="type4" class="card m-3" style={{width: "10rem", cursor: "pointer"}}
                                onClick={this.handleClick}>
                                <img class="card-img-top" src={connect}></img>
                                <div class="card-body" style={{fontSize: "20px"}}>
                                    Type
                                </div>
                            </div>                                 
                        </div> 
                        {/* <Link to="/organization" onClick={this.handleNext}>
                            Next
                        </Link> */}
                        <button type="button" class="btn btn-primary" onClick={this.handleNext} >
                            Next
                        </button> 
                    </div>
                </div>  
            }               
            {
                this.state.next && 
                <div class="m-5">
                    <h2 class="m-5">Here are your neighborhood organizations</h2>
                    <div class="d-flex justify-content-around">
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mt-4" src={chaya}
                            style={{width: '10rem', position: "relative", left: "3rem"}}/>
                            <div class="card-body">
                                <h4>Advocate Name</h4>
                                organization@org.com   
                                +1(206) 123-4567
                            </div>
                        </div>
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mt-4" src={info} 
                            style={{width: '8rem', position: "relative", left: "3rem"}}/>
                            <div class="card-body">
                                <h4>Advocate Name</h4>
                                organization@org.com
                                +1(206) 123-4567
                            </div>
                        </div>
                        <div class="card" style={{width: "15rem"}}>
                            <img class="card-img-top mb-4 mt-5 p-2" src={mary}/>
                            <div class="card-body">
                                <h4>Advocate Name</h4>
                                organization@org.com
                                +1(206) 123-4567
                            </div>
                        </div>
                    </div>
                </div>    
            }
            </div>
        )
    }
}