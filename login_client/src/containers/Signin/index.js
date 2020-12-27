import React, { useState } from "react";
import { login } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import GoogleLogin from "../../components/Login";
import FLogin from "../../components/Flogin";
import "./styles.css";

const Signin = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const userLogin = (e) => {
    e.preventDefault();
    const user = {
      email,
      password,
    };
    dispatch(login(user));
  };
  if (auth.authenticate) {
    return <Redirect to={`/home`} />;
  }

  return (
    <div className="container">
      <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={userLogin} className="card logim-card">
          <div className="p-3 border-bottom d-flex align-items-center justify-content-center">
            <h5>Sign in</h5>
          </div>
          <div className="p-3 px-4 py-4 border-bottom">
            {" "}
            <input
              type="text"
              className="form-control mb-2"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="form">
              <input
                type="text"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button className="btn btn-danger btn-block continue">
              Continue
            </button>
            <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
              <span className="line"></span>
              <small className="px-2 line-text">OR</small>
              <span className="line"></span>
            </div>
            <button className=" btn-block continue blue">
              <FLogin />
            </button>
            <GoogleLogin />
            <div className="p-3 d-flex flex-row justify-content-center align-items-center member">
              <span>Not a member? </span>{" "}
              <a href="/signup" className="text-decoration-none ml-2">
                SIGN UP
              </a>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signin;
