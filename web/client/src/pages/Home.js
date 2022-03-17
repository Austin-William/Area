// Welcome page when a new user is accessing the app.

import React from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Header from '../components/Header';
import Footer from '../components/Footer';
import "../styles/Home.css";

function Home() {

    React.useEffect(() => {
        AOS.init({
            duration: 1200,
        });
    }, []);

    return (
        <div className="Home">
            <Header />
            <div className="Home-container">
                <div className="Home-title">
                    <h1 data-aos="fade-up" data-aos-duration="300">
                        Welcome to our automatisation app !
                    </h1>
                </div>
                <div className="Home-description">
                    <p data-aos="fade-up" data-aos-duration="300">
                        This app is a tool to help you to automate your daily tasks.
                    </p>
                </div>
                <div className="Home-sections">
                    <section className="Home-section">
                        <div className="Home-section-right" data-aos="fade-left" data-aos-duration="600">
                            <img src="assets/rpa.svg" alt="rpa_assets" />
                        </div>
                        <div className="Home-section-left">
                            <h4 data-aos="fade-right">
                                Automate the processus of your business
                            </h4>
                            <p data-aos="fade-right" data-aos-duration="600">
                                Tired of constantly controlling your applications, your social networks? Here is <strong>AREA</strong>, an application to see everything that happens in your applications and to be notified.
                            </p>
                        </div>
                    </section>
                    <div className="Home-hr" />
                    <section className="Home-section">
                        <div className="Home-section-right">
                            <h4 data-aos="fade-right">
                                An easy way to manage your business
                            </h4>
                            <p data-aos="fade-right" data-aos-duration="600">
                                Manage reactions for each application actions. Receive an email when you receive a message in Twitter or a notification. Choose the reactions as you wish !
                            </p>
                        </div>
                        <div className="Home-section-left" data-aos="fade-left" data-aos-duration="600">
                            <img src="assets/auto.svg" alt="automatisation_image" />
                        </div>
                    </section>
                    <div className="Home-hr" />
                    <section className="Home-section">
                        <div className="Home-section-right" data-aos="fade-right" data-aos-duration="600">
                            <img src="assets/save.svg" alt="save_data_image" />
                        </div>
                        <div className="Home-section-left">
                            <h4 data-aos="fade-left">
                                Save your data with your account
                            </h4>
                            <p data-aos="fade-left" data-aos-duration="600">
                                Save your data with your account. You can access your data from anywhere, even from another device. Connect your Google account or with an email address.
                            </p>
                        </div>
                    </section>
                </div>
                <h4 className="Home-download-title" data-aos="fade-up">
                    Need mobility? Download the mobile application for free.
                </h4>
            </div>
            <Footer />
        </div>
    );
}

export default Home;