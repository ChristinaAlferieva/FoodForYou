import React from 'react';

const DietaryData = (product) => {
  const displayDietaryDataItem = (condition) => {
    let content;

    if (condition === undefined) {
      content = 'Unknown ❓';
    } else {
      content = condition ? 'Yes' : 'No';
    }

    return (<span className="listValue">
      {content}
    </span>)
  }

  return (<div className="specialDiet">
    <h3 className="specialTitle">Special Diets</h3>
    <div className="listItem">
      <span><span role="img" aria-label="warning">⚠️</span> Palm Oil: &nbsp;</span>
      {displayDietaryDataItem(product.product.containsPalmOil())}
    </div>
    <div className="listItem">
      <span><span role="img" aria-label="wheat">🌾</span> Gluten:	&nbsp;</span>
      {displayDietaryDataItem(product.product.containsGluten())}
    </div>
    <div className="listItem">
      <span><span role="img" aria-label="plant">🌱</span> Plant Based:	&nbsp;</span>
      {displayDietaryDataItem(product.product.isPlantBased())}
    </div>
    <div className="listItem">
      <span><span role="img" aria-label="cow">🐄</span> Lactose:	&nbsp;</span>
      {displayDietaryDataItem(product.product.containsLactose())}
    </div>
  </div>);
};

export default DietaryData;
