import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import CurrentSpaces from './CurrentSpaces';
import person from '../img/icon1.png';

const styles = theme => ({
    main: {
        
    },
    avatar: {

    }
})

export default withStyles(styles)(class extends React.Component {

    render() {
        const { classes } = this.props;
        let profile = [
            {
                type: 'First Name',
                value: 'Marry'
            },
            {
                type: 'Last Name',
                value: 'Potter'
            },
            {
                type: 'Gender',
                value: 'female'
            },
            {
                type: 'Email',
                value: 'mp@gmail.com'
            },
            {
                type: 'Phone',
                value: '(424)244-0123'
            },
            {
                type: 'Religion',
                value: ['Christian']
            },
            {
                type: 'Ethnicities',
                value: ['Chinese']
            },
            {
                type: 'Languages',
                value: ['Chinese', 'English']
            }
        ]
    
        return (
            <div style={{width: "100%"}}>
                <h3>MY PROFILE</h3>
                <div>
                    <img src={person} className={classes.avatar}></img>
                    <div style={{
                        display: 'flex',
                        flexWrap: 'wrap',
                    }}>
                        {
                            profile.map((data) => {
                                return (
                                    <div>
                                        <p>{data.type}</p>
                                        <div>{
                                            typeof data.value == 'string' ? 
                                                data.value :
                                                    data.value.map((d) => {
                                                        return(d)
                                                    })
                                        }
                                        </div>
                                        <hr/>
                                    </div> 
                                )
                            })
                        }
                    </div>
                </div>
                
                <CurrentSpaces></CurrentSpaces>
            </div>
        )
    }
})