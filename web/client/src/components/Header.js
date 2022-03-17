// Header of the welcome page. Display a header of the size of the screen and add some scrolling effects. Can be used in other pages.

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Navbar from './Navbar';
import "../styles/Header.css";

function Header() {

    const [isShrunk, setShrunk] = useState(false);

    useEffect(() => {
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
            <div className="Header-container">
                <Navbar />
                <div className="Header-description">
                    <h3 className="Header-description-title">
                        Action-Reaction
                    </h3>
                    <p className="Header-description-text">
                        Automation platform of his digital life
                    </p>
                    <Link to="/login">
                        <Button variant="outline-light" className="Header-description-button">
                            Get Started
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}


export default Header;