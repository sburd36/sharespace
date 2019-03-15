import React from "react";
import  CustomizedInputs  from "./material/Input"
import Button from '@material-ui/core/Button';

export default class Login extends React.Component {
    render() {
        return (
            <div>
                <CustomizedInputs>
                </CustomizedInputs>
                <CustomizedInputs>
                </CustomizedInputs>
                <button type="button" class="btn btn-primary">LOG IN</button>
            </div>
        )
    }
}

