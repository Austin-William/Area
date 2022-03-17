import React from 'react';
import axios from 'axios';
import { url } from '../global/variables';
import { NotificationManager } from 'react-notifications';
import "react-notifications/lib/notifications.css";
import "../styles/Api.css";
// import { getAuth } from "firebase/auth";
// import { initializeApp } from 'firebase/app';

function Api(props) {

    const [access_token, setAccess_token] = React.useState('');

    const handleAccessToken = (e) => {
        setAccess_token(e.target.value);
    }

    // React.useEffect(() => {
    //     axios.get(url + '/firebase').then((res) => initializeApp(res.data));
    // })
    

    const handleSubmit = (e) => {
        e.preventDefault();
        // const auth = getAuth();
        // axios.get(url + '/api/user/' + auth.currentUser.email).then(result => {
        //     const userData = result.data;
        //     console.log(userData);
        // })
        if (props.access_token === "access_token") {
            if (access_token.length > 0) {
                axios.post(url + props.link + access_token)
                    .then(res => {
                        NotificationManager.success(res.data.message + "\n\nYou successfully subscribe to " + props.name, 'Success', 3000);
                    })
                    .catch(err => {
                        console.log(err);
                    });
                let newSubscription = props.currentUserData.subscriptions;
                if (newSubscription[props.index].state === false) {
                    newSubscription[props.index].state = true;
                    axios.put(url + '/api/user/' + props.currentUserData.id, {
                        "subscriptions": newSubscription
                    });
                } else if (newSubscription[props.index].state === true) {
                    NotificationManager.error("You already subscribe to " + props.name, "Error", 3000);
                }
            }
        } else {
            let newSubscription = props.currentUserData.subscriptions;
            if (newSubscription[props.index].state === false) {
                newSubscription[props.index].state = true;
                axios.put(url + '/api/user/' + props.currentUserData.id, {
                    "subscriptions": newSubscription
                });
                NotificationManager.success("You successfully subscribe to " + props.name, "Success", 3000);
            } else if (newSubscription[props.index].state === true) {
                NotificationManager.error("You already subscribe to " + props.name, "Error", 3000);
            }
        }
    }

    return (
        <div className="Api">
            <div className="Api-container">
                <div className="Api-header">
                    <h1>
                        {props.name}
                    </h1>
                    {
                        props.access_token === "access_token" ?

                            <input type="text" placeholder="Access Token" onChange={handleAccessToken} />
                            :

                            props.access_token === "none" ?
                                <p>No Access Token Required</p>
                                :
                                <>
                                    <input type="text" placeholder="Email" />
                                    <input type="text" placeholder="Password" />
                                </>

                    }
                </div>
                <div className="Api-footer">
                    <button onClick={handleSubmit}>
                        Add
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Api;