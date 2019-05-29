import React, { Component } from 'react';
import bedroom from "../img/bedroom.jpg";
import { 
    Button, 
    withStyles, 
    TextField, 
    MenuItem, 
    Grid, 
    FormControl, 
    FormControlLabel, 
    Checkbox,
    Dialog, DialogActions, 
    DialogContent, 
    DialogContentText 
} from '@material-ui/core/';

import { PersonalSelect } from '../Select'
import { Needs } from '../filter';
// import Map from './Map'

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
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
        //marginRight: theme.spacing.unit * 2,
        width: "50%",
    },
    input: {
        border: "0.5px solid "   
    },
    insideContent: {
        padding: "20px"
    },
    tag: {
        color: "#202e57", 
        border: ".5px solid #202e57", 
        maxWidth: "150px",
        borderRadius: "10px",
        textAlign: "center",
        padding: "6px",
        //paddingTop: "6px"
        marginRight: "10px",
        marginTop: "10px",
        marginBottom: "10px"
    }, 
    body: {
        color: "#202e57",
        fontWeight: 300,
        fontSize: "14px"
    },
    title: {
        color: "#202e57",
        fontWeight: 400,
        fontSize: "18px"
    },
    contact: {
        border: ".5px solid #7e9fa8",
        padding: "5px"
    },
    floatingLabelFocusStyle: {
        color: "#da5c48"
    }
})


export default withStyles(styles)(class extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            booking: {},
            guest: ''
        }
    }

    handleInputChange = name => event => {
        this.setState({ [name]: event.target.value });
    };


    handleCloseHost = () => {
        this.setState({ confirm: false });
        this.props.click();
    };

    handleConfirmHost = () => {
        this.setState({
            confirm: true
        })
    }

    render() {
        const { classes } = this.props;
        const host = this.props.booking;
        return(
            <div>

                <Dialog
                    open={this.props.open}
                    onClose={this.props.click}
                    scroll='paper'
                    fullWidth='false'
                    maxWidth='sm'
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogContent style={{padding: 0}}>
                        <img className={classes.img} src={bedroom} style={{width: "100%", height: "100%"}}></img>
                        {/* <Map /> */}
                        <div className={classes.insideContent}>
                        <h3>Home by {host.information.name}</h3>
                        <p style={{color: "#7e9fa8"}}>{host.space[0].location}</p>
                        <div style={{display: "flex"}}>
                                {/* Need to add here the availablity. If available, render this, else render the second one */}
                                <p className={classes.tag} style={{backgroundColor: "#48704d", color: "white", border: "none"}}>Available</p>
                                {/* <p className={classes.tag} style={{backgroundColor: "#da5c48", color: "white", border: "none"}}>Booked</p> */}
                                <p className={classes.tag}>{host.space[0].homeType}</p>
                        </div>
                            <DialogContentText style={{display:"flex", justifyContent: "space-between", alignItems: "flex-start"}}>
                                <p className={classes.body}>{host.space[0].description}</p>
                                <div>
                                    <b className={classes.body} style={{color:"#da5c48"}}>Address</b>
                                    <p className={classes.body}>{host.space[0].address}</p>
                                </div>
                            </DialogContentText>
                        <hr></hr>
                        <h5 className={classes.title}>HOST INFORMATION</h5>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <div style={{paddingRight: "10px"}}>
                                <p className={classes.body}>
                                    <b>{host.information.name}</b>
                                </p>
                                <p className={classes.body} >{host.information.description}</p>
                            </div>
                            <div>
                                <p className={classes.body}><b style={{color:"#da5c48"}}>Languages:</b> English, Chinese</p>
                                <p className={classes.body}><b style={{color:"#da5c48"}}>Religion:</b> Christian</p>
                                <p className={classes.body}><b style={{color:"#da5c48"}}>Ethnicity: </b> Chinese</p>
                            </div>
                        </div>
                        <div style={{textAlign: "center", display: "flex", justifyContent: "center", marginTop: "5px"}}>
                            <p style={{flexGrow: "1"}} className={`${classes.contact} ${classes.body}`}>{host.information.contact.phone}</p>
                            <p style={{flexGrow: "1"}} className={`${classes.contact} ${classes.body}`}>{host.information.contact.email}</p>
                        </div>
                        <hr></hr>
                        <h5 className={classes.title}>AMENITIES</h5>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {
                            host.space[0].amenities.map((data) => {
                                return( 
                                <div 
                                    id="tags"
                                    style={{
                                        border: "0.5px solid",
                                        borderRadius: '0.5rem',
                                        padding: '4px 12px 4px 12px',
                                        margin: '2px'
                                    }}
                                >
                                    {data}
                                </div>
                                )
                            })
                        }
                        </div>
                        <hr></hr>
                        <h5 className={classes.title}>CHECK-IN INFORMATION</h5>
                        <div style={{display: "flex", justifyContent: "space-between"}}>
                            <p className={classes.body} style={{paddingRight: "10px"}}>
                                {host.space[0].checkinInfo.description}
                            </p>
                            <DialogContentText>
                                <p className={classes.body}><b>Time: </b> {host.space[0].checkinInfo.time} </p>                          
                            </DialogContentText>
                        </div>

                        <hr></hr>
                        <h5 className={classes.title}>HOUSE RULES</h5>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                            {
                                host.space[0].houseRules.map((data) => {
                                    return(
                                    <div 
                                        id="tags"
                                        style={{
                                            border: "0.5px solid #7e9fa8",
                                            borderRadius: '0.5rem',
                                            padding: '4px 12px 4px 12px',
                                            margin: '2px',
                                            color: "#7e9fa8"
                                        }}
                                    >
                                        {data}
                                    </div>
                                    )
                                })
                            }
                        </div>
                        <hr></hr>
                        <h5 className={classes.title}>BOOKING INFORMATION</h5>
                        <FormControl class="">
                            <div> 
                                {/* Guest ID, StartEnd Date */}
                                <p className={classes.title} style={{fontSize: "16px"}}>GUEST INFORMATION</p>
                                <div style={{display: "flex"}}>
                                    <TextField
                                        id="standard-name"
                                        label="Guest ID"
                                        style={{marginRight: "10px"}}
                                        className={classes.textField}
                                        value={this.state.guestID}
                                        onChange={this.handleInputChange('guestID')}
                                        margin="normal"
                                    />
                                    <TextField
                                        id="standard-select-currency"
                                        select
                                        label="# of guests"
                                        className={classes.textField}
                                        value={this.state.guest}
                                        onChange={this.handleInputChange('guest')}
                                        SelectProps={{
                                            MenuProps: {
                                            className: classes.menu,
                                            },
                                        }}
                                        margin="normal"
                                        >
                                        {[1,2,3,4, 5, 6].map(option => (
                                            <MenuItem key={option} value={option}>
                                                {option}
                                            </MenuItem>
                                        ))}
                                    </TextField>
                                    <TextField
                                        id="date"
                                        label="Start Date"
                                        type="date"
                                        className={classes.textField}
                                        style={{marginRight: "10px"}}
                                        InputLabelProps={{
                                            shrink: true,
                                            className: classes.floatingLabelFocusStyle
                                        }}
                                    /> 
                                    <TextField
                                        id="date"
                                        label="End Date"
                                        type="date"
                                        className={classes.textField}
                                        InputLabelProps={{
                                            shrink: true,
                                            className: classes.floatingLabelFocusStyle
                                        }}
                                    /> 
                                </div>
                                
                                {/* Personal Information */}
                                <div style={{paddingRight: "100px"}}>
                                <PersonalSelect></PersonalSelect>
                                </div>
                                
                                {/* NEEDS FIELD GOES HERE */}
                                <div class="mt-3">
                                    <p className={classes.title} style={{fontSize: "16px"}}>NEEDS</p>
                                    {
                                        Needs.values.map((need) => {
                                            return(
                                                <FormControlLabel control={<Checkbox value={need}/>} label={need}/>
                                            )
                                        })
                                    }
                                </div>
                                
                                {/* NOTES */}
                        
                                <Grid>
                                    <p className={classes.title} style={{fontSize: "16px"}}>NOTES</p>
                                    <textarea style={{width: "100%"}}></textarea>
                            </Grid>
                            </div>
                        {/* </Grid> */}

                        </FormControl>
                        </div>
                    </DialogContent>
                    <DialogActions style={{display: "flex", justifyContent: "space-between", paddingRight: "20px", paddingLeft: "20px"}}>
                        <Button onClick={this.props.click} variant="contained" id="buttonGray" style={{color: "white"}}>
                            Cancel
                        </Button>
                        <Button onClick={this.handleConfirmHost} variant="contained"  color="primary" id="button">
                            Confirm Host
                        </Button>
                    </DialogActions>
                    <Dialog
                        open={this.state.confirm}
                        onClose={this.props.click}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                        >
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description" class="pb-0">
                            Your booking is confirmed! 
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleCloseHost} color="primary" id="button" style={{color: "white"}}>
                            Done
                            </Button>
                        </DialogActions>
                        </Dialog>
                </Dialog>
            </div>
        )
    }
})