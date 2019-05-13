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
            <div id="situation">
                <header class="d-flex p-5 justify-content-center">
                    <h3 class="font-light">Which situation describes you best?</h3>
                </header>
                <div class="d-flex justify-content-around" >
                    <Link to="/signup" style={{textDecoration: "none", color: "inherit"}}>
                        <div class="card" style={{width: "25rem"}}>
                            <img class="card-img-top" src={cart} />
                            <div class="card-body">
                                <h4>I'm a host</h4>
                                <p class="font-light">I am interested in helping break the cycle of domestic violence
                                by donating resources in the form of cash or giftcards.</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/signup" style={{textDecoration: "none", color: "inherit"}}>
                        <div class="card" style={{width: "25rem"}}>
                            <img class="card-img-top" src={women} />
                            <div class="card-body">
                                <h4>I'm an advocate</h4>
                                <p class="font-light">I am an employee of an organization that helps to support women
                                leaving abusive relationships.</p>
                            </div>
                        </div>
                    </Link>
                    <Link to="/stay" style={{textDecoration: "none", color: "inherit"}}>
                        <div class="card" style={{width: "25rem"}}>
                            <img class="card-img-top" src={connect} />
                            <div class="card-body" >
                                <h4>I need a place to stay</h4>
                                <p class="font-light">I am currently attempting to leave an abusive relationship
                                and need somewhere to stay.</p>
                            </div>
                        </div>
                    </Link> 
                </div>
            </div>           
        )
    }
}