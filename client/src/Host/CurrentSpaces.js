import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Home from '@material-ui/icons/Home';
import AddSpace from './AddSpace';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

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

class CurrentListing extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            Listings: [
                {
                    guestID: 1,
                    begin: 'MONDAY, MARCH 6',
                    end: 'TUESDAY, MARCH 7',
                    tags: ['Spanish', 'Christian', 'Women Only', 'Alcohol-Free']
                }
            ]
        }
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.main}>
                <h3 class="m-3">MY LISTINGS</h3>
                <Button 
                    variant="contained" 
                    color="primary" 
                    className={classes.button} 
                    onClick={() => this.setState({ open: true})}
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
                        <AddSpace></AddSpace>
                    </DialogContent>       
                    <DialogActions >
                        <Button 
                            variant="contained" 
                            color="primary" 
                            type="submit"
                            onClick={() => this.setState({ open: false})} 
                        >
                            Add Space
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
        )
    }
}

const Listing = compose(
    withStyles(styles),
  )(CurrentListing);
  
  
  export default Listing;