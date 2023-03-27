import React from 'react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import '../style/RecipeOfDayStyle.css';

function RecipeOfDay() {
    const [daily, setDaily] = useState([]);

    useEffect(() => {
        getDaily();
    }, []);

    const getDaily = async () => {
        const check = localStorage.getItem("daily");

        if (check) {
            setDaily(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=1`
            );
            const data = await api.json();

            localStorage.setItem("daily", JSON.stringify(data.recipes));
            setDaily(data.recipes);
            console.log(data.recipes);
        };
    };

    return (
        <div>
            <br></br>
            <div className="container">
                <div class="base_header text-center" style={{ paddingTop: '2%' }}>
                    <h3>Recipe Of The Day</h3>
                    <br></br>
                </div>

                {daily.map((recipe) => {
                    return (
                        <div className="cardRecipe" key={recipe.id}>
                            <Link to={'/Recipe/' + recipe.id}>
                                <p>{recipe.title}</p>
                                <img src={recipe.image} alt={recipe.title} />
                            </Link>
                        </div>
                    )
                })}
            </div>
        </div>
    )
};


export default RecipeOfDay;