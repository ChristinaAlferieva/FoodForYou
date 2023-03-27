import React, { useState } from 'react';
import AddProductInfo from '../addProductInfo';

import BarcodeInputField from '../barcodeInputField';

import './productNotFound.css';

const ProductNotFound = (props) => {
  const { location } = props;

  const [ code ] = useState(new URLSearchParams(location.search).get('code'));

    return (<div className="NotFoundContainer">
      <h3>Product not found!</h3>
      <br></br>
      <p>The barcode {code} was not found</p>
      <br></br>
      <br></br>
      <br></br>
      <p>Enter the barcode below to try again:</p>
      <BarcodeInputField />
      <AddProductInfo />
    </div>)
};

export default ProductNotFound;
