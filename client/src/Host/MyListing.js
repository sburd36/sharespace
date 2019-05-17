import React from 'react';
import { compose } from 'recompose';
import AddSpace from './AddSpace';
import { Amenities, Rules } from '../filter';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';

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
    button: {
        background: '#202e57',
        height: '50px', 
        marginRight: '10px'
    },
    info: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        height: '250px',
        overflowY: 'auto'
    },
    type: {
        color: '#da5c48',
        margin: 0
    },
    value: {
        fontSize: '1.5em', 
        margin: 0,
        fontWeight: 300
    },
    arrow: {
        fontSize: '40px',
        position: 'relative',
        left: '95%'
    }
})

class MyListing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {

        }
    }
    onClick = () => {
        this.setState({
            open: !this.state.open
        })
    }
    
    render() {
        let data = this.props.spaces
        console.log("DATA:")
        console.log(data)
        const { classes } = this.props;
        if (data.length == 0) {
            return(
                <div>Retreiving Data</div> 

            )
            console.log('inside data === undefineid')

        } else if (data[0] == "there are no spaces") {
            return(
                <div className={classes.main}>
                    <div className={classes.head}>
                        <h3 class="m-3">MY LISTINGS</h3>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            className={classes.button} 
                            onClick={() => this.setState({ open: true})}
                        >
                            <Home></Home>New Listing
                        </Button>
                    </div>
                </div>
            )
        } else {
            console.log('inside else statement and data is:')
            console.log(data)
        
        let types = ['Listing Name', 'Address', 'Location', 'Home Type', 'Number of Guests', 'Zip Code', 'Amenities', 'House Rules', 'Home Description']
        let values = []
        let listing = []
        let allListing = [];
        for (var i = 0; i < data.length; i++) {
            let single = data[i]
            console.log('DATA AT I')
            console.log(single.amenities)
            if (single.amenities.values()===undefined || )
            var save; 
            if (data[i] === undefined) {
                save = ['Country Home', '2424 help','abc', 'def', 'hhi', 'jkl', 'jkl', 'skl', '1234']

            } else {
                save = ['Country Home', '2424 help', single.location, single.type, single.guestCount, '98102d', single.amenities.values(),single.houseRules.values(), single.checkInfo]

            }
            
            values.push(save)

        }
        console.log('values')
        console.log(values)
            // console.log("SINGLE")
            // console.log(single)
        for(var i = 0; i < values.length; i++) {
            for (var j = 0; j < types.length; j++) {
                var obj = {
                    type: types[j],
                    value: values[i][j]
                }
                console.log('object')
                console.log(obj)
                listing[j] = obj;
            }
            allListing[i] = listing;
        }
        console.log(allListing)
        // let exampleListing = [
        //     {
        //         type: 'Listing Name',
        //         value: 'House 1'
        //     },
        //     {
        //         type: 'Address',
        //         value: '1234 Beacon Hill'
        //     },
        //     {
        //         type: 'Location',
        //         value: 'Beacon Hill'
        //     },
        //     {
        //         type: 'Home Type',
        //         value: 'Private Bedroom'
        //     },
        //     {
        //         type: 'Number of Guests',
        //         value: '1'
        //     },
        //     {
        //         type: 'Zip Code',
        //         value: '98002'
        //     },
        //     {
        //         type: 'Amenities',
        //         value: Amenities.values
        //     },
        //     {
        //         type: 'House Rules',
        //         value: Rules.values
        //     }, 
        //     {
        //         type: 'Home Description',
        //         value: 'This used to be my son\'s room but he is off to college so it\'s open to people who need help'
        //     }
        // ]
        return (
            <div className={classes.main}>
                <div className={classes.head}>
                    <h3 class="m-3">MY LISTINGS</h3>
                    <Button 
                        variant="contained" 
                        color="primary" 
                        className={classes.button} 
                        onClick={() => this.setState({ open: true})}
                    >
                        <Home></Home>New Listing
                    </Button>
                    {/* start of dialog */}
                    <Dialog
                        open={this.state.open}
                        onClose={() => this.setState({ open: false})}
                        scroll='paper'
                        fullWidth='true'
                        maxWidth='xl'
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
                            >
                                Add
                            </Button>
                        </DialogActions>
                    </Dialog>
                    {/* end of dialog */}
                </div>
                {
                    allListing.map((data) => {
                        return (
                            <ExpansionPanel>
                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                    {data[0].value}
                                </ExpansionPanelSummary>
                                <ExpansionPanelDetails>
                                <div className={classes.info}>
                                    {
                                        data.map((detail) => {
                                            return (
                                                <div style={{
                                                    width: '25%',
                                                    margin: '5px 15px'
                                                }}>
                                                <p className={classes.type}>{detail.type}</p>
                                                <p className={classes.value}>
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
                            </ExpansionPanel>
                            
                    )
                })
                }
            </div>
        )
        }
        
    }
}

const Listing = compose(
    withStyles(styles),
  )(MyListing);
  
  
  export default Listing;