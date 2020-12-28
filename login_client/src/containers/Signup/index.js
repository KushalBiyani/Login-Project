import React, { useState, useEffect } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";
import "./styles.css";

const Signup = (props) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setgender] = useState("");
  const [dateOfBirth, setdateOfBirth] = useState(new Date());
  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user.loading) {
      setFirstName("");
      setLastName("");
      setEmail("");
      setPassword("");
      setgender("");
      setdateOfBirth("");
    }
  }, [user.loading]);

  const userSignup = (e) => {
    e.preventDefault();
    const user = {
      firstName,
      lastName,
      email,
      password,
      gender,
      dateOfBirth,
      type: "App",
      profilePicture:"https://www.seekpng.com/png/small/413-4139803_unknown-profile-profile-picture-unknown.png"
    };
    dispatch(signup(user));
  };

  if (auth.authenticate) {
    return <Redirect to={`/home`} />;
  }

  if (user.loading) {
    return <p>Loading...!</p>;
  }
  return (
    <div className="container">
      <div className="container d-flex justify-content-center align-items-center">
        <form onSubmit={userSignup} className="card logup-card">
          <div className="p-3 border-bottom d-flex align-items-center justify-content-center">
            <h5>Sign Up</h5>
          </div>
          <div className="p-3 px-4 py-4 border-bottom">
            <div className="form">
              <div className="row">
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First name"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div className="col">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last name"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>
              <input
                type="text"
                className="form-control mb-2"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="row">
                <div className="col">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Date of Birth"
                    selected={dateOfBirth}
                    onChange={(e) => setdateOfBirth(e.target.value)}
                    value={dateOfBirth}
                  />
                </div>
                <div className="col">
                  <select
                    id="inputState"
                    className="form-control"
                    defaultValue={gender}
                    onChange={(e) => setgender(e.target.value)}
                  >
                    <option value="" disabled selected>
                      Gender
                    </option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>
            </div>
            <button className="btn btn-danger btn-block continue">
              Register
            </button>
            <div className="d-flex justify-content-center align-items-center mt-3 mb-3">
              <span className="line"></span>
              <small className="px-2 line-text">OR</small>
              <span className="line"></span>
            </div>
            <div className="p-3 d-flex flex-row justify-content-center align-items-center member">
              <span>Already a member? </span>{" "}
              <a href="/signin" className="text-decoration-none ml-2">
                SIGN IN
              </a>{" "}
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Signup;
