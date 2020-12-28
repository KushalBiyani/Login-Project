import React from 'react';
import { useDispatch } from "react-redux";
import { useGoogleLogout } from 'react-google-login';
import { signout } from "../../actions";
import "./styles.css";
const clientId =
  '1082435044632-m9b363khca741namqa4sec0sevs0j63t.apps.googleusercontent.com';

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
    <button onClick={signOut} className="btn btn-primary">Log Out </button>
  );
}

export default GoogleLogout;