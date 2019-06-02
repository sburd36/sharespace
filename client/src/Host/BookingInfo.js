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
        marginBottom: "10px",
        fontSize: "12pt"
    },
    body: {
        color: "#202e57",
        fontWeight: 300,
        fontSize: "16px"
    },
    title: {
        color: "#202e57",
        fontWeight: 400,
        fontSize: "20px"
    },
    contact: {
        border: ".5px solid #7e9fa8",
        padding: "5px"
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
        const { classes, type } = this.props;
        const host = this.props.booking;
        // console.log(host)
        return(
            <div>
                <Dialog
                    open={this.props.open}
                    //open= 'true'
                    onClose={this.props.click}
                    scroll='paper'
                    fullWidth='true'
                    maxWidth='sm'
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogContent>
                        <div style={{display: "flex", justifyContent: "space-between", alignItems: "center"}}>
                            <h3>{host.homeName}</h3>
                            <div style={{display: "flex"}}>
                                {
                                    type === 'confirmed' ?  
                                    <p className={classes.tag} style={{backgroundColor: "#da5c48", color: "white", border: "none"}}>Booked</p>
                                    : 
                                    <p className={classes.tag} style={{backgroundColor: "#48704d", color: "white", border: "none"}}>Pending</p>
                                }
                            </div> 
                        </div>
                         <DialogContentText>
                            <div style={{display: "flex", justifyContent: "space-between"}}>
                                <div>
                                    <p style={{color:"#da5c48"}}>{host.location}</p>
                                    <p style={{fontSize: "12pt"}}>{host.homeType}</p>
                                    
                                </div>

                                <div>
                                    <b className={classes.body} style={{color:"#da5c48", fontWeight: 400}}>Address</b>
                                    <p className={classes.body} style={{maxWidth: "200px"}}>{host.address}</p>
                                </div>
                            </div>
                        </DialogContentText>
                        <hr></hr>
                        <h5 className={classes.title}>BOOKING INFORMATION</h5>
                        <div style={{display: "flex", justifyContent: "space-between"}}>  
                            <div className={classes.body}>
                                <p style={{fontSize: "14pt"}}><b>Guest ID:</b> {host.guestID} </p>
                                {host.numberOfGuest} Guests
                            </div>
                            <div className={classes.body}>
                                {host.begin} - <br/> {host.end}
                            </div>
                        </div>  
                        <hr></hr>
                        <h5 className={classes.title}>INFORMATION</h5>
                        <div style={{display: 'flex', flexWrap: 'wrap'}}>
                        {
                            host.info.map((data) => {
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
                        <h5 className={classes.title}>NOTES</h5>
                        <p className={classes.body}>Insert route to notes here</p>
                        <hr></hr>
                        <h5 className={classes.title}>ADVOCATE INFORMATION</h5>
                        <p className={classes.body} style={{fontWeight: 400}}>{host.advocate.name}</p>
                        <div style={{textAlign: "center", display: "flex", justifyContent: "center", marginTop: "5px"}}>
                            <p style={{flexGrow: "1"}} className={`${classes.contact} ${classes.body}`}>{host.advocate.phone}</p>
                            <p style={{flexGrow: "1"}} className={`${classes.contact} ${classes.body}`}>{host.advocate.email}</p>
                        </div>  
                    </DialogContent>
                    <DialogActions style={{display: 'flex', justifyContent: 'space-between', padding: "20px", paddingBottom: "10px", borderTop: "0.5px solid #d3dbee"}}>
                        {
                            type === 'confirmed' ?
                            <>
                                <Button onClick={this.props.click} variant="contained"  color="primary" id="buttonGray">
                                    Close
                                </Button>
                                <span style={{fontWeight: 300, fontSize: "12pt"}}>Need to cancel? Contact your advocate.</span>
                            </>
                        :
                        <>
                        <Button onClick={this.props.click} variant="contained"  color="primary" id="buttonGray">
                            Decline Request
                        </Button>
                        <Button onClick={this.props.click} variant="contained" id="btn-drk-blue-fill">
                            Accept Request
                        </Button>
                        </>
                        }
                        
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
})