import React, { Component } from 'react';
import women from "./img/53-.jpg"

export default class Organization extends React.Component {
    render() {
        return (
            <div>
                <div class="card" style={{width: "25rem"}}>
                    <img class="card-img-top" src={women} />
                    <div class="card-body">
                        <h4>I'm an advocate!</h4>
                    </div>
                </div>
            </div>       
        )
    }
}