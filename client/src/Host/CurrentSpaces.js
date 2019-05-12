import React from 'react';
import { compose } from 'recompose';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
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
        return (
            <div></div>
        )
    }
}

const Listing = compose(
    withStyles(styles),
  )(CurrentListing);
  
  
  export default Listing;