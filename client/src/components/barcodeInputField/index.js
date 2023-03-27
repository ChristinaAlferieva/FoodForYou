import React, { useState } from "react";
import { withRouter } from 'react-router';
import { Button } from '@mui/material';

const BarcodeInputField = (props) => {
  const [enteredProduct, setEnteredProduct] = useState(null);

  const onSubmit = (e) => {
    e.preventDefault();
    props.history.push(`/product/${enteredProduct}`);
  }

  const onInputChange = (e) => {
    setEnteredProduct(e.target.value);
  }

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="e.g. 3527463528362" className="barcodeInput" required type="number" onChange={onInputChange} />
      <Button
        type='submit'
        variant="contained"
        sx={{ borderRadius: 3, marginTop: 3, backgroundColor: 'orange', marginBottom: 20 }}
        color="warning"
      >
        Find
      </Button>
    </form>
  )
}

export default withRouter(BarcodeInputField);
