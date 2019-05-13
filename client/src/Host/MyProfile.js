import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CurrentSpaces from './CurrentSpaces';

const styles = theme => ({
    main: {
        
    }
})

export default withStyles(styles)(class extends React.Component {
    render() {
        const { classes } = this.props;

        return (
            <div style={{width: "100%"}}>
                <h3>MY PROFILE</h3>
                <CurrentSpaces></CurrentSpaces>
            </div>
        )
    }
})