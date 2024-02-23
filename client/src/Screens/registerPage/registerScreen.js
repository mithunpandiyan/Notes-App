import React, { useState } from 'react';
import MainScreen from '../../Components/MainScreen';
import { Form, Button, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ErrorMessage from '../../Components/ErrorMessage';
import axios from 'axios';
import Loading from '../../Components/Loading';

export const RegisterScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState('');
  const [pic, setPic] = useState(
    'https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg'
  );
  const [picMessage, setPicMessage] = useState(null);
  const [error, setError] = useState(false);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage('Password do not match');
    } else {
      setMessage(null);
      try {
        const config = {
          headers: { 'Content-Type': 'application/json' },
        };
        setLoading(true);
        const { data } = await axios.post(
          '/api/users',
          {
            name,
            email,
            password,
            pic,
          },
          config
        );
        console.log(data);
        setLoading(false);
        localStorage.setItem('userInfo', JSON.stringify(data));
      } catch (error) {
        setError(error.response.data.message);
      }
    }
  };

  const postDetails = (pics) => {
    if (!pics) {
      return setPicMessage('Please select an Image');
    }
    setPicMessage(null);

    if (pics.type === 'image/jpeg' || pics.type === 'image/png') {
      const data = new FormData();
      data.append('file', pics);
      data.append('upload_preset', 'NoteApp');
      data.append('cloud_name', 'mithunpandiyan');
      fetch('https://api.cloudinary.com/v1_1/mithunpandiyan/image/upload', {
        method: 'post',
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setPic(data.url.toString());
          data.url.toString();
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return setPicMessage('Please select an Image');
    }
  };

  return (
    <>
      <MainScreen title='Register'>
        <div className='loginContainer'>
          {error && <ErrorMessage variant='danger'>{error}</ErrorMessage>}
          {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
          {loading && <Loading />}
          <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
              <Form.Label>Name</Form.Label>
              <Form.Control
                type='name'
                placeholder='Enter the name'
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='formBasicEmail'>
              <Form.Label>Email</Form.Label>
              <Form.Control
                type='email'
                placeholder='Enter the email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='formBasicPassword'>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            <Form.Group controlId='confirmPassword'>
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type='password'
                placeholder='Confirm password'
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              ></Form.Control>
            </Form.Group>
            {picMessage && (
              <ErrorMessage variant='danger'>{picMessage}</ErrorMessage>
            )}
            <Form.Group controlId='pic'>
              <Form.Label>Profile Picture</Form.Label>
              <Form.File
                onChange={(e) => postDetails(e.target.files[0])}
                id='custom-file'
                type='image/png'
                label='Upload Profile Picture'
                custom
              />
            </Form.Group>
            <Button variant='primary' type='submit'>
              Register
            </Button>
            <Row className='py-3'>
              <Col>
                Have an Account ? <Link to='/login'>Login</Link>
              </Col>
            </Row>
          </Form>
        </div>
      </MainScreen>
    </>
  );
};
