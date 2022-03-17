/*import React from 'react';
import Navbar from "../components/Navbar";
import "../styles/Url.css";
//import { url, setGlobalUrl } from "../global/variables";

function Url() {
    const [text, setText] = React.useState("");

    const setUrl = (e) => {
        e.preventDefault();
        const newUrl = text;
        if (newUrl.length > 0) {
            setGlobalUrl(newUrl);
            setText("");
        }
    }
    const handleChange = (event) => {
        setText(event.target.value);
    }

    return (
        <div className="Url">
            <Navbar />
            <div className="Url-container">
                <h1>
                    Write down the url of your server
                </h1>
                <input className="Url-input" type="text" placeholder={"Actual url : " + url} onChange={handleChange} id="url" />
                <button className="Url-button" onClick={setUrl}>
                    Set your url
                </button>
                <h3>
                    {url}
                </h3>
            </div>
        </div>
    );
}

export default Url;
*/