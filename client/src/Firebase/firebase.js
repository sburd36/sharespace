import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

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