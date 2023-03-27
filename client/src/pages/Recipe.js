import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import '../style/RecipeStyle.css';

function Recipes() {
    let params = useParams();
    const [info, setInfo] = useState({});
    const [activeTab, setActiveTab] = useState("instructions");

    const fetchInfo = async () => {
        const data = await fetch(`https://api.spoonacular.com/recipes/${params.name}/information?apiKey=${process.env.REACT_APP_API_KEY}`)
        const infoData = await data.json();
        setInfo(infoData);
    }

    useEffect(() => {
        fetchInfo();
    }, [params.name]);

    return (
        <div>
            <div className = "container">
                <div className = "row">
                    <div className ="col-md-12 col-lg-6">
                        <h2>{info.title}:</h2>
                        <img className = "recipeImg" src={info.image} alt="" />
                        <h3>Duration in minutes:</h3>
                        <p dangerouslySetInnerHTML={{ __html: info.readyInMinutes }}></p>
                    </div>

                    <div className ="col-md-12 col-lg-6">
                        <div className = "container">
                            <button id = "button" className={activeTab === 'ingredients' ? 'active' : ''}
                                onClick={() => setActiveTab("ingredients")}>Ingredients</button>
                            <button id = "button" className={activeTab === 'instructions' ? 'active' : ''}
                                onClick={() => setActiveTab("instructions")}>Instructions</button>
                            {activeTab === 'ingredients' && (
                                <ul>
                                    {info.extendedIngredients.map((product) =>
                                        <li key={product.id}>{product.original}</li>
                                    )}
                                </ul>
                            )}
                            {activeTab === 'instructions' && (
                                <div>
                                    <p dangerouslySetInnerHTML={{ __html: info.instructions }}></p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};


export default Recipes;
