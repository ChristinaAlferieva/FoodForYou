import React from 'react';
import { useState } from 'react';
import { authActions } from '../store/index.js';
import { Box, Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import '../style/AuthStyle.css';


function Auth() {
  const history = useHistory();

  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: ""
  });

  const [isSignup, setIsSignup] = useState(false);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value })
  };

  const sendRequest = async (type = "login") => {
    const res = await axios
      .post(`http://localhost:4000/api/user/${type}`, {
        name: inputs.name,
        email: inputs.email,
        password: inputs.password
      })
      .catch((err) => console.log(err));

    const data = await res.data;
    console.log(data);
    return data;
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    if (isSignup) {
      sendRequest("signup")
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => history.push("/"))
        .then((data) => console.log(data));
    } else {
      sendRequest()
        .then((data) => localStorage.setItem("userId", data.user._id))
        .then(() => dispatch(authActions.login()))
        .then(() => history.push("/blogs"))
        .then((data) => console.log(data));
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box className="box">
          <Typography variant="h2" padding={3} textAlign="center">{isSignup ? "Signup" : "Login"}</Typography>
          {isSignup && (
            <TextField
              name="name"
              onChange={handleChange}
              value={inputs.name}
              placeholder="Name"
              margin="normal" />
          )} {" "}
          <TextField
            name="email"
            onChange={handleChange}
            value={inputs.email}
            type={'email'}
            placeholder="Email"
            margin="normal" />
          <TextField
            name="password"
            onChange={handleChange}
            value={inputs.password}
            type={'password'}
            placeholder="Password"
            margin="normal" />
          <Button
            type='submit'
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3, backgroundColor: 'orange' }}
            color="warning"
          >
            Submit
          </Button>
          <Button
            onClick={() => setIsSignup(!isSignup)}
            sx={{ borderRadius: 3, marginTop: 3 }}>
            Change To {isSignup ? "Login" : "Signup"}
          </Button>
        </Box>
      </form>
    </div>
  )
}

export default Auth;