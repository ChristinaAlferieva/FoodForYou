import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';

import '../style/FoundStyle.css';

function Found() {
    const [foundRecipes, setFoundRecipes] = useState([]);
    let params = useParams();

    const getFound = async (name) => {
        const data = await fetch(
            `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&query=${name}`
        );
        const recipes = await data.json();
        setFoundRecipes(recipes.results);
    };

    useEffect(() => {
        getFound(params.find);
    }, [params.find]);

    return (
        <div>
            <button className="button" >
                <a className="search" href="/Find">Search Again</a>
            </button>

            <div className="grid">
                {foundRecipes.map((item) => {
                    return (
                        <div className="cardFound" key={item.id}>
                            <Link to={'/Recipe/' + item.id}>
                                <img src={item.image} alt="" />
                                <h4 className = "cardTitle">{item.title}</h4>
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default Found;