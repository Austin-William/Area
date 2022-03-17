// It's like an about us web page which telling to the user who are we, what matters to you, what we did and maybe how we did it.

import React, { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/About.css";

function About() {

    const [isShrunk, setShrunk] = useState(false);

    useEffect(() => {
        AOS.init({
            duration: 1200
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
            <div className="About-container">
                <div className="About-container">
                    <Navbar />
                    <div className="About-description">
                        <h3 className="About-description-title">
                            About Us
                        </h3>
                        <p className="About-description-text">
                            Who are we ?
                        </p>
                    </div>
                </div>
            </div>
            <div className="About-infos-container">
                <div className="About-infos">
                    <h2 className="About-infos-title" data-aos="fade-up">
                        A team of 6 developers
                    </h2>
                    <div className="About-col">
                        <div className="About-item" data-aos="fade-right">
                            <img src="https://avatars.githubusercontent.com/u/60068251?v=4" alt="Chloé_Chauvin_picture" />
                            <div className="About-description">
                                <h5 className="About-name" data-aos="fade-right" data-aos-duration="300">
                                    Chloé Chauvin
                                </h5>
                                <p className="About-name-description" data-aos="fade-right" data-aos-duration="500">
                                    Full Stack Developer
                                </p>
                            </div>
                        </div>
                        <div className="About-item">
                            <div className="About-description" data-aos="fade-left" data-aos-duration="300">
                                <h5 className="About-name">
                                    Luca Banyols
                                </h5>
                                <p className="About-name-description" data-aos="fade-left" data-aos-duration="500">
                                    Full Stack Developer
                                </p>
                            </div>
                            <img src="https://media.discordapp.net/attachments/689113742650507264/940225668120207430/-i032h1.jpg?width=617&height=617" alt="Luca_Banyols_picture" data-aos="fade-left"/>
                        </div>
                        <div className="About-item">
                            <img src="https://pbs.twimg.com/profile_images/1005469089589092354/64pWZkKT_400x400.jpg" alt="Vincent_Pichot_picture" data-aos="fade-right" />
                            <div className="About-description">
                                <h5 className="About-name" data-aos="fade-right" data-aos-duration="300">
                                    Vincent Pichot
                                </h5>
                                <p className="About-name-description" data-aos="fade-right" data-aos-duration="500">
                                    Full Stack Developer
                                </p>
                            </div>
                        </div>
                        <div className="About-item">
                            <div className="About-description">
                                <h5 className="About-name" data-aos="fade-right" data-aos-duration="300">
                                    Quentin Tréheux
                                </h5>
                                <p className="About-name-description" data-aos="fade-right" data-aos-duration="500">
                                    Full Stack Developer
                                </p>
                            </div>
                            <img src="https://avatars.githubusercontent.com/u/58399237?v=4" alt="Quentin_Tréheux_picture" data-aos="fade-right"/>
                        </div>
                        <div className="About-item">
                            <img src="https://avatars.githubusercontent.com/u/55129304?v=4" alt="Austin-William_Lo_picture" data-aos="fade-right" />
                            <div className="About-description">
                                <h5 className="About-name" data-aos="fade-right" data-aos-duration="300">
                                    Austin-William Lo
                                </h5>
                                <p className="About-name-description" data-aos="fade-right" data-aos-duration="500">
                                    Full Stack Developer
                                </p>
                            </div>
                        </div>
                        <div className="About-item">
                            <div className="About-description">
                                <h5 className="About-name" data-aos="fade-right" data-aos-duration="300">
                                    Dylan Faure
                                </h5>
                                <p className="About-name-description" data-aos="fade-right" data-aos-duration="500">
                                    Full Stack Developer
                                </p>
                            </div>
                            <img src="https://x.boardgamearena.net/data/avatar/0/90/90225/90225055_184.jpg?h=a340193484" alt="Dylan_Faure_picture" data-aos="fade-right" />
                        </div>
                    </div>
                    <div className="About-hr" />
                </div>
                <div className="About-infos-website">
                    <h2 className="About-infos-title" data-aos="fade-down" data-aos-duration="500">
                        Why did we make this website ?
                    </h2>
                    <div className="About-infos-description">
                        <p className="About-website-description" data-aos="fade-down" data-aos-duration="500">
                            This application brings together a set of APIs from different existing applications such as Unsplash or Steam to have a better readability of what is happening instead of looking one by one in each application.
                        </p>
                        <p className="About-website-description" data-aos="fade-down" data-aos-duration="500">
                            We wanted to make a website which would help you to see easily all of your information of your different accounts.
                        </p>
                        <p className="About-website-description" data-aos="fade-down" data-aos-duration="500">
                            This project aims to validate our 3rd year at Epitech to start the 4th year abroad.
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default About;