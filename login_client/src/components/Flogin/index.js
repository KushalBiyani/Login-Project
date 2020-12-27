import React from 'react';
import { useSelector, useDispatch } from "react-redux";
import { signup, login } from "../../actions";
import { Redirect } from 'react-router-dom';
import FacebookLogin from 'react-facebook-login';

function FLogin() {
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    const responseFacebook = (response) => {
        console.log(response);
        const user = {
            firstName: response.name,
            lastName: response.name,
            email: response.email,
            password: response.id,
            gender: response.gender,
            dateOfBirth: response.birthday,
            profilePicture : response.picture.data.url,
            type : "Facebook"
        };
        dispatch(signup(user));
        const user1 = {
            email: response.email,
            password: response.id,
        };
        dispatch(login(user1));
        if (auth.authenticate) {
            return <Redirect to={`/home`} />
        }
    }
    return (
        <FacebookLogin
            appId="1558403081027726"
            autoLoad={true}
            fields="name,email,picture.type(large),birthday ,gender"
            cssClass="my-facebook-button-class"
            scope="user_gender"
            icon="fa-facebook"
            size = "medium"
            callback={responseFacebook} />
    )
}
export default FLogin;