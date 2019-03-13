import React, { Component } from 'react';
import connect from "./img/Connecting.jpg"
import Select from 'react-select'
import Animated from 'react-select/lib/animated'

export default class Stay extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            choice: []
        }
    }

    // handleClick () => {
            
    // }

    render() {
        const options = [
            { value: 'U-District', label: 'U-District' },
            { value: 'Roosevelt', label: 'Roosevelt' },
            { value: 'Northgate', label: 'Northgate' }
        ];
        return (
            <div class="d-flex justify-content-around p-5" style={{padding: "20px"}}>
                <div class="card" style={{width: "25rem"}}>
                    <img class="card-img-top" src={connect}></img>
                    <div class="card-body">
                        <h5>Type</h5>
                    </div>
                </div>
                <div style={{width: window.screen.availWidth / 2}}>
                    <div class="d-flex align-items-center p-5">
                        Preferred neighborhood 
                        <div style={{paddingLeft: "20px", width: "500px"}}>                               
                            <Select
                                closeMenuOnSelect={false}
                                components={Animated()}
                                isMulti
                                options={options}
                            />
                        </div>
                    </div>
                    I'm concerned about...
                    <div id="type-cards" class="d-flex justify-content-around align-items-end p-3" >
                        <div id="type-card" class="card" 
                        style={{width: "10rem", height: "10rem", cursor: "pointer"}}
                        onClick={() => this.setState({choice: this.state.choice.push()})}>
                            <img class="card-img-top" src={connect}></img>
                            <div class="card-body">
                                <h5>Type</h5>
                            </div>
                        </div>
                        <div id="type-card" class="card" style={{width: "10rem", height: "10rem"}}>
                            <img class="card-img-top" src={connect}></img>
                            <div class="card-body">
                                <h5>Type</h5>
                            </div>
                        </div>
                        <div id="type-card" class="card" style={{width: "10rem", height: "10rem"}}>
                            <img class="card-img-top" src={connect}></img>
                            <div class="card-body">
                                <h5>Type</h5>
                            </div>
                        </div>
                        <div id="type-card" class="card" style={{width: "10rem", height: "10rem"}}>
                            <img class="card-img-top" src={connect}></img>
                            <div class="card-body">
                                <h5>Type</h5>
                            </div>
                        </div>                                 
                    </div> 
                    <button type="button" class="btn btn-primary" style={{position: "absolute", right: "60px"}}>Next</button>
                </div>
            </div>        
        )
    }
}