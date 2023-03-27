import React, { useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';

import { HistoryHandler } from '../history';
import './productDisplay.css';

import ProductDataFilter from './ProductDataFilter';
import ProductDisplayTitle from './ProductDisplayTitle';
import NutrientLevels from './NutrientLevels';
import DietaryData from './DietaryData';
import NutriScore from '../nutriScore';
import NovaGroup from '../novaGroup';
import EcoScore from '../ecoScore';
import Additives from './additives';
import AddProductInfo from '../addProductInfo';


const ProductDataDisplay = ({ data }) => {
  const { code, status, product } = data;
  const [p, setP] = useState(undefined);

  useEffect(() => {
    if (status === 1) {
      const filteredProduct = new ProductDataFilter(product);
      setP(filteredProduct);
      HistoryHandler.addProduct(code, filteredProduct.productDataThumbView());
    }
  }, []);

  if (status !== 1) {
    return <Redirect
      to={{
        pathname: '/product/not-found',
        search: `?code=${code}`
      }}
    />;
  }

  return (
    <div>
      <div className="containerDisplay">
        <ProductDisplayTitle code={code} productName={product.product_name} thumb={product.image_thumb_url} />
        <div className="productScores">
          <NutriScore className = "scores" score={product.nutrition_grades}/>
          <EcoScore className = "scores" score={product.ecoscore_grade} />
          <NovaGroup className = "scores" group={product.nova_group} tag={product.nova_groups_tags} />
        </div>
        {p !== undefined ?
          (<>
            <NutrientLevels product={p} />
            <DietaryData product={p} />
            <Additives product={p} />
          </>)
          :
          <> </>
        }
      </div>
      <div className="disclaimer">
        <AddProductInfo status={status} barcode={code} />
      </div>
    </div>
  );
};

export default ProductDataDisplay;
