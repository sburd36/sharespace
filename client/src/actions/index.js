import { FETCH_USER } from './types'
import { Firebase } from '../Firebase';


// adds users to firebase database
export const addUser = newUser => async dispatch => {
    Firebase.users.push().set(newUser);
};

// returns all useres from store
export const fetchAllUsers = () => async dispatch => {
    Firebase.users.on('value', snapshot => {
        dispatch({
            type: FETCH_USER, 
            payload: snapshot.val()
        });
    });
};

// returns a specific user into store when given a userID
export const fetchUser = () => async dispatch => {
    let user = Firebase.getCurrentUser();
    console.log(user)
    if(user !== "No current user") {
        Firebase.users.on('value', snapshot => {
            let info = snapshot.val()
            let userData = info[user.uid]
            dispatch({
                type: FETCH_USER, 
                payload: userData
            })
        })
    }
}