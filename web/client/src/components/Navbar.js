// Navbar component is exported to be used in other components. Display the header of the page.

/* 

How to call navbar in other files:

<Navbar /> component must be in the main <div className={`${isShrunk ? 'Header' : ''}`}> of the file
Just add the following code without change anything :

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

*/

import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Navbar.css";

function Navbar() {
    return (
        <header>
            <h2 className="Header-title">
                AREA
            </h2>
            <nav className="Header-nav">
                <Link to="/" className="Header-link-active">
                    Home
                </Link>
                <Link to="/services" className="Header-link">
                    Services
                </Link>
                <Link to="/contact" className="Header-link">
                    Contact
                </Link>
                <Link to="/about" className="Header-link">
                    About
                </Link>
            </nav>
        </header>
    )
}

export default Navbar;