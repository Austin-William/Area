import React from "react";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import "react-notifications/lib/notifications.css";
import { getAuth, signOut } from "firebase/auth";
import "../styles/Settings.css";
import { url } from "../global/variables";

function Settings(props) {

    const [ip, setIp] = React.useState("");
    const [seconds, setSeconds] = React.useState("");
    const [email, setEmail] = React.useState("");
    const [phone, setPhone] = React.useState("");

    const handleIp = (event) => {
        setIp(event.target.value);
    }

    const handleEmail = (event) => {
        setEmail(event.target.value);
    }

    const handlePhone = (event) => {
        setPhone(event.target.value);
    }

    const handleSecondsTimer = (event) => {
        setSeconds(event.target.value);
    }

    const handleDisconnect = () => {
        const auth = getAuth();
        signOut(auth)
            .then(() => {
                NotificationManager.success("Disconnected", "Success", 3000);
                setEmail("");
                setPhone("");
                window.location.href = "/login";
            })
            .catch(error => {
                console.log(error);
            });
    }

    const handleDeleteAccount = () => {
        const auth = getAuth();
        var confirmDelete = window.confirm("Are you sure you want to delete your account?");

        if (confirmDelete) {
            axios.delete(url + "/api/user/" + props.id);
            auth.currentUser.delete()
            .then(() => {
                window.location.href = "/login";
            })
            .catch(error => {
                console.log(error);
            });
        }
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (ip !== "") {
            if (seconds !== 0) {
                try {
                    axios.post(ip + "/api/reactions/timer/" + seconds)
                        .then(function (response) {
                            if (response.status === 200) {
                                NotificationManager.success("Timer successfully set to " + seconds, "Success", 3000);
                            }
                        })
                        .catch(function (error) {
                            NotificationManager.error("Timer not set", "Error", 3000);
                        });
                } catch (error) {
                    console.log(error);
                }
            }
            if (email !== "") {
                try {
                    axios.post(ip + '/api/email/' + email)
                        .then((response) => {
                            if (response.status === 200) {
                                NotificationManager.success("Email successfully set to " + email, "Success", 3000);
                            }
                        })
                        .catch(() => {
                            NotificationManager.error("Email not set", "Error", 3000);
                        });
                } catch (error) {
                    console.log(error);
                }
            }
            if (phone !== "") {
                console.log(phone);
            }
        }
    }

    React.useEffect(() => {
        if (ip === "") {
            setIp(url);
        }
        try {
            const response = axios.get(ip + '/api/email')
                .then((response) => {
                    setEmail(response.data.email);
                })
                .catch(() => {
                    console.log('Request failed');
                });
            if (response.status !== 200) {
                const auth = getAuth();
                setEmail(auth.currentUser.email);
            }
        } catch (error) {
            console.log(error);
        }
    }, [ip, email]);

    return (
        <div className="Settings">
            <div className="Settings-container">
                <div className="Settings-content">
                    <div className="Settings-content-item">
                        <h3>IP</h3>
                        <input type="text" placeholder={ip} onChange={handleIp} />
                    </div>
                    <div className="Settings-content-item">
                        <h3>Email</h3>
                        <input type="text" placeholder={email} onChange={handleEmail} />
                    </div>
                    <div className="Settings-content-item">
                        <h3>Phone</h3>
                        <input type="text" placeholder={phone} onChange={handlePhone} />
                    </div>
                    <div className="Settings-content-item">
                        <h3>Timer</h3>
                        <input type="number" placeholder={seconds} onChange={handleSecondsTimer} />
                    </div>
                </div>
                <button className="Settings-button" onClick={handleSubmit}>
                    Save
                </button>
            </div>
            <div className="Settings-container">
                <button className="Settings-button-disconnect" onClick={handleDisconnect}>
                    Disconnection
                </button>
                <button className="Settings-button-disconnect" onClick={handleDeleteAccount}>
                    Delete your account
                </button>
            </div>
        </div>
    );
}

export default Settings;