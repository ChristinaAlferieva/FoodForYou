import React from "react";

import './novaGroup.css';

const NovaGroup = ({ group, tag }) => {
  if (!group || !tag) {
    return "";
  }

  const transformTag = () =>
    tag.filter(x => x.startsWith('en'))[0]
       .split('en:')[1]
       .slice(1)
       .split('-')
       .join(' ');

  return (<div className="novaContainer">
      <img className="novaImage" alt={transformTag()} src={`https://static.openfoodfacts.org/images/misc/nova-group-${group}.svg`} />
      <div className="novaCaption">{transformTag()}</div>
    </div>);
};

export default NovaGroup;
