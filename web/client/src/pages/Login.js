// Display a login form where the user can enter their email and password. He can also login with Google.

import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, reload } from "firebase/auth";
import { FcGoogle } from 'react-icons/fc';
import { Button } from 'react-bootstrap';
import Navbar from '../components/Navbar';
import "../styles/Login.css";
import { Link } from 'react-router-dom';
import { url } from '../global/variables';

function Login() {

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [error, setError] = React.useState("");
    const navigate = useNavigate();

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    }

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const auth = getAuth();
        if (email === "") {
            setError("Please enter your email");
        } else if (password === "") {
            setError("Please enter your password");
        } else {
            setError("");
            signInWithEmailAndPassword(auth, email, password)
                .then(() => {
                    reload();
                    if (auth.currentUser.emailVerified) {
                        navigate("/dashboard", { state: { userEmail: email } });
                    } else {
                        setError("Your email need to be verified. Please check your email");
                    }
                })
                .catch(error => {
                    setError(error.message);
                });
        }
    }

    const handleGoogleLogin = async (googleE) => {
        googleE.preventDefault()
        try {
            const googleProvider = new GoogleAuthProvider();
            const googleAuth = getAuth();
            signInWithPopup(googleAuth, googleProvider)
                .then((googleResult) => {
                    GoogleAuthProvider.credentialFromResult(googleResult);
                    setError("");
                    axios.get(url + '/api/users').then(result => {
                        const userData = result.data;
                        const searchUser = userData.filter(user =>
                            user.login.toLowerCase().includes(googleAuth.currentUser.email.toLowerCase())
                        )
                        if (searchUser.length === 0) {
                            axios.post(url + '/api/user', {
                                login: googleAuth.currentUser.email,
                                password: "Google Authentification",
                                status: "none",
                                subscriptions: [
                                    {
                                        "name": "Weather",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "city-temperature",
                                                "description": "Display temperature for a city",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Weather Temperature",
                                                        "description": "Receive the temperature of a city",
                                                        "input": "town",
                                                        "placeholder": "Search a City",
                                                        "link": "/api/weather/temp/"
                                                    },
                                                    {
                                                        "name": "Weather Description",
                                                        "description": "Receive the weather description of a city",
                                                        "input": "city",
                                                        "placeholder": "Search a City",
                                                        "link": "/api/weather/sky/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Unsplash",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "photo high quality",
                                                "description": "Display high quality photo",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Photo from category",
                                                        "description": "Receive a random photo from a category",
                                                        "input": "photo",
                                                        "placeholder": "Search a photo",
                                                        "type": "username",
                                                        "link": "/api/unsplash/"
                                                    },
                                                    {
                                                        "name": "Random photo",
                                                        "description": "Receive a random photo",
                                                        "link": "/api/unsplash/random"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Github",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "profile",
                                                "description": "See any Github profile",
                                                "api": [
                                                    {
                                                        "input": "access_token",
                                                        "placeholder": "Github access token",
                                                        "link": "/api/github/connect/"
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Github User Update",
                                                        "description": "Receive an Update when the User do an action",
                                                        "input": "username",
                                                        "placeholder": "Search an user",
                                                        "link": "/api/github/"
                                                    },
                                                    {
                                                        "name": "Create Folder",
                                                        "description": "Choose a name and create a folder",
                                                        "input": "name_folder",
                                                        "placeholder": "Create a new folder",
                                                        "link": "/api/github/setNameFolder/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    },
                                                    {
                                                        "name": "Create a Github repo",
                                                        "description": "Create a repo with a given name",
                                                        "input": "repo",
                                                        "placeholder": "Name of the repo",
                                                        "link": "/api/reactions/",
                                                        "id": "repo"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Anime",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "broadcast day",
                                                "description": "See any anime broadcast day",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Last Anime Updated",
                                                        "description": "Receive an Update if the user update his Anime List",
                                                        "input": "name",
                                                        "placeholder": "Search a MAL account",
                                                        "link": "/api/anime/UpdatedAnime/"
                                                    },
                                                    {
                                                        "name": "Last Manga Updated",
                                                        "description": "Receive an Update if the user update his Manga List",
                                                        "input": "manganame",
                                                        "placeholder": "Search a MAL account",
                                                        "link": "/api/anime/UpdatedManga/"
                                                    },
                                                    {
                                                        "name": "Watching Anime is Airing",
                                                        "description": "Receive an Update when an Anime in Watching list is Airing",
                                                        "input": "user",
                                                        "placeholder": "Search a MAL account",
                                                        "link": "/api/anime/WatchingList/"
                                                    },
                                                    {
                                                        "name": "Episode from Plan to Watch",
                                                        "description": "Receive an Update when an Anime in Plan to Watch list is Airing",
                                                        "input": "maluser",
                                                        "placeholder": "Search a MAL account",
                                                        "link": "/api/anime/PTWIsAiring/"
                                                    },
                                                    {
                                                        "name": "Current Anime Season Top 10",
                                                        "description": "Receive an Update when the Season Top 10 change",
                                                        "link": "/api/anime/SeasonTop/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Twitter",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "trends",
                                                "description": "See all trends",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Top trends world",
                                                        "description": "Receive an Update when top trends world change",
                                                        "link": "/api/twitter/trends/world"
                                                    },
                                                    {
                                                        "name": "Top trends France",
                                                        "description": "Receive an Update when top trends France change",
                                                        "link": "/api/twitter/trends/france"
                                                    },
                                                    {
                                                        "name": "Top trends by location",
                                                        "description": "Receive an Update when top trends by location",
                                                        "input": "location",
                                                        "placeholder": "Write lat=nb&long=nb",
                                                        "link": "/api/twitter/location/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    },
                                                    {
                                                        "name": "Create a Github repo",
                                                        "description": "Create a repo with a given name",
                                                        "input": "repo",
                                                        "placeholder": "Name of the repo",
                                                        "link": "/api/reactions/",
                                                        "id": "repo"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Crypto",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "bitcoin",
                                                "description": "Display bitcoin percentage changer 24",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Percentage change 24h crypto",
                                                        "description": "Receive an Update when the percentage change 24h for a crypto change",
                                                        "input": "id",
                                                        "placeholder": "Search a crypto",
                                                        "link": "/api/crypto/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Covid",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "number",
                                                "description": "See Number people infected by Covid-19 in France",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Covid Infected People Number",
                                                        "description": "Receive an Update when Covid Infected People Number",
                                                        "link": "/api/covid/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Esport",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "day Matches",
                                                "description": "See new Day Matches",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Day Matches",
                                                        "description": "Receive an Update when the Day matches change",
                                                        "input": "game",
                                                        "placeholder": "Search a game",
                                                        "link": "/api/esport/DayMatches/"
                                                    },
                                                    {
                                                        "name": "Past Matches",
                                                        "description": "Receive an Update when the Past matches change",
                                                        "input": "videogame",
                                                        "placeholder": "Search a game",
                                                        "link": "/api/esport/PastMatches/"
                                                    },
                                                    {
                                                        "name": "Tournaments",
                                                        "description": "Receive an Update when airing Tournaments change",
                                                        "input": "vgame",
                                                        "placeholder": "Search a game",
                                                        "link": "/api/esport/Tournaments/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "Football",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "standings",
                                                "description": "See updated ligue 1 standings",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "Football Standings",
                                                        "description": "Receive an Update when football standing change",
                                                        "link": "/api/football/Standings/"
                                                    },
                                                    {
                                                        "name": "Football Scorers",
                                                        "description": "Receive an Update when football scorers change",
                                                        "link": "/api/football/Scorers/"
                                                    },
                                                    {
                                                        "name": "Last Ligue 1 Scores",
                                                        "description": "Receive an Update when last Ligue 1 score change",
                                                        "link": "/api/football/PastL1Matches/"
                                                    },
                                                    {
                                                        "name": "Ligue 1 Next Day Matches",
                                                        "description": "Receive an Update when Ligue 1 next day matches change",
                                                        "link": "/api/football/L1Matches/"
                                                    },
                                                    {
                                                        "name": "Football Matches",
                                                        "description": "Receive an Update when Football matches change",
                                                        "link": "/api/football/Matches/"
                                                    },
                                                    {
                                                        "name": "Team Matches",
                                                        "description": "Receive an Update when your team matches change",
                                                        "input": "team",
                                                        "placeholder": "Search a Ligue 1 Team",
                                                        "link": "/api/football/Team/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    }
                                                ]
                                            }
                                        ]
                                    },
                                    {
                                        "name": "News",
                                        "state": false,
                                        "widgets": [
                                            {
                                                "name": "get News",
                                                "description": "See Up-to-Date News",
                                                "api": [
                                                    {
                                                        "input": "none",
                                                        "placeholder": "",
                                                        "link": ""
                                                    }
                                                ],
                                                "actions": [
                                                    {
                                                        "name": "News by Country",
                                                        "description": "Receive an Update when news of a Country change",
                                                        "input": "country",
                                                        "placeholder": "Search a contry (2 characters)",
                                                        "link": "/api/news/Country/"
                                                    },
                                                    {
                                                        "name": "News by Subject",
                                                        "description": "Receive an Update when news of a Subject change",
                                                        "input": "subject",
                                                        "placeholder": "Search a subject",
                                                        "link": "/api/news/Subject/"
                                                    },
                                                    {
                                                        "name": "News by Source",
                                                        "description": "Receive an Update when news of a Source change",
                                                        "input": "source",
                                                        "placeholder": "Search a source",
                                                        "link": "/api/news/Source/"
                                                    }
                                                ],
                                                "reactions": [
                                                    {
                                                        "name": "Email",
                                                        "description": "Receive an email",
                                                        "link": "/api/reactions/",
                                                        "id": "email"
                                                    },
                                                    {
                                                        "name": "Notification",
                                                        "description": "Receive a notification in the application",
                                                        "link": "/api/reactions/",
                                                        "id": "notification"
                                                    }
                                                ]
                                            }
                                        ]
                                    }
                                ],
                                notifications: [],
                                actionsreactions: []
                            })
                        }
                        navigate("/dashboard", { state: { userEmail: googleAuth.currentUser.email } });
                    })
                }).catch((googleError) => {
                    setError(googleError.message);
                });
        } catch (googleErr) {
            setError("Error with Google Authentifaction please retry.")
        }
    }

    React.useEffect(() => {
        const response = axios.get(url + '/firebase');
        response.then(res => {
            const firebaseConfig = res.data;
            initializeApp(firebaseConfig);
        });
    }, []);

    return (
        <>
            <Navbar />
            <div className="Login">
                <div className="Login-container">
                    <h1 className="Login-title">
                        Login
                    </h1>
                    <form className="Login-form">
                        <div className="Login-form-input">
                            <label className="Login-form-label">
                                Email
                            </label>
                            <input type="text" onChange={handleEmailChange} />
                        </div>
                        <div className="Login-form-input">
                            <label className="Login-form-label">
                                Password
                            </label>
                            <input type="password" onChange={handlePasswordChange} />
                        </div>
                        <div className="Login-error-message">
                            {error}
                        </div>
                        <Button className="Login-form-button" onClick={handleSubmit}>
                            Login
                        </Button>
                    </form>
                    <h3 className="Login-or-message">
                        Or
                    </h3>
                    <div className="Login-services-login">
                        <Button className="Login-services-button" onClick={handleGoogleLogin}>
                            <FcGoogle />
                        </Button>
                    </div>
                    <div className="Login-registration-message">
                        <Link to="/register">
                            Don't have an account?
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;