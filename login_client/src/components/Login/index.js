import React from "react";
import { useDispatch } from "react-redux";
import { signup, login } from "../../actions";
import { Redirect } from "react-router-dom";
import { useGoogleLogin } from "react-google-login";


// refresh token
import { refreshTokenSetup } from "../../helpers/refreshToken";

const clientId =
  "1082435044632-sopncjtmcio3b7gin0fiam1vivhp7lab.apps.googleusercontent.com";

function GoogleLogin() {
  const dispatch = useDispatch();
  const onSuccess = (res) => {
    console.log("Login Success: currentUser:", res.profileObj);
    const user = {
      firstName: res.profileObj.givenName,
      lastName: res.profileObj.familyName,
      email: res.profileObj.email,
      password: res.profileObj.googleId,
      gender: "Not Available",
      dateOfBirth: "    Not Available",
      profilePicture: res.profileObj.imageUrl,
      type: "Google",
    };
    dispatch(signup(user));
    const user1 = {
      email: res.profileObj.email,
      password: res.profileObj.googleId,
    };
    dispatch(login(user1));
    alert(
      `Logged in successfully welcome ${res.profileObj.name} . \n See console for full profile object.`
    );
    refreshTokenSetup(res);
    if (res.status === 200) {
      return <Redirect to={`/home`} />;
    }
  };

  const onFailure = (res) => {
    console.log("Login failed: res:", res);
    alert(`Failed to login.`);
  };

  const { signIn } = useGoogleLogin({
    onSuccess,
    onFailure,
    clientId,
    isSignedIn: true,
    accessType: "offline",
    scope: "https://www.googleapis.com/auth/plus.login",
    type: "submit",
  });

  return (
    <button
      onClick={signIn}
      className=" btn-block continue google-button d-flex justify-content-start align-items-center"
    >
      
      <i className="fa fa-google ml-2"></i>
      <span className="ml-5 px-4">Login with Google</span>
    </button>
  );
}

export default GoogleLogin;
