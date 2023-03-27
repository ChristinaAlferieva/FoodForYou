import React from 'react';
import { FiPhone } from 'react-icons/fi';
import { IoMailOutline } from 'react-icons/io5';

import '../style/FooterStyle.css';

function MainFooter() {
    return (
        <>
            <footer class="footer-light">
                <div class="container">
                    <div class="row">
                        <div class="col-sm-6 col-md-3 item">
                            <h3 class="footer-links-title">Useful Links</h3>
                            <div class="footer-links">
                                <a href="/">What is FoodForYou<br></br></a>
                                <a href="/Find">Search Recipes<br></br></a>
                                <a href="/ProductScanner">Scan Products</a>
                            </div>
                        </div>
                        
                        <div class="col-sm-6 col-md-3 item">
                            <h3>Cities</h3>
                            <div class="footer-links">
                            <p>Dublin</p>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-3 item">
                            <h3>Register</h3>
                            <div class="footer-links">
                            <a href="/auth">Register and Login Now</a>
                            </div>
                        </div>

                        <div class="col-sm-6 col-md-3 item">
                            <h3>Connect with us</h3>
                            <div class="footer-links">
                            <p><FiPhone style={{ fontSize: '25px', paddingRight: '1%' }} />1234567890<br></br></p>
                            <p><IoMailOutline style={{ fontSize: '25px', paddingRight: '1%' }} />foodforyou@gmail.com</p>
                            </div>
                        </div>
                    </div>
                    <p class="copyright">FoodForYou © 2023</p>
                </div>
            </footer>
        </>
    )
};

export default MainFooter;