import React, { useState } from "react";
import { Link } from 'react-router-dom';

import Trash2 from 'react-feather/dist/icons/trash-2';
import ArrowRight from 'react-feather/dist/icons/arrow-right';
import HistoryHandler from './historyHandler';

import './historyDisplay.css';

const HistoryDisplay = () => {

  const [ products, setProducts ] = useState(HistoryHandler.getProducts());

  const deleteProduct = (id) => {
    setProducts(HistoryHandler.deleteProduct(id));
  }

  return (
    <div className="container">
      {products === null ?
        <div className="noHistory">
          <h2> Scan products to see them here! </h2>
        </div>
        :
        products.map((x) => {
        const { thumb, name } = JSON.parse(x.data);
        return (
        <div key={name} className="historyList">
          <div className="historyDelete">
            <button type="button" className="deleteBtn" onClick={() => deleteProduct(x.code)}>
              <Trash2 size={20} />
            </button>
          </div>
          <Link className="historyLink" to={`/product/${x.code}`}>
          <div className="historyImgWrapper">
            {thumb ?
              <img src={thumb} className="historyImg" alt={`${name} thumb`}/>
              :
              <div className="noHistoryImg">
                Picture not found
              </div>
            }
          </div>
          <div className="historyText">
            <h2 className="historyTitle">{name}</h2>
            <div className="historyBarcode">{x.code}</div>
          </div>
            <ArrowRight className="historyArrow" size={20} />
          </Link>
        </div>)
      }
      )}
    </div>
  );
};

export default HistoryDisplay;
