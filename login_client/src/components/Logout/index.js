import React from 'react';
import { useDispatch } from "react-redux";
import { useGoogleLogout } from 'react-google-login';
import { signout } from "../../actions";
const clientId =
  '1082435044632-sopncjtmcio3b7gin0fiam1vivhp7lab.apps.googleusercontent.com';

function GoogleLogout() {
  const dispatch = useDispatch();
  const onLogoutSuccess = (res) => {
    console.log('Logged out Success');
    alert('Logged out Successfully ✌');
    dispatch(signout());
  };

  const onFailure = () => {
    console.log('Handle failure cases');
  };

  const { signOut } = useGoogleLogout({
    clientId,
    onLogoutSuccess,
    onFailure,
  });

  return (
    <button onClick={signOut}>
      Log Out
    </button>
  );
}

export default GoogleLogout;