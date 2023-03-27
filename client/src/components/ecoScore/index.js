import React from 'react';

const EcoScore = ({ score }) => {
  if (!score) {
    return null;
  }

  return <img
  className="nutriDetail nutriImage"
    src={`https://static.openfoodfacts.org/images/attributes/ecoscore-${score}.svg`}
    alt="ecoscore" />
}

export default EcoScore;
