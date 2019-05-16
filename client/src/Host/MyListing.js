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

const styles = theme => ({
    main: {
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center', 
        width: "100%",
    },
    button: {
        background: '#202e57',
        height: '50px', 
        marginRight: '10px'
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
        let data = this.props.listing
        console.log(data)
        const { classes } = this.props;
        let listing = [
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
                type: 'Number of Guests',
                value: '1'
            },
            {
                type: 'Zip Code',
                value: '98002'
            },
            {
                type: 'Amenities',
                value: []
            },
        ]
        return (
            <div className={classes.main}>
                <h3 class="m-3">MY LISTINGS</h3>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button} 
                    onClick={this.onClick}
                >
                    <Home></Home>New Listing
                </Button>
                <Dialog
                    open={this.state.open}
                    onClose={() => this.setState({ open: false})}
                    scroll='paper'
                    fullWidth='true'
                    maxWidth='xl'
                    aria-labelledby="scroll-dialog-title"
                >
                    <DialogContent>
                        <AddSpace view={this.onClick}></AddSpace>
                    </DialogContent>       
                    <DialogActions >
                        
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const Listing = compose(
    withStyles(styles),
  )(MyListing);
  
  
  export default Listing;