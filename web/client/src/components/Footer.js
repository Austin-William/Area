// Footer of the web page. Displays the creators of the app.

import React from "react";
import "../styles/Footer.css";

function Footer() {

    function componentDidMount() {
        window.scrollTo(0, 0)
    }

    return (
        <footer className="Footer">
            <div className="Footer-container">
                <h1>
                    Creators
                </h1>
                <ul>
                    <li>
                        Austin
                    </li>
                    <li>
                        Chloé
                    </li>
                    <li>
                        Dylan
                    </li>
                    <li>
                        Luca
                    </li>
                    <li>
                        Vincent
                    </li>
                    <li>
                        Quentin
                    </li>
                </ul>
            </div>
            <div>
                <button onClick={componentDidMount} variant="outline-light" className="Footer-buttonUp">
                    ⬆
                </button>
            </div>
        </footer>
    );
}

export default Footer;