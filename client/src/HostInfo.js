import React, { Component } from 'react';
import bedroom from "./img/bedroom.jpg";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

// For host pop-up
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    img: {
        height: '700px',
    },
    contact: {
        width: '600px'
    },
    button: {
        margin: theme.spacing.unit,
    }
})

export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false,
            host: {
                ID: 1,
                information: {
                    name: "Marry Potter",
                    description: "Marry is a working professional who likes cat and yoga",
                    languages: ["English"],
                    religion: ["none"],
                    ethnicity: ["White"],
                    contact: {
                        phone: "(306)142-2093",
                        email: "mp@gmail.com"
                    },
                },
                space:  [
                    {
                        ID: 1,
                        amentities: [],
                        checkinInfo: "",
                        houseRules: [],
                        // begin:,
                        // end: ,
                    }
                ]
                }
        }
    }

    handleHost = () => {
        this.setState({ open: true});
    };

    handleCloseHost = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes } = this.props;
        const host = this.props.booking
        return(
            <div>
                <div class="d-flex justify-content-center">
                    <Button onClick={this.handleHost} variant="outlined">
                            {host.begin} - {host.end}
                    </Button>   
                </div>
                <Dialog
                    open={this.state.open}
                    onClose={this.handleCloseHost}
                    scroll='paper'
                    fullWidth='true'
                    maxWidth='xl'
                    aria-labelledby="scroll-dialog-title"
                >

                    <DialogContent>
                        <img className={classes.img} src={bedroom}></img>
                        <h3>Home by {host.name}</h3>
                        <div class="d-flex justify-content-between">
                            <p style={{width: "700px"}}>
                                aowjefpoi aosdjf wejoa;l ae ojagjas;oaj gaoijg wje aja;kngojgijg ;ag g aewg 
                                aowjefpoi aosdjf wejoa;l ae ojagjas;oaj gaoijg wje aja;kngojgijg ;ag g aewg
                            </p>
                            <DialogContentText>
                                <b>Address</b><br/>
                                {host.address}                        
                            </DialogContentText>
                        </div>
                        <hr></hr>
                        <h5>HOST INFORMATION</h5>
                        <div class="d-flex">
                            <p style={{width: "700px"}}>
                                aowjefpoi aosdjf wejoa;l ae ojagjas;oaj gaoijg wje aja;kngojgijg ;ag g aewg aowjefpoi aosdjf
                                 wejoa;l ae ojagjas;oaj gaoijg wje aja;kngojgijg ;ag g aewg
                            </p>
                            <div>
                                <b>Languages:</b> English, Chinese<br/>
                                <b>Religion:</b> Christian<br/>
                                <b>Ethnicity: </b> Chinese<br/>
                            </div>
                        </div>
                        <div style={{textAlign: "center"}}>
                            <Button variant="outlined" className={classes.contact}>
                                (2016)396 - 3860 Call me maybe
                            </Button>
                            <Button variant="outlined" className={classes.contact}>
                                ilovesharespace@sharespace.com
                            </Button>
                        </div>
                        <hr></hr>
                        <h5>AMENTITIES</h5>
                        <hr></hr>
                        <h5>CHECK-IN INFORMATION</h5>
                        <hr></hr>
                        <h5>HOUSE RULES</h5>
                        <Button variant="outlined" className={classes.button}>
                                No Smoking
                        </Button>
                        <hr></hr>
                        <h5>BOOKING INFORMATION</h5>
                        <TextField
                            id="date"
                            label="Start Date"
                            type="date"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                        /> 
                    </DialogContent>
                    <DialogActions >
                        <Button onClick={this.handleCloseHost} variant="contained" >
                            Cancel
                        </Button>
                        <Button onClick={this.handleCloseHost} variant="contained"  color="primary">
                            Confirm Host
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
})