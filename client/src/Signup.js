import React from "react";
import cart from "./img/shoppingcart.jpg"
import women from "./img/53-.jpg"
import connect from "./img/Connecting.jpg"
import Select from 'react-select'
// import {BrowserRouter as Router, Route, Link} from "react-router-dom"

export default class Signup extends React.Component {
    constructor(props) {
        super(props) 
        this.state = {
            choice: "all",
            selectedOption: null
        }
    }
    
    handleChange = (selectedOption) => {
        this.setState({ selectedOption });
        console.log(`Option selected:`, selectedOption);
    }

    render() {
        const options = [
            { value: 'chocolate', label: 'Chocolate' },
            { value: 'strawberry', label: 'Strawberry' },
            { value: 'vanilla', label: 'Vanilla' }
        ];
        return (
                <div>
                    {/* { this.state.choice === "all" &&
                        <div>
                            <header class="d-flex p-5 justify-content-center">
                                <button type="button" class="btn btn-outline-secondary btn-lg" 
                                    style={{position: "absolute", left:"100px"}}>Sign up</button>
                                <h3>Which situation describes you best?</h3>
                            </header>
                            <div class="d-flex justify-content-around" >
                                <a href="#" onClick={() => this.setState({choice: "place"})}
                                    style={{textDecoration: "none", color: "inherit"}}>
                                    <div class="card" style={{width: "25rem"}}>
                                        <img class="card-img-top" src={cart} />
                                        <div class="card-body">
                                            <h5>I want to donate!</h5>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" onClick={() => this.setState({choice: "place"})}
                                    style={{textDecoration: "none", color: "inherit"}}>
                                    <div class="card" style={{width: "25rem"}}>
                                        <img class="card-img-top" src={women} />
                                        <div class="card-body">
                                            <h5>I'm an advocate!</h5>
                                        </div>
                                    </div>
                                </a>
                                <a href="#" onClick={() => this.setState({choice: "place"})} 
                                    style={{textDecoration: "none", color: "inherit"}}>                    
                                    <div class="card" style={{width: "25rem"}}>
                                        <img class="card-img-top" src={connect} />
                                        <div class="card-body" >
                                            <h5>I need a place to stay!</h5>
                                        </div>
                                    </div>
                                </a>
                            </div>
                        </div>
                    }
                    {
                        this.state.choice === "place" &&  */}
                        <div class="d-flex justify-content-around" style={{padding: "20px"}}>
                            <div class="card" style={{width: "25rem"}}>
                                <img class="card-img-top" src={connect}></img>
                                <div class="card-body">
                                    <h5>Type</h5>
                                </div>
                            </div>
                            <div>
                                Preferred neighborhood 
                                <Select
                                    
                                    options={options}
                                />
                                <div class="d-flex justify-content-around align-items-end ">
                                    <div class="card" style={{width: "10rem", height: "10rem"}}>
                                        <img class="card-img-top" src={connect}></img>
                                        <div class="card-body">
                                            <h5>Type</h5>
                                        </div>
                                    </div>
                                    <div class="card" style={{width: "10rem", height: "10rem"}}>
                                        <img class="card-img-top" src={connect}></img>
                                        <div class="card-body">
                                            <h5>Type</h5>
                                        </div>
                                    </div>
                                    <div class="card" style={{width: "10rem", height: "10rem"}}>
                                        <img class="card-img-top" src={connect}></img>
                                        <div class="card-body">
                                            <h5>Type</h5>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>            
                </div>
        )
    }
}