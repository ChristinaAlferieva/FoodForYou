import React from 'react';

import './nutriScore.css';

const NutriScore = (props) => {
  const { score, extraClass } = props;
  return (<>
    {score !== undefined ?
      <div className="nutriScore">
        <img className={`${extraClass} nutriImage`} alt={`Nutrition score ${score}`} src={`https://static.openfoodfacts.org/images/misc/nutriscore-${score}.svg`} />
      </div>
      :
      ''
    }
    </>
  );
};

export default NutriScore;
