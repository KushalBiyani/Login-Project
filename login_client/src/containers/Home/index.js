import React from "react";
import { Icon } from 'semantic-ui-react'
import { useDispatch } from "react-redux";
import { signout } from "../../actions";
import GoogleLogout from "../../components/Logout";
import "./styles.css";

const Home = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };
  const user = window.localStorage.getItem("user");
  var token = JSON.parse(user);
  var Birthday = token.dateOfBirth.substring(3, 15);
  var type = token.type;
  var Log = ""; 
  if (type === "Google") {
     Log = <div className="btn btn-primary"><GoogleLogout/></div>;
  }
    else   {
     Log = <button onClick={logout} className="btn btn-primary"><a href = "/signup">Log Out</a> </button>;
  }
  var Name = ""; 
  if (type === "Facebook") {
    Name = token.firstName;
  }
    else   {
      Name = token.firstName +" "+ token.lastName;
  }

  

  return (
    <div className="container">
      <div className="card" >
        <div className="row">
          <div className="col d-flex justify-content-center">
            <img className="card-img-top" src={token.profilePicture} alt="Profile" />
          </div>
          <div className="col d-flex justify-content-center">
            <div className="card-body">
              <h1 className="card-title">{Name}</h1>
              <h4 className="card-text">
              <Icon name='mail' size='large' /> {token.email} <br /><br />
              <Icon name='user' size='large' /> {token.gender} <br /><br />
              <Icon name='birthday cake' size='large' /> {Birthday}
              </h4>
            </div>
          </div>
        </div>
        {Log}
      </div>
    </div>
  );
};

export default Home;
