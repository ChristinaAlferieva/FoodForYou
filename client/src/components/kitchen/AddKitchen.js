import React from 'react';
import { useState } from 'react';
import axios from 'axios';
import { Box, InputLabel, TextField, Typography, Button } from '@mui/material';
import { useHistory } from 'react-router-dom';


const labelStyles = {
    mb: 1,
    mt: 2,
    fontSize: '24px',
    fontWeight: 'bold',
    color: 'black'
}

function AddKitchen() {
    const history = useHistory();
    const [inputs, setInputs] = useState({
        title: "",
        description: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputs({ ...inputs, [name]: value})
    };
    const sendRequest = async() => {
        const res = await axios.post("http://localhost:4000/api/kitchen/add", {
            title: inputs.title,
            description: inputs.description,
            user: localStorage.getItem("userId")
        })
        .catch(err => console.log(err));
        const data = await res.data;
        return data;
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(inputs);
        sendRequest().then((data) => console.log(data))
        .then(() => history.push("/myKitchens"));
    };

    return (
        <div>
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
                        color="black"
                        variant="h3"
                        textAlign={'center'}
                    >Add Item To Your Kitchen</Typography>
                    <InputLabel sx={labelStyles}>Title</InputLabel>
                    <TextField
                        name="title"
                        onChange={handleChange}
                        value={inputs.title}
                        margin='auto'
                        variant="outlined" />
                    <InputLabel sx={labelStyles}>Quantity</InputLabel>
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
        </div>
    );
};

export default AddKitchen;