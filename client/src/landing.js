import React from "react";
import graphic from 'img/graphics/priscilla-du-preez-972578-unsplash.jpg'

export default class Landing extends React.Component {
    render() {
        return (
            <div class="row" id="what-we-do">
                <div class="col-12 col-md-6">
                    <h3>What we do</h3>
                    <p class="font-light">hearU is a women sponsoring women platform where socially and economically stable women
                        can sponsor, support, and enable women in difficult situations. 
                    </p>
                    <p class="font-light">Through community support, we help them take the first steps towards leaving while
                        developing their social skills, planning skills, and stability to build long term confidence.
                    </p>
                    <p class="font-light">We take out the bureaucracy, wait time, and lack of usability out of resource
                        planning by providing an easy-to-use platform.
                    </p>
                    <button class="btn btn-yellow-fill mt-2">Get Started</button>
                </div>
                <div class="col-12 col-md-6">
                    <img src={graphic}>
                </div> 
            </div>
        )
    }
}