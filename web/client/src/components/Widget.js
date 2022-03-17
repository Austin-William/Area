import React from "react";
import axios from "axios";
import { NotificationManager } from 'react-notifications';
import "react-notifications/lib/notifications.css";
import { Dropdown } from "react-bootstrap";
import "../styles/Widget.css";
import { IoIosClose } from 'react-icons/io';
import { url } from "../global/variables.js"

function Widget(props) {
    const [text, setText] = React.useState("");
    const [reaction, setReaction] = React.useState("");
    const [action, setAction] = React.useState("");
    const [actionInput, setActionInput] = React.useState("");

    const handleFillText = (event) => {
        setText(event.target.value);
    };

    const handleSubmitInput = (link, text, name) => {
        axios.post(url + link + text)
            .then((response) => {
                setAction(name);
                setActionInput(text);
                NotificationManager.success("Action successfully set to " + name, "Success", 3000);
            })
            .catch(() => {
                NotificationManager.error("Action not set", "Error", 3000);
            });
    };

    const handleSubmitButton = (link, name) => {
        axios.post(url + link)
            .then((response) => {
                setAction(name);
                NotificationManager.success("Action successfully set to " + name, "Success", 3000);
            })
            .catch(() => {
                NotificationManager.error("Action not set", "Error", 3000);
            });
    };

    const handleSubmitReaction = (link, type) => {
        try {
            axios.post(url + link + type)
                .then((response) => {
                    if (response.status === 200) {
                        setReaction(type);
                        NotificationManager.success("Reaction successfully set to " + type, "Success", 3000);
                    }
                })
                .catch(() => {
                    NotificationManager.error("Reaction not set", "Error", 3000);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const handleUnsubscribe = () => {
        let newSubscription = props.currentUserData.subscriptions;
        newSubscription[props.index].state = false;
        axios.put(url + '/api/user/' + props.currentUserData.id, {
            "subscriptions": newSubscription
        });
        NotificationManager.success("You successfully unsubscribe from " + props.name, "Success", 3000);
    }

    const handleAddActionReaction = () => {
        if (action.length > 0 && reaction.length > 0) { 
            if (actionInput.length > 0) {
                let newActionsReactions = props.currentUserData.actionsreactions;
                let nextActionsReactions = {
                    "action": action,
                    "actionInput": actionInput,
                    "reaction": reaction,
                    "response": "none" 
                }
                newActionsReactions.push(nextActionsReactions);
                axios.put(url + '/api/user/' + props.currentUserData.id, {
                    "actionsreactions": newActionsReactions
                });
            } else {
                let newActionsReactions = props.currentUserData.actionsreactions;
                let nextActionsReactions = {
                    "action": action,
                    "reaction": reaction,
                    "response": "none" 
                }
                newActionsReactions.push(nextActionsReactions);
                axios.put(url + '/api/user/' + props.currentUserData.id, {
                    "actionsreactions": newActionsReactions
                });

            }
            setAction("");
            setActionInput("");
            setReaction("");
            NotificationManager.success("Action/Reaction successfully added", "Success", 3000);
        }
    }

    return (
        <div className="Widget">
            <button className="Widget-close" type="button" onClick={handleUnsubscribe}>
                <IoIosClose className="Widget-icon" />
            </button>
            <div className="Widget-container">
                <h1 className="Widget-title">{props.title}</h1>
                <div className="Widget-dropdowns">
                    <Dropdown
                        variant="button"
                        className="Widget-dropdown"
                        autoClose={false}
                    >
                        <Dropdown.Toggle
                            variant="button"
                            className="Widget-dropdown-toggle"
                            id="dropdown-actions"
                        >
                            Actions
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="Widget-dropdown-menu">
                            {props.actions.map((action, index) => (
                                <Dropdown.Item className="Widget-dropdown-item" key={index}>

                                    {action.input ? (
                                        <>
                                            <div>{ action.name }</div>
                                            <input
                                                className="Widget-input"
                                                type="text"
                                                onChange={handleFillText}
                                                placeholder={action.placeholder}
                                            />
                                            <button
                                                className="Widget-button"
                                                onClick={() =>
                                                    handleSubmitInput(
                                                        action.link,
                                                        text,
                                                        action.name
                                                    )
                                                }
                                            >
                                                Submit
                                            </button>
                                        </>
                                    ) : <button className="Widget-button" onClick={() => handleSubmitButton(action.link, action.name)}>
                                        {action.name}
                                    </button>}
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                    <Dropdown
                        variant="button"
                        className="Widget-dropdown"
                        autoClose={false}
                    >
                        <Dropdown.Toggle
                            variant="button"
                            className="Widget-dropdown-toggle"
                            id="dropdown-reactions"
                        >
                            Reactions
                        </Dropdown.Toggle>
                        <Dropdown.Menu className="Widget-dropdown-menu">
                            {props.reactions.map((reaction, index) => (
                                <Dropdown.Item className="Widget-dropdown-item" key={index}>
                                    <button className="Widget-button" onClick={() => { handleSubmitReaction(reaction.link, reaction.id) }}>
                                        {reaction.name}
                                    </button>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <p>Action :</p>
                <p>{action}</p>
                {
                    actionInput.length > 0 ?
                    <>
                        <p>Value :</p>
                        <p>{actionInput}</p>
                    </>
                    : null
                }
                <p>Reaction :</p>
                <p>{reaction}</p>
                <button type="button" className="btn btn-light" onClick={handleAddActionReaction}>ADD</button>
            </div>
        </div>
    );
}

export default Widget;