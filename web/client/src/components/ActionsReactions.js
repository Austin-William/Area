import React from "react";
import { IoIosClose } from 'react-icons/io';
import axios from "axios";
import { url } from "../global/variables.js"
import "../styles/ActionsReactions.css";
// import axios from "axios";

function ActionsReactions(props) {

    const handleDelete = () => {
        let newActionsReactions = props.currentUserData.actionsreactions;
        newActionsReactions.splice(props.index - 1, 1);
        axios.put(url + '/api/user/' + props.currentUserData.id, {
            "actionsreactions": newActionsReactions
        });
    }

    return (
        <tr className="ActionsReactions-tr">
            <th scope="row">{props.index}</th>
            <td>{props.action}</td>
            <td>{props.actionInput}</td>
            <td>{props.reaction}</td>
            <td>
                <button className="Notifications-close-button" type="button" onClick={handleDelete}>
                    <IoIosClose className="Widget-icon" />
                </button>
            </td>
        </tr>
    );
}

export default ActionsReactions;
