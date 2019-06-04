import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import moment from 'moment';

// ********** Algolia tutorial ********//
// const algoliasearch = require('algoliasearch');
// const dotenv = require('dotenv');
// const firebase = require('firebase');

// // load values from the .env file in this directory into process.env
// dotenv.config();

// // configure firebase
// firebase.initializeApp({
//   databaseURL: 'https://sharespace-5f41d.firebaseio.com',
// });

// const database = firebase.database();

// // configure algolia
// const algolia = algoliasearch(
//   "UI4XF6GAZS",
//   "d0d9a91e7c68fb44a286ce841f14333d"
// );
// const index = algolia.initIndex('availabilities');

// Promise.all([
//   database.ref('/availabilities').push({
//     "state": "available",
//     "start": new Date('2019-06-10') * 1,
//     "end": new Date('2019-06-15') * 1,
//     // "hostID": this.props.userID,
//     "firstName": "Min",
//     "lastName": "Yang", 
//     "gender": "female",
//     "phone": 4252440481,
//     "email": "minyang828@gmail.com",
//     "ethnicities": ['Asian'],
//     "religion": ['Christianity'],
//     "story": "My name is Min",
//     "listingData": {
//         "address": "2525 minor Ave E",
//         "amenities": ['Kitchen', 'Laundry', 'Refrigerator'],
//         "checkin": "00:00",
//         "checkout": "17:00",
//         "description": 'its beautiful',
//         // "hostID": 
//         "houseRules": ['No Smoking', 'No Alcohol'],
//         "information": "call me for more i live in Capital Hill",
//         "location": 'Ballard',
//         "name": "Listing A",
//         "pendingBooking": [],
//         "guestCount": 3,
//         // "photos":
//         "type": 'Entire Place',
//         "zip": "98102",
//     }
//   }),
//   database.ref('/availabilities').push({
//     "state": "available",
//     "start": new Date('2019-06-11') * 1,
//     "end": new Date('2019-06-20') * 1,
//     // "hostID": this.props.userID,
//     "firstName": "Marry",
//     "lastName": "Potter", 
//     "gender": "female",
//     "phone": 4252440481,
//     "email": "marrypotter@gmail.com",
//     "ethnicities": ['White'],
//     "religion": ['Buddhism', 'Catholic'],
//     "story": "My name is Marry Potter",
//     "listingData": {
//         "address": "2525 minor Ave E",
//         "amenities": ['Laundry', 'Refrigerator', 'Microwave', 'Self-Check in', 'Free Parking',],
//         "checkin": "00:00",
//         "checkout": "17:00",
//         "description": 'its beautiful',
//         // "hostID": 
//         "houseRules": ['No Smoking'],
//         "information": "call me for more",
//         "location": 'Capitol Hill',
//         "name": "Listing A",
//         "pendingBooking": [],
//         "guestCount": 2,
//         // "photos":
//         "type": 'Shared Room',
//         "zip": "98115",
//     }
//   }),
//   database.ref('/availabilities').push({
//     "state": "available",
//     "start": new Date('2019-06-15') * 1,
//     "end": new Date('2019-06-27') * 1,
//     // "hostID": this.props.userID,
//     "firstName": "Andy",
//     "lastName": "Ruiz", 
//     "gender": "male",
//     "phone": 4252440481,
//     "email": "kevinhuang@gmail.com",
//     "ethnicities": ['Hispanic'],
//     "religion": ['Islam', 'Buddhism', 'Catholic'],
//     "story": "My name is Marry Potter",
//     "listingData": {
//         "address": "2525 minor Ave E",
//         "amenities": ['Laundry', 'Microwave', 'Self-Check in', 'Free Parking'],
//         "checkin": "00:00",
//         "checkout": "17:00",
//         "description": 'its beautiful',
//         // "hostID": 
//         "houseRules": ['No Alcohol'],
//         "information": "come on time please",
//         "location": 'Green Lake',
//         "name": "Listing A",
//         "pendingBooking": [],
//         "guestCount": 3,
//         // "photos":
//         "type": 'Living Room',
//         "zip": "98115",
//     }
//   })
// ])

// // live ync firebase data to Algolia
// const availabilitiesRef = database.ref('/availabilities');
// availabilitiesRef.on('child_added', addOrUpdateIndexRecord);
// availabilitiesRef.on('child_changed', addOrUpdateIndexRecord);
// availabilitiesRef.on('child_removed', deleteIndexRecord);

// function addOrUpdateIndexRecord(availability) {
//   // Get Firebase object
//   const record = availability.val();
//   // Specify Algolia's objectID using the Firebase object key
//   record.objectID = availability.key;
//   // Add or update object
//   index
//     .saveObject(record)
//     .then(() => {
//       console.log('Firebase object indexed in Algolia', record.objectID);
//     })
//     .catch(error => {
//       console.error('Error when indexing availabilities into Algolia', error);
//       process.exit(1);
//     });
// }

// function deleteIndexRecord({key}) {
//   // Get Algolia's objectID from the Firebase object key
//   const objectID = key;
//   // Remove the object from Algolia
//   index
//     .deleteObject(objectID)
//     .then(() => {
//       console.log('Firebase object deleted from Algolia', objectID);
//     })
//     .catch(error => {
//       console.error('Error when deleting availabilities from Algolia', error);
//       process.exit(1);
//     });
// }
// let startRange = new Date('2019-06-09') * 1;
// let endRange = new Date('2019-06-15') * 1;

// index.search({
//     query: 'Yang',
//     // attributesToRetrieve: [
//     //   'listingData.location',
//     //   'lastName'
//     // ],
//     // numericFilters: [
//     //   [
//     //     'start >= ' + startRange,
//     //     'end <= ' + endRange
//     //   ]
//     // ],
//     // facetFilters: [
//     //   'firstName:Min'
//     // ]
//     },
//     (err, { hits } = {}) => {
//       if (err) throw err;
  
//       console.log(hits);
//     }
//     )
    // .then(res => {
    //   console.log(res);
    // })

// ***********************************//

const config = {
    apiKey:"AIzaSyDQ6iu5uEvZsLIUT_dI-xL86zgd71G7E2I",
    authDomain: "sharespace-5f41d.firebaseapp.com",
    databaseURL: "https://sharespace-5f41d.firebaseio.com",
    projectId: "sharespace-5f41d",
    storageBucket: "sharespace-5f41d.appspot.com",
    messagingSenderId: "50665397997"            
  };

  class Firebase {
    constructor() {
      app.initializeApp(config);
      this.auth = app.auth();
      this.db = app.database();

    }
    
    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => this.auth.signOut();

    doPasswordReset = email => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
      this.auth.currentUser.updatePassword(password);
    
    // *** User API ***
    user = uid => this.db.ref(`users/${uid}`);
    userDie = uid => this.db.ref(`users/${uid}/listings`);


    users = () => this.db.ref('users');

    tag = uid => this.db.ref(`hosts/${uid}`);

    tags = () => this.db.ref('hosts')

    listings = () => this.db.ref('listings');

    listing = id => this.db.ref(`listings/${id}`);
    
    updateAvailToPending = (lid, aid, obj) => {
      this.db.ref(`listings/${lid}/availability/${aid}`).remove();
      var key = this.db.ref(`listings/${lid}/pendingBooking`).push(obj)
      return key
    }

    addPendingToBooked = (obj) => {
      let listID = obj.listingData.id
      let listPushID = obj.listingPushID
      let pendID = obj.id
      let pushID = this.db.ref(`listings/${listID}/booked`).push(obj)
      let key = pushID.key
      let availID = this.db.ref(`availabilities/${pendID}`).update({'state': 'booked', "listingPushID": pushID.key})
      // this.db.ref(`listings/${listID}/booked/${key}`).update({"availID": availID.key})
      this.db.ref(`listings/${listID}/pending/${listPushID}`).remove()

      console.log(listID)
      console.log(pushID.key)
      console.log(availID.key)
    }

    addPendingToDelete = (obj) => {
      let listID = obj.listingData.id
      let listPushID = obj.listingPushID
      let pendID = obj.id
      this.db.ref(`listings/${listID}/pending/${listPushID}`).remove()
      this.db.ref(`availabilities/${pendID}`).remove()
    }
    
    addAvailToListing = id => this.db.ref(`listings/${id}/availability`);
    
    availabilities = () => this.db.ref('availabilities')
    
    availability = (id) => this.db.ref(`availabilities/${id}`)

    // deleteAvail = (lid, aid) => this.db.ref(`listings/${lid}/availability/${aid}`).remove();
    deleteAvailInHost = (obj) => {
      let aid = obj.id
      let lid = obj.listingID
      let pushKey = obj.pushKey
      this.db.ref(`listings/${lid}/availability/${aid}`).remove();
      this.db.ref(`availabilities/${pushKey}`).remove();
    }
    survivors = () => this.db.ref('survivors');
    
  }
  
  export default Firebase;