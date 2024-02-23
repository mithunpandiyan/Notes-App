import React, {useState } from 'react';
import './loginScreen.css';
import MainScreen from '../../Components/MainScreen';
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Loading from '../../Components/Loading';
import ErrorMessage from '../../Components/ErrorMessage';

export const LoginScreen = ({ history }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault(); /// important code needed to be added e.preventDefault()
    try {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };
      setLoading(true);

      const { data } = await axios.post(
        './api/users/login',
        {
          email,
          password,
        },
        config
      );
      console.log(data);
      localStorage.setItem('userInfo', JSON.stringify(data));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setError(error.response.data.message);
      setLoading(false);
    }
  };

  return (
    <>
      <MainScreen title='Login'>
        <div className='loginContainer'>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter the Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter the Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Button variant='primary' type='submit'>
              Submit
            </Button>
          </Form>
          <Row className='py-3'>
            <Col>
              New Customer ? <Link to='/register'>Register Here</Link>
            </Col>
          </Row>
        </div>
      </MainScreen>
    </>
  );
};
