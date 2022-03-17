import React from "react";
import { url } from "../global/variables";
import "../styles/Notifications.css";
import { IoIosClose } from 'react-icons/io';
import axios from 'axios';

function Notifications(props) {

    const handleDelete = () => {
        let newNotifications = props.currentUserData.notifications;
        newNotifications.splice(props.index, 1);
        axios.put(url + '/api/user/' + props.currentUserData.id, {
            "notifications": newNotifications
        });
    }

    return (
        <div className="Notifications">
            <div className="Notifications-container">
                <button className="Notifications-close-button" type="button" onClick={handleDelete}>
                    <IoIosClose className="Widget-icon" />
                </button>
                <div className="Notifications-content">
                    {props.content}
                </div>
            </div>
        </div>
    );
}

export default Notifications;