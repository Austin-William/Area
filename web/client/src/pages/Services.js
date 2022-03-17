// Display a descripition what's the app can do.

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaBitcoin, FaGithub, FaTwitter, FaUnsplash } from 'react-icons/fa';
import { TiWeatherPartlySunny } from 'react-icons/ti';
import { SiMyanimelist } from 'react-icons/si';
import { MdOutlineCoronavirus } from 'react-icons/md';
import { GiGamepad } from 'react-icons/gi';
import { BiFootball, BiNews } from 'react-icons/bi';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Services.css";

function Services() {
    const [isShrunk, setShrunk] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1200,
        });
        window.addEventListener('scroll', () => {
            if (window.scrollY > 0) {
                setShrunk(true);
            } else {
                setShrunk(false);
            }
        });
        return () => window.removeEventListener("Header", () => { });
    }, [isShrunk]);

    return (
        <div className={`${isShrunk ? 'Header' : ''}`}>
            <div className="Services-container">
                <div className="Services-header">
                    <Navbar />
                    <div className="Services-description">
                        <h3 className="Services-description-title">
                            What does the app offer
                        </h3>
                        <p className="Services-description-text">
                            The app offers a wide range of services, from the most basic to the most advanced.
                        </p>
                    </div>
                </div>
            </div>
            <div className="Services-offers">
                <h3 className="Services-offers-title" data-aos="fade-up">
                    A wide possibility of connection with ...
                </h3>
                <div className="Services-offers-list">
                    <div className="Services-offers-item">
                        <div className="Services-offers-item-icon">
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="200">
                                <FaTwitter />
                            </div>
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="400">
                                <FaGithub />
                            </div>
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="600">
                                <TiWeatherPartlySunny />
                            </div>
                        </div>
                    </div>
                    <div className="Services-offers-item">
                        <div className="Services-offers-item-icon">
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="200">
                                <FaUnsplash />
                            </div>
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="400">
                                <SiMyanimelist />
                            </div>
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="600">
                                <FaBitcoin />
                            </div>
                        </div>
                    </div>
                    <div className="Services-offers-item">
                        <div className="Services-offers-item-icon">
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="200">
                                <MdOutlineCoronavirus />
                            </div>
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="400">
                                <GiGamepad/>
                            </div>
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="600">
                                <BiFootball />
                            </div>
                        </div>
                    </div>
                    <div className="Services-offers-item">
                        <div className="Services-offers-item-icon">
                            <div className="Services-offers-icon" data-aos="fade-up" data-aos-duration="400">
                                <BiNews/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Services;