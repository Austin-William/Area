// Contact page with our information.

import React, { useState, useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import "../styles/Contact.css";

function Contact() {
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
            <div className="Contact-container">
                <div className="Contact-container">
                    <Navbar />
                    <div className="Contact-description">
                        <h3 className="Contact-description-title">
                            Contact Us
                        </h3>
                        <p className="Contact-description-text">
                            If you have any questions, please feel free to contact us.
                        </p>
                    </div>
                </div>
            </div>
            {/* 
                Dans cette section, changer les images pour VOTRE profil.
            */}
            <div className="Contact-infos">
                <div className="Contact-grid">
                    <div className="Contact-info" data-aos="fade-up">
                        <img src="https://avatars.githubusercontent.com/u/55129304?v=4" alt="austin" data-aos="fade-up" data-aos-duration="200" />
                        <h4 className="Contact-name" data-oas-duration="600">
                            Austin-William Lo
                        </h4>
                        <p className="Contact-name-description" data-oas-duration="800">
                            austin-william.lo@epitech.eu
                        </p>
                    </div>
                    <div className="Contact-info" data-aos="fade-up">
                    <img src="https://x.boardgamearena.net/data/avatar/0/90/90225/90225055_184.jpg?h=a340193484" alt="dylan" data-aos="fade-up" data-aos-duration="200" />
                        <h4 className="Contact-name" data-oas-duration="600">
                            Dylan Faure
                        </h4>
                        <p className="Contact-name-description" data-oas-duration="800">
                            dylan1.faure@epitech.eu
                        </p>
                    </div>
                    <div className="Contact-info" data-aos="fade-up">
                    <img src="https://media.discordapp.net/attachments/689113742650507264/940225668120207430/-i032h1.jpg?width=617&height=617" alt="luca" data-aos="fade-up" data-aos-duration="200" />
                        <h4 className="Contact-name" data-oas-duration="600">
                            Luca Banyols
                        </h4>
                        <p className="Contact-name-description" data-oas-duration="800">
                            luca.banyols@epitech.eu
                        </p>
                    </div>
                    <div className="Contact-info" data-aos="fade-up">
                    <img src="https://pbs.twimg.com/profile_images/1005469089589092354/64pWZkKT_400x400.jpg" alt="vincent" data-aos="fade-up" data-aos-duration="200" />
                        <h4 className="Contact-name" data-oas-duration="600">
                            Vincent Pichot
                        </h4>
                        <p className="Contact-name-description" data-oas-duration="800">
                            vincent.pichot@epitech.eu
                        </p>
                    </div>
                    <div className="Contact-info" data-aos="fade-up">
                    <img src="https://avatars.githubusercontent.com/u/60068251?v=4" alt="chloé" data-aos="fade-up" data-aos-duration="200" />
                        <h4 className="Contact-name" data-oas-duration="600">
                            Chloé Chauvin
                        </h4>
                        <p className="Contact-name-description" data-oas-duration="800">
                            chloé.chauvin@epitech.eu
                        </p>
                    </div>
                    <div className="Contact-info" data-aos="fade-up">
                    <img src="https://avatars.githubusercontent.com/u/58399237?v=4" alt="quentin" data-aos="fade-up" data-aos-duration="200" />
                        <h4 className="Contact-name" data-oas-duration="600">
                            Quentin Tréheux
                        </h4>
                        <p className="Contact-name-description" data-oas-duration="800">
                            quentin.treheux@epitech.eu
                        </p>
                    </div>
                </div>
                <div className="Contact-info-adress" data-aos="fade-up" data-oas-duration="800">
                    <h4 className="Contact-name">
                        Our adress
                    </h4>
                    <div className="Contact-adress">
                        <p className="Contact-name-description">
                            1 rue de la paix
                        </p>
                        <p className="Contact-name-description">
                            Paris 75000
                        </p>
                        <p className="Contact-name-description">
                            France
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Contact;