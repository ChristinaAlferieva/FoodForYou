import React from 'react';

const ProductDisplayTitle = ({productName, code, thumb}) => (
  <div className="titleContainer">
    <div className="thumbContainer">
      {thumb ?
        <img className="imgFound" src={thumb} alt="Product Image" />
        :
        <div className="imgNotFound">
          Image not found
        </div>
      }
    </div>
    <div className="textContainer">
      <h3 className="title">{productName}</h3>
      <div className="barcode">{code}</div>
    </div>
  </div>
);

export default ProductDisplayTitle;
