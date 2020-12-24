import React, { useState } from "react";
import { Container, Form, Row, Col, Button } from "react-bootstrap";
import Input from "../../components/Input";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";
import { useEffect } from "react";

/**
 * @author
 * @function Signup
 **/

const Signup = (props) => {
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [gender, setgender] = useState("");
    const [dateOfBirth, setdateOfBirth] = useState("");
    const [error, setError] = useState("");
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
        };

        dispatch(signup(user));
    };

    if (auth.authenticate) {
        return <Redirect to={`/`} />;
    }

    if (user.loading) {
        return <p>Loading...!</p>;
    }

    return (

        <Container>
            {user.message}
            <Row style={{ marginTop: "50px" }}>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={userSignup}>
                        <Row>
                            <Col md={6}>
                                <Input
                                    label="First Name"
                                    placeholder="First Name"
                                    value={firstName}
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                            </Col>
                            <Col md={6}>
                                <Input
                                    label="Last Name"
                                    placeholder="Last Name"
                                    value={lastName}
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)}
                                />
                            </Col>
                        </Row>

                        <Input
                            label="Email"
                            placeholder="Email"
                            value={email}
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                        />

                        <Input
                            label="Password"
                            placeholder="Password"
                            value={password}
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Col md={6}>
                            <Input
                                label="gender"
                                placeholder="gender"
                                value={gender}
                                type="text"
                                onChange={(e) => setgender(e.target.value)}
                            />
                            <Input
                                label="dateOfBirth"
                                placeholder="dateOfBirth"
                                value={dateOfBirth}
                                type="date"
                                onChange={(e) => setdateOfBirth(e.target.value)}
                            />
                        </Col>
                        <Button variant="primary" type="submit">
                            Submit
              </Button>
                    </Form>
                </Col>
            </Row>
        </Container>

    );
};

export default Signup;