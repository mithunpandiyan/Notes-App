import React from 'react';
import { Form, Nav, Navbar, NavDropdown, Container } from 'react-bootstrap';
import './Header.css';
import { Link, useHistory } from 'react-router-dom';

export const Header = () => {
  let history = useHistory();
  return (
    <Navbar
      bg='primary'
      variant='dark'
      expand='lg'
      className='bg-body-tertiary'
    >
      <Container>
        <Navbar.Brand>
          <Link to='/'>Notes App</Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls='navbarScroll' />
        <Navbar.Collapse id='navbarScroll'>
          <Nav className='m-auto my-2 my-lg-0' style={{ maxHeight: '100px' }}>
            <Form className='d-flex'>
              <Form.Control
                type='search'
                placeholder='Search'
                className='me-2'
                aria-label='Search'
                autoComplete='true'
              />
            </Form>
            <Nav className='mx-5 justify-content-end'>
              <Nav.Link id='RouterNavLink' href='#action1'>
                <Link to='/mynotes'>My Notes</Link>
              </Nav.Link>
              <NavDropdown title='Mithun P'>
                <NavDropdown.Item href='#action3'>My Profile</NavDropdown.Item>
                <NavDropdown.Item
                  onClick={() => {localStorage.removeItem('userInfo')
                  history.push("/")
                  }
                  }
                >
                  Logout{' '}
                </NavDropdown.Item>
                <NavDropdown.Divider />
              </NavDropdown>
            </Nav>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
