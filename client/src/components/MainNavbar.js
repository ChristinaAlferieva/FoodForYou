import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import { authActions } from '../store/index.js';
import '../style/NavBarStyle.css';

const MainNavbar = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.isLoggedIn);

  return (
    <Navbar expand="md" sticky="top">
      <Navbar.Brand className="nav-title">FoodForYou</Navbar.Brand>
      <Navbar.Toggle />
      <Navbar.Collapse>
        <Nav className="ml-auto">
          {isLoggedIn && (
            <>
              <Nav.Link className="nav-link" as={Link} to="/blogs">All Blogs</Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/myBlogs">My Blogs</Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/blogs/add">Add Blog</Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/myKitchens">My Kitchen</Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/kitchens/add">Add Kitchen Item</Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/Find">Search Recipe</Nav.Link>
              <Nav.Link className="nav-link" as={Link} to="/ProductScanner">Scan Product</Nav.Link>
            </>
          )}
          {!isLoggedIn && (
            <>
              <Nav.Link className="nav-link" activeClassName="underline" as={Link} to="/">Main Page</Nav.Link>
              <Nav.Link className="nav-link" activeClassName="underline" as={Link} to="/ProductScanner">Scan Product</Nav.Link>
              <Nav.Link className="nav-link" activeClassName="underline" as={Link} to="/Find">Search Recipe</Nav.Link>
            </>
          )}
        </Nav>
        <Nav>
          {!isLoggedIn && (
            <Button
              as={Link} to="/auth"
              variant="warning"
              className="me-2">
              Login
            </Button>
          )}
          {isLoggedIn && (
            <Button
              onClick={() => dispatch(authActions.logout())}
              as={Link} to="/"
              variant="warning"
              className="me-2">
              Log Out
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  )
};

export default MainNavbar;
