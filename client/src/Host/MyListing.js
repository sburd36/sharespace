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
import Down from '@material-ui/icons/KeyboardArrowDown';
import Up from '@material-ui/icons/KeyboardArrowUp';

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

    render() {
        const { classes } = this.props;
        let types = ['Listing Name', 'Address', 'Location', 'Home Type', 'Number of Guests', 'Zip Code', 'Amenities', 'House Rules', 'Home Description']
        let values = ['House 1', '1234 Beacon Hill','Beacon Hill','Private Bedroom','1','98002', Amenities.values, Rules.values,'This used to be my son\'s room but he is off to college so it\'s open to people who need help']
        let listing = []
        for (var i = 0; i < types.length; i++) {
            var obj = {
                type: types[i],
                value: values[i]
            }
            listing[i] = obj;
        }
        let exampleListing = [
            {
                type: 'Listing Name',
                value: 'House 1'
            },
            {
                type: 'Address',
                value: '1234 Beacon Hill'
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
                type: 'Number of Guests',
                value: '1'
            },
            {
                type: 'Zip Code',
                value: '98002'
            },
            {
                type: 'Amenities',
                value: Amenities.values
            },
            {
                type: 'House Rules',
                value: Rules.values
            }, 
            {
                type: 'Home Description',
                value: 'This used to be my son\'s room but he is off to college so it\'s open to people who need help'
            }
        ]
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
                <div>
                    <hr />
                    <Down className={classes.arrow} />
                </div>
                <div className={classes.info}>
                {
                    listing.map((data) => {
                        return (
                            <div style={{
                                width: '25%',
                                margin: '5px 15px'
                            }}>
                            <p className={classes.type}>{data.type}</p>
                            <p className={classes.value}>
                            {
                                typeof data.value == 'string' ? 
                                    data.value 
                                    :
                                    data.value.map((d) => {
                                        return(d + " ")
                                    })
                            }
                            </p>
                            <hr style={{position: 'relative', bottom: '10px'}}/>
                        </div> 
                    )
                })
                }
                </div>
            </div>
        )
    }
}

const Listing = compose(
    withStyles(styles),
  )(MyListing);
  
  
  export default Listing;