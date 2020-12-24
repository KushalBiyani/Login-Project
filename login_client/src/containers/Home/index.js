import React, { useEffect, useState } from 'react';
import {  useDispatch } from "react-redux";
import { signout } from "../../actions";

/**
* @author
* @function Home
**/
const Home = (props) => {
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };
  const user = window.localStorage.getItem('user');
  var token = JSON.parse(user);
  var Birthday = token.dateOfBirth.substring(0,10);
  
  return (
    <div>
     <h1>{token.firstName}</h1>
      <h1>{token.lastName}</h1>
      <h1>{token.email}</h1>
      <h1>{token.gender}</h1>
      <h1>{Birthday}</h1> 
      <span className="nav-link" onClick={logout}>
            Signout
          </span>
    </div>
    
  )

}

export default Home