import React from "react";
import cart from "./img/shoppingcart.jpg"
import women from "./img/53-.jpg"
import connect from "./img/Connecting.jpg"
import {BrowserRouter as Router, Route, Link} from "react-router-dom"

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
        return (
            <div>
                <header class="d-flex p-5 justify-content-center">
                    <button type="button" class="btn btn-outline-secondary btn-lg" 
                        style={{position: "absolute", left:"100px"}}>Sign up</button>
                    <h3>Which situation describes you best?</h3>
                </header>
                <div class="d-flex justify-content-around" >
                    <Link to="/stay" style={{textDecoration: "none", color: "inherit"}}>
                        <div class="card" style={{width: "25rem"}}>
                            <img class="card-img-top" src={cart} />
                            <div class="card-body">
                                <h4>I want to donate!</h4>
                            </div>
                        </div>
                    </Link>
                    <Link to="/advocate" style={{textDecoration: "none", color: "inherit"}}>
                        <div class="card" style={{width: "25rem"}}>
                            <img class="card-img-top" src={women} />
                            <div class="card-body">
                                <h4>I'm an advocate!</h4>
                            </div>
                        </div>
                    </Link>
                    <Link to="/stay" style={{textDecoration: "none", color: "inherit"}}>
                        <div class="card" style={{width: "25rem"}}>
                            <img class="card-img-top" src={connect} />
                            <div class="card-body" >
                                <h4>I need a place to stay!</h4>
                            </div>
                        </div>
                    </Link> 
                </div>
            </div>           
        )
    }
}