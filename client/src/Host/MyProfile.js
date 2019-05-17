import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import {HostData} from '../filter';
import { compose } from 'recompose';
import { withFirebase } from '../Firebase';
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
        margin: 0
    },
    value: {
        fontSize: '1.5em', 
        margin: 0,
        fontWeight: 300
    }
})

class HostProfile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            view: "profile",
            HostInfo: HostData,
            checkA: "",
            checkB: "",
            space: [], 
            checkListings: "No Current Listing", 
            loadingA: false,
            loadingB: false

        
        }

    }
    componentDidMount() {
        this.setState({ 
            loadingA: true,
            loadingB: true
         });

        let currentUser = "";
        this.props.firebase.auth.onAuthStateChanged((user)=> {
            if(user) {
                currentUser = user.uid 
                console.log(user.uid)
                console.log(this.state)
            } else {
                console.log('no valid ID')
            }

        })
        console.log("CURRENT USER: " + currentUser)
        let infoQuery = this.props.firebase.users()

        let spacesQuery = this.props.firebase.listings()
        infoQuery.once('value').then(function(snapshot) {
            let info = snapshot.val();
            console.log(info)
            
            console.log(info[currentUser])
            
            return info
        }).then((obj) =>{
            let userData = obj[currentUser]
            this.setState({
                checkA: obj[currentUser],
                HostInfo:  {
                    ID: currentUser, 
                    advocate: "Emily Liu",
                    information : {
                        firstName: userData['firstName'],
                        lastName: userData['lastName'],
                        gender: userData['gender'],
                        description: userData['story'],
                        haveListing: userData['haveListing'],
                        listings: this.state.checkListings,
                        religion: userData['religion'],
                        languages: userData['languages'],
                        ethnicity: userData['ethnicities'],
                        contact: {
                            phone: userData['phone'],
                            email: userData['email']
                        }
                    }
                   
                },
                loadingA: false,
            })
            if(userData['haveListing']) {
                this.setState({
                    checkListings: userData['listings']
                })
            }
            return userData

        }).then((data) =>{
            console.log(data['haveListing'])
            if(data['haveListing']) {
                spacesQuery.once('value').then((snapshot) =>{
                    let obj = snapshot.val();                       
                        let relevantListings = data['listings'];
                        let storage = [];
                        for (let key in relevantListings) {
                            storage.push(relevantListings[key]['listingID'])
                        }
                        console.log(storage)
                        let spaces = []
                        for (let i = 0; i < storage.length; i ++) {
                            let current = obj[storage[i]];
                            let theSpace = {
                                ID: storage[i],
                                type: current['type'],
                                guestCount: current['guestCount'],
                                address: current['address'],
                                location: current['location'],
                                amenities: current['amenities'],
                                checkInfo: current['information'],
                                houseRules: current['houseRules']
                            }
                            spaces.push(theSpace)
                            console.log(spaces)
                        }
                        this.setState({
                                space: spaces,
                                loadingB: false,
                        }); 
                        console.log(this.state)    
                })   
        
            } else {
                this.setState({
                    space: ["there are no spaces"],
                    loadingB: false,
            }); 
            }
        })
      
    }
    render() {
        // let data = this.props.profileInfo.HostInfo

        const { classes } = this.props;
        let profile = [
            {
                type: 'First Name',
                value: this.state.HostInfo.information.firstName
            },
            {
                type: 'Last Name',
                value: this.state.HostInfo.information.lastName
            },
            {
                type: 'Gender',
                value: this.state.HostInfo.information.gender
            },
            {
                type: 'Email',
                value: this.state.HostInfo.information.contact.email
            },
            {
                type: 'Phone',
                value: this.state.HostInfo.information.contact.phone
            },
            {
                type: 'Religion',
                value: this.state.HostInfo.information.religion
            },
            {
                type: 'Ethnicities',
                value: this.state.HostInfo.information.ethnicity
            },
            {
                type: 'Languages',
                value: this.state.HostInfo.information.languages
            }
        ]
    
        return (
            <div>
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
                
                <MyListing spaces={this.state.space} />
            </div>
        )
    }
}

const MyProfile = compose(
    withStyles(styles),
    withFirebase,
  )(HostProfile);

  export default MyProfile;