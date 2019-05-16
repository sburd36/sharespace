import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';

// import Map from './Map'
// For host pop-up
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';


const styles = theme => ({
    img: {
        height: '700px',
    },
    contact: {
        width: '600px'
    },
    button: {
        margin: theme.spacing.unit,
    },
    filter: {
        margin: theme.spacing.unit,
    },
    textField: {
        marginTop: theme.spacing.unit * 3,
        marginBottom: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 2,
        width: 200,
    },
    input: {
        border: "0.5px solid "   
    },
})


export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            booking: {},
        }
    }

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    handleClose = () => {
        this.props.click();
    };


    render() {
        const { classes } = this.props;
        const host = this.props.booking;
        console.log(host)
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    onClose={this.props.click}
                    scroll='paper'
                    fullWidth='true'
                    maxWidth='xl'
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogContent>
                        <h3>Home by {host.homeName}</h3>
                         <DialogContentText>
                                <b>Address</b><br/>
                                <p>{host.address}</p> 
                        </DialogContentText>
                        <hr></hr>
                        <h5>BOOKING INFORMATION</h5>
                        <div class="d-flex">
                            {host.guestID}
                            {host.numberOfGuest}
                        </div>
                        {host.begin}{host.end}
                        <hr></hr>
                        <h5>INFORMATION</h5>
                        {
                            host.info.map((data) => {
                                return( 
                                        <div>{data}</div>
                                )
                            })
                        }
                        <hr></hr>
                        <h5>ADVOCATE INFORMATION</h5>
                        {host.advocate.name}
                        {host.advocate.phone}
                        {host.advocate.email}
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={this.props.click} variant="contained"  color="primary">
                            Close
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
})