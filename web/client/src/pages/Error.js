// Error page when the user tries to access a page that does not exist.

import React from 'react';
import Navbar from '../components/Navbar';
import "../styles/Error.css";

function Error() {
    return (
        <div className="Error">
            <div className="Error-container">
                <Navbar />
                <div className="Error-description">
                    <h3 className="Error-description-title">
                        Error 404 - Page not found
                    </h3>
                    <p className="Error-description-text">
                        The page you are looking for does not exist.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Error;