import React from 'react';

import { withFirebase } from './Firebase';

const SignOutButton = ({ firebase }) => (
  <button type="button" class="btn btn-dark-teal-fill" onClick={firebase.doSignOut}>
    Sign Out
  </button>
);

export default withFirebase(SignOutButton);