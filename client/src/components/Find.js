import React from 'react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import RecipeOfDay from './RecipeOfDay';

import '../style/FindStyle.css';

function Find() {
    const [input, setInput] = useState("");
    const navigate = useHistory();

    const submitHandler = (e) => {
        e.preventDefault();
        navigate.push('/Found/' + input);
    };

    return (
        <div>
            <form className = "search" onSubmit={submitHandler}> 
                <div>
                    <FaSearch></FaSearch>
                    <input 
                    onChange={(e) => setInput(e.target.value)} 
                    type="text" 
                    value={input} 
                    />
                </div>
            </form>
            <RecipeOfDay />
        </div>
    );
};



export default Find;