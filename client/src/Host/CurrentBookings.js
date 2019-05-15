import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { Host } from '../filter';

const styles = theme => ({
})

export default withStyles(styles)(class extends React.Component {
    render() {
        const { classes } = this.props;
        return(
            <div>
                {
                    Host.map((data) => {
                        return(
                            <Paper>
                                <b>Guest ID</b>
                                {}
                            </Paper>
                        )
                    })
                }
            </div>
        )
    }
})