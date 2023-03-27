import React from 'react';

const NutrientLevels = (product) => (
  <section className="specialDiet">
    <h3 className="specialTitle">Nutrient Levels</h3>
    {product.product.nutrientLevels() !== undefined ?
      product.product.nutrientLevels().map(x =>
      <div className="listItem" key={x.title}>
        <span className="listLabel">{x.title}:  </span>
        <span className={`listValue ${x.value}`}>{x.value}</span>
      </div>)
      :
      <div className="listUnknown">Unknown <span role="img" aria-label="question emoji">❓</span></div>
    }
  </section>
);

export default NutrientLevels;
