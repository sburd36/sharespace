import React from 'react';
import { compose } from 'recompose';
import AddSpace from './AddSpace';
import { Amenities, Rules } from '../filter';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Add from '@material-ui/icons/AddCircleOutline';
import Typography from '@material-ui/core/Typography';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const styles = theme => ({
    head: {
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        width: "100%",
    },
    info: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        //height: '250px',
        overflowY: 'auto'
    },
    type: {
        color: '#da5c48',
        margin: 0,
        fontSize: "14px"
    },
    value: {
        fontSize: '1.5em', 
        margin: 0,
        fontWeight: 300,
        fontSize: "16px",
        paddingBottom: "3px"
    },
    arrow: {
        fontSize: '40px',
        position: 'relative',
        left: '95%'
    },
    text: {
        borderBottom: "0.5px solid #7e9fa8"
    },
    homeDesc: {
        fontWeight: 300,
        fontSize: "16px",
        marginBottom: "10px"
    }
})

class MyListing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
        }
    }

    render() {
        const { classes } = this.props;
        let types = ['Listing Name',  'Address', 'Location', 'Zip Code', 'Home Type', 'Number of Guests',]
        let values = [
            ['House 1', 'Beacon Hill', 'Private Bedroom', '1234 Beacon Hill', 'Apt 7', '98002','1', 'This used to be my son\'s room but he is off to college so it\'s open to people who need help'],
            ['House 2', '1234 Beacon Hill', 'Beacon Hill', '98002', 'Private Bedroom', '1']
        ]
        let listing = []
        let allListing = [];
        for (var i = 0; i < values.length; i++) {
            for (var j = 0; j < types.length; j++) {
                var obj = {
                    type: types[j],
                    value: values[i][j]
                }
                listing[j] = obj;
            }
            allListing[i] = listing;
        }
        console.log(allListing)
        let exampleListing = [
            {
                type: 'Listing Name',
                value: 'House 1'
            },
            {
                type: 'Location',
                value: 'Beacon Hill'
            },
            {
                type: 'Home Type',
                value: 'Private Bedroom'
            },
            {
                type: 'Address',
                value: '1234 Beacon Hill'
            },
            {
                type: 'Zip Code',
                value: '98002'
            },
            {
                type: 'Home Description',
                value: 'This used to be my son\'s room but he is off to college so it\'s open to people who need help'
            },
            {
                type: 'Number of Guests',
                value: '1'
            },
            // {
            //     type: 'Amenities',
            //     value: Amenities.values
            // },
            // {
            //     type: 'House Rules',
            //     value: Rules.values
            // }
        ]
        return (
            <div className={classes.main} style={{paddingRight: "3rem"}}>
                <div className={classes.head}>
                    <h3 class="m-3">MY LISTINGS</h3>
                    <Button 
                        variant="contained" 
                        color="primary"
                        onClick={() => this.setState({ open: true})}
                        id="button"
                    >
                        <Add style={{marginRight: "5px"}}></Add> New Listing
                    </Button>
                    {/* start of dialog */}
                    <Dialog
                        open={this.state.open}
                        //open='true'
                        onClose={() => this.setState({ open: false})}
                        scroll='paper'
                        fullWidth='true'
                        maxWidth='md'
                        aria-labelledby="scroll-dialog-title"
                    >
                        <DialogContent>
                            <AddSpace></AddSpace>
                        </DialogContent>       
                        <DialogActions >
                            <Button 
                                variant="contained" 
                                color="primary" 
                                type="submit"
                                onClick={() => this.setState({ open: false})}
                                id="button" 
                            >
                                Add Listing
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* end of dialog */}
                </div>
                {
                    allListing.map((data) => {
                        return (
                            <ExpansionPanel style={{boxShadow:"none", backgroundColor: "#fdfdfe", borderBottom: ".5px solid #7e9fa8", color:"#202e57", 
                            fontFamily: "Source Sans Pro", borderRadius: 0 }}>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />} style={{paddingLeft: 0}}>
                                    <Typography style={{fontSize: "16px", color: "#202e57"}}>{data[0].value}</Typography>
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                    <div className={classes.info}>
                                        {
                                            data.map((detail) => {
                                                return (
                                                    <div style={{
                                                        //width: '25%',
                                                        padding: '8px 10px',
                                                        flex: "1 1 33%"
                                                    }}>
                                                    <p className={classes.type}>{detail.type}</p>
                                                    <p className={`${classes.value} ${classes.text}`}>
                                                    {       
                                                        typeof detail.value == 'string' ? 
                                                        detail.value 
                                                        :
                                                        detail.value.map((d) => {
                                                            return(d + " ")
                                                        })
                                                    }
                                                    </p>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </ExpansionPanelDetails>
                                <div>
                                <p className={classes.value} style={{fontWeight: 400}}>Home Description:</p>
                                <p className={classes.homeDesc}>This used to be my son's room, but he is off to college so it's now open to people who need help.</p>
                                </div>
                                <div>
                                    <p className={classes.value} style={{fontWeight: 400}}>Amenities:</p>
                                    <div style={{display: 'flex', flexWrap: 'wrap', margin: '5px', marginBottom: '20px'}}>
                                        {
                                            Amenities.values.map((amenity) => {
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
                                                        {amenity}
                                                    </div>
                                                )
                                            })
                                        }      
                                    </div>
                                </div>
                            </ExpansionPanel>
                            
                    )
                })
                }
            </div>
        )
    }
}

const Listing = compose(
    withStyles(styles),
  )(MyListing);
  
  
  export default Listing;