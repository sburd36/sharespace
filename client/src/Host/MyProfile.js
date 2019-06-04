import React from 'react';
import { withStyles } from '@material-ui/core/styles';

// import Edit from '@material-ui/icons/edit'
import MyListing from './MyListing';
import person from '../img/icon1.png';

// firebase
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';

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

class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                firstName: "",
                lastName: "",
                gender: "",
                email: "",
                phone: "",
                religion: [],
                languages: [],
                ethnicities: []

            }
        }
    }
    componentDidMount() {
        this.props.firebase.auth.onAuthStateChanged((user)=> {
            if(user) {
                let currentUser = []
                let userQuery = this.props.firebase.user(user.uid);
                userQuery.on('value', snapshot =>{
                    let obj = snapshot.val(); 
                    console.log(obj)

                    this.setState({
                        user: obj
                    });

                })


                console.log(this.state)    


            } else {
                console.log("no current user present")
            }
        });     
    }
 
    render() {
        let user = {
                firstName: " ",
                lastName: " ",
                gender: " ",
                email: " ",
                phone: " ",
                religion: [" "],
                languages: [" "],
                ethnicities: [" "]
        }
        if(this.state.user !== null) {
            user = this.state.user
            console.log(user)
        }
        console.log(this.state.user)
        const { classes } = this.props;
        let profile = [
            {
                type: 'First Name',
                value: user.firstName
            },
            {
                type: 'Last Name',
                value: user.lastName
            },
            {
                type: 'Gender',
                value: user.gender
            },
            {
                type: 'Email',
                value: user.email
            },
            {
                type: 'Phone',
                value: user.phone
            },
            {
                type: 'Religion',
                value: user.religion
            },
            {
                type: 'Ethnicities',
                value: user.ethnicities
            },
            {
                type: 'Languages',
                value: user.languages
            }
        ]
        {console.log(profile)}

        return (
            <div class="pl-5">
                <h3 class="m-3">MY PROFILE</h3>
                <div className={classes.profile}>
                    <img src={person} className={classes.avatar}></img>
                    <div className={classes.info}>
                        {
                            profile.map((data) => {
                                return (
                                    typeof data.value === 'string'  && 

                                        <div style={{
                                            width: '25%',
                                            margin: '5px 15px'
                                        }}>
                                            <p className={classes.type}>{data.type}</p>
                                            <p className={classes.value}>
                                                {data.value}
                                            </p>
                                            <hr style={{position: 'relative', bottom: '10px'}}/>
                                        </div> 
                                        
                                )
                            })
                        }
                        <div style={{width: '100%'}}></div>
                    {
                        profile.slice(profile.length - 3, profile.length).map((value) => {
                            return(
                            <div>
                                <p className={classes.value} style={{fontWeight: 400}}>{value.type}:</p>
                                <div style={{display: 'flex', flexWrap: 'wrap', margin: '5px', marginBottom: '20px'}}>
                                {
                                value.value.map((d) => {
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
                                        {d}
                                        </div>
                                    )
                                    })
                                }   
                                </div>
                            </div>  
                            )
                        })    
                    }
                        
                    </div>        
                </div>
                
                {/* <MyListing user={this.props.user} profile={this.props.profile} updateListing={this.props.updateListing} ></MyListing> */}
            </div>
        )
    }
}

const HostProfile = compose(
    withStyles(styles),
    withFirebase,
  )(Profile);

  export default HostProfile;