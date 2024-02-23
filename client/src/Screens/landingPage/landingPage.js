import React from 'react';
import './landingPage.css';
import { Button, Container, Row, Col } from 'react-bootstrap';

export const LandingPage = () => {
  // useEffect(() => {
  //   const userInfo = localStorage.getItem('userInfo');
  //   if (userInfo) {
  //     history.push('/mynotes');
  //   }
  // }, [history]);

  return (
    <div className='main'>
      <Container>
        <Row>
          <div className='intro-text'>
            <Col>
              <div>
                <h1 className='title'>Welcome to Notes</h1>
                <p className='subtitle'>One safe place for All your Notes!</p>
              </div>
            </Col>
            <div className='buttonContainer'>
              <a href='/login'>
                <Button size='lg' className='landingbutton'>
                  Login
                </Button>
              </a>
              <a href='/register'>
                <Button
                  size='lg'
                  className='landingbutton'
                  variant='outline-primary'
                >
                  Sign Up
                </Button>
              </a>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};
