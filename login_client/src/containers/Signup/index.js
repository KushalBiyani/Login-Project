import React, { useState } from "react";
import { Redirect } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { signup } from "../../actions";
import { useEffect } from "react";
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import DatePicker from 'react-date-picker';
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
    const [dateOfBirth, setdateOfBirth] = useState(new Date());
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
                        <Form.Row>
                            <Col>
                                <Form.Label>First name</Form.Label>
                                <Form.Control placeholder="First name" value={firstName}
                                    type="text"
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </Col>
                            <Col>
                                <Form.Label>Last name</Form.Label>
                                <Form.Control placeholder="Last name" value={lastName}
                                    type="text"
                                    onChange={(e) => setLastName(e.target.value)} />
                            </Col>
                        </Form.Row>

                        <Form.Group controlId="formGridEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Enter email" value={email}
                                type="email"
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="formGridPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" value={password}
                                type="password"
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>

                        <Form.Row>
                            <Form.Group>
                                <Form.Label>Date Of Birth</Form.Label>
                                <DatePicker
                                    selected={dateOfBirth}
                                    onChange={(e) => setdateOfBirth(e)}
                                    value={dateOfBirth}
                                    format="MM-dd-y"
                                    
                                />
                            </Form.Group>
                            <Form.Group as={Col} controlId="formGridState" >
                                <Form.Label>Gender</Form.Label>
                                <Form.Control as="select"  value={gender}  onChange={(e) => setgender(e.target.value)}>
                                <option value="select">Select</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                    <option value="Other">Other</option>
                                </Form.Control>
                            </Form.Group>
                        </Form.Row>
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