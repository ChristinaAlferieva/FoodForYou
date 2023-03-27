import React, { useState, useEffect } from 'react';
import ProductDataDisplay from './ProductDataDisplay';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import './productDisplay.css';

const ProductDisplay = (props) => {

  const [productInfo, setProductInfo] = useState(null);

  const onInfoFetched = (result) => {
    setProductInfo(result);
    setIsLoading(false);
  }

  useEffect(() => {
    fetch(`https://world.openfoodfacts.org/api/v0/product/${props.match.params.id}.json`)
      .then(res => res.json())
      .then(res => onInfoFetched(res));
  }, []);

  return (

    <>
      <div>
        {productInfo !== null ? <ProductDataDisplay data={productInfo} /> : ""}
      </div>
      <Button
        as={Link} to="/history"
        variant="warning"
        className="me-2 historyButton ">
        Back To History
      </Button>
    </>
  );
};

export default ProductDisplay;
