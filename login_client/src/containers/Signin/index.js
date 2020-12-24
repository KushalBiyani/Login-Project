import React, { useState } from 'react';
import { Container, Form, Row, Col, Button } from 'react-bootstrap';
import Input from '../../components//Input';
import { login } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import {connect} from 'react-redux';

/**
* @author
* @function Signin
**/

const Signin = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    //const [error, setError] = useState('');
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const userLogin = (e) => {
        e.preventDefault();
        const user = {
            email, password
        }
        dispatch(login(user));
    }

    if (auth.authenticate) {
        return <Redirect to={`/`} />
    }

    return (

        <Container>
            <Row style={{ marginTop: '50px' }}>
                <Col md={{ span: 6, offset: 3 }}>
                    <Form onSubmit={userLogin}>
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
                        <Button variant="primary" type="submit">
                            Submit
                            </Button>
                    </Form>
                </Col>
            </Row>

        </Container>

    )

}
const mapStatetoProps = (state) => {
    return {
        email: state.user.email,
        password: state.user.password,
    }
}

const mapDispatchtoProps = (dispatch) => {
    return {
        login: function (email, password) {
            dispatch(login(email, password));
        },

    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(Signin);