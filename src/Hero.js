import React from "react";
import hero from "./img/graphics/layingingdasies.jpg"
export default class Hero extends React.Component {
    render() {
        return (
            <section class="mb-3" id="section-1">
                <div id="slogan">
                    <h2>Introducing hearU</h2>
                    <h4 class="font-light">Supporting women leaving abusive relationships</h4>
                    <button class="btn btn-yellow-fill mt-2">Get Started</button>
                </div>
                <img src={hero} />
            </section>
        )
    }
}