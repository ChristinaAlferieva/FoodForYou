import React from 'react';
import { useEffect, useState } from 'react';
import { Splide, SplideSlide } from '@splidejs/react-splide';
import '@splidejs/splide/dist/css/splide.min.css';
import { Link } from 'react-router-dom';

import image from '../images/image.png';
import image1 from '../images/image1.PNG';
import image2 from '../images/image2.PNG';
import image3 from '../images/image3.PNG';
import backimg from '../images/backimg.jpg';

import '../style/PopularPicks.css';

function PopularPicks() {
    const [popularPicks, setPopularPicks] = useState([]);

    useEffect(() => {
        getPopularPicks();
    }, []);

    const getPopularPicks = async () => {
        const check = localStorage.getItem("popularPicks");

        if (check) {
            setPopularPicks(JSON.parse(check));
        } else {
            const api = await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=12`
            );
            const data = await api.json();

            localStorage.setItem("popularPicks", JSON.stringify(data.recipes));
            setPopularPicks(data.recipes);
            console.log(data.recipes);
        };
    };


    return (
        <div>
            <div class="container" style={{ marginTop: '2%' }}>
                <div class="row">
                    <div class="col-md-12 col-lg-6">
                        <div class="container"><img src={image} style={{ width: '100%', height: '80%' }} /></div>
                    </div>
                    <div class="col-md-12 col-lg-6">
                        <div class="container" style={{ marginTop: '7%' }}>
                            <div class="base_header"><span><small class="bor_header_left"></small>WE ARE FOODFORYOU<small class="bor_header_right"></small></span>
                                <h3>Want to make cooking easy and free?</h3>
                                <br></br>
                            </div>
                            <div class="base_footer">
                                <p>We get it. Ease yourself into cooking and learning more about food! <br></br><br></br>At FoodForYou,
                                    with our user-friendly interface, you can easily search and browse through delicious recipes.
                                    Our recipes are carefully curated by our team of culinary experts,so you can trust that every dish you make will be both tasty and foolproof.
                                    <br></br>
                                    <br></br>
                                    So whether you're a seasoned chef or just starting out, our website has something for everyone.
                                    Start exploring today and take your love for food to the next level!</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="steps" style={{ backgroundImage: `url(${backimg})` }}>
                <div class="base_header text-center" style={{ paddingTop: '2%' }}>
                    <h3>How does it work?</h3>
                </div>
                <div class="container" style={{ marginTop: "3%", paddingBottom: '3%' }} >
                    <div class="row">
                        <div class="col-md-4 text-center steps">
                            <div><img src={image1} alt="step1" />
                                <h4><strong><br></br>Search Recipes</strong></h4>
                                <br></br>
                                <p>Make cooking easy and fun by searching recipes based on the ingredients you have at hand</p>
                            </div>
                        </div>
                        <div class="col-md-4 text-center steps">
                            <div><img src={image2} alt="step2" />
                                <h4><strong><br></br>Scan Products</strong></h4>
                                <br></br>
                                <p>Scan barcodes and instantly access detailed product information, making grocery shopping a breeze</p>
                            </div>
                        </div>
                        <div class="col-md-4 text-center steps">
                            <div><img src={image3} alt="step3" />
                                <h4><strong><br></br>Share Blogs</strong></h4>
                                <br></br>
                                <p>Looking for some inspiration, our blogs offer a wealth of information on everything from cooking techniques to recipes created</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div class="container">
                <div class="base_header text-center" style={{ paddingTop: '2%' }}>
                    <h3>Popular Picks For You</h3>
                    <br></br>
                    <br></br>
                </div>

                    <Splide options={{
                        perPage: 3,
                        drag: 'free',
                        gap: '9rem',
                    
                        breakpoints: {
                            1000: {
                                perPage: 1,
                                gap: '1rem',
                            }
                        }
                    }}>
                        {popularPicks.map((recipe) => {
                            return (
                                <SplideSlide key={recipe.id}>
                                    <div class="card ">
                                        <Link to={'/Recipe/' + recipe.id}>
                                            <img class="card-img-top" src={recipe.image} alt={recipe.title} />
                                            <div class="card-body">
                                                <h5 class="card-title">{recipe.title}</h5>
                                            </div>
                                            <div class="gradient" />
                                        </Link>
                                    </div>
                                </SplideSlide>
                            );
                        })}
                    </Splide>
                </div>
            </div>
        </div>
    )
};


export default PopularPicks;