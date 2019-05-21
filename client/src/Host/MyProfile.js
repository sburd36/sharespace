import React from 'react';
import { withStyles } from '@material-ui/core/styles';


import MyListing from './MyListing';
import person from '../img/icon1.png';

const styles = theme => ({
    profile: {
        display: 'flex',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    avatar: {
        width: '20%',
    },
    info: {
        display: 'flex',
        flexWrap: 'wrap',
        width: '65%'
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
        fontSize: "18px"
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
            <div class="pl-5">
                <h3 class="m-3">MY PROFILE</h3>
                <div className={classes.profile}>
                    <img src={person} className={classes.avatar}></img>
                    <div className={classes.info}>
                        {
                            profile.map((data) => {
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
                
                <MyListing />
            </div>
        )
    }
})