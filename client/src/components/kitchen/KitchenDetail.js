import React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';
import axios from 'axios';

const labelStyles = {
  mb: 1,
  mt: 2,
  fontSize: '24px',
  fontWeight: 'bold'
}

function KitchenDetail() {
  const history = useHistory();
  const [kitchen, setKitchen] = useState();
  const id = useParams().id;
  console.log(id);

  const [inputs, setInputs] = useState({
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputs({ ...inputs, [name]: value})
  };

  useEffect(() => { });
  const fetchDetails = async () => {
    const res = await axios.get(`http://localhost:4000/api/kitchen/${id}`)
      .catch(err => console.log(err))
    const data = await res.data;
    return data;
  }

  useEffect(() => {
    fetchDetails().then((data) => {
      setKitchen(data.kitchen)
      setInputs({ 
        title: data.kitchen.title, 
        description: data.kitchen.description, 
      });
    });
  }, [id]);
  
  const sendRequest = async () => {
    const res = await axios.put(`http://localhost:4000/api/kitchen/update/${id}`, {
      title: inputs.title,
      description: inputs.description
    })
    .catch(err => console.log(err));

    const data = await res.data;
    return data;
  };

  console.log(kitchen);
  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(inputs);
    sendRequest()
    .then((data) => console.log(data))
    .then(() => history.push("/myKitchens/"));
  };

  return (
    <div>
      {inputs &&
        <form onSubmit={handleSubmit}>
          <Box
            border={3}
            borderColor="lightblue"
            borderRadius={10}
            boxShadow="10px 10px 20px #ccc"
            padding={3}
            margin={"auto"}
            marginTop={3}
            display="flex"
            flexDirection={"column"}
            width={"80%"}
          >
            <Typography
              fontWeight={'bold'}
              padding={3}
              color="grey"
              variant="h2"
              textAlign={'center'}
            >Add Item To Your Kitchen</Typography>
            <InputLabel sx={labelStyles}>Title</InputLabel>
            <TextField
              name="title"
              onChange={handleChange}
              value={inputs.title}
              margin='auto'
              variant="outlined" />
            <InputLabel sx={labelStyles}>Description</InputLabel>
            <TextField
              name="description"
              onChange={handleChange}
              value={inputs.description}
              margin='auto'
              variant="outlined" />
            <Button
              type="submit"
              variant="contained"
              color="warning"
              sx={{ mt: 2, borderRadius: 4 }}
            >Submit</Button>
          </Box>
        </form>
      }</div>
  )
};

export default KitchenDetail;