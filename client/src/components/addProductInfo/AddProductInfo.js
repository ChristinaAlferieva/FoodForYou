import React from 'react';

import './addProductInfo.css';

const AddProductInfo = (status) => (
  <div className="disclaimer">
    <p>
    All the information provided comes from the
    <a target="_blank" rel="noopener noreferrer" href="https://world.openfoodfacts.org/">Open Food Facts</a> Database.
    </p>
    <div>
    {status.status === 1 ?
      <p>You can extend the information of this product in
        <a target="_blank" rel="noopener noreferrer" href={`https://world.openfoodfacts.org/product/${status.barcode}`}>here</a> 
      </p>
      :
      <p>To contribute click
        <a target="_blank" rel="noopener noreferrer" href="https://world.openfoodfacts.org/contribute">here</a> 
      </p>
    }
    </div>
  </div>
);

export default AddProductInfo;
