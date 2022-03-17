import React from 'react';
import { IoIosNotifications, IoMdSettings, IoIosInformationCircle } from 'react-icons/io';
import { Button, Badge, Toast } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "../styles/Dashboard.css";
import Settings from './Settings';
import Help from './Help';
import Widget from '../components/Widget';
import Notifications from '../components/Notifications';
import Api from '../components/Api';
import axios from 'axios';
import { initializeApp } from 'firebase/app';
import { useLocation } from 'react-router';
import { url } from '../global/variables';
import ActionsReactions from '../components/ActionsReactions';

function Dashboard() {

    const [showNotifications, setShowNotifications] = React.useState(false);
    const [showSettings, setShowSettings] = React.useState(false);
    const [showHelp, setShowHelp] = React.useState(false);
    const [showAddAPI, setShowAddAPI] = React.useState(false);
    const [showActionReaction, setShowActionReaction] = React.useState(false);
    const [data, setData] = React.useState([]);
    const { state } = useLocation();
    const { userEmail } = state;
    const [currentUserData, setCurrentUserData] = React.useState([]);


    const handleNotifications = () => {
        setShowNotifications(!showNotifications);
    }

    const handleSettings = () => {
        setShowSettings(!showSettings);
    }

    const handleHelp = () => {
        setShowHelp(!showHelp);
    }

    const handleAddAPI = () => {
        setShowAddAPI(!showAddAPI);
    }

    const handleShowActionReaction = () => {
        setShowActionReaction(!showActionReaction);
    }

    React.useEffect(() => {
        const interval = setInterval(() => {
            console.log('This will run every second!');
            fetchDataFromAPI();
            // handleNotif();
            axios.get(url + '/firebase').then((res) => initializeApp(res.data));
            axios.get(url + '/api/user/' + userEmail)
                .then((res) => {
                    setCurrentUserData(res.data);
                })
                .catch(() => {
                    console.log('error');
                });
        }, 5000);
        return () => clearInterval(interval);
    }, [userEmail]);

    const fetchDataFromAPI = () => {
        fetch(url + '/about.json')
            .then(response => response.json())
            .then(data => {
                setData(data.server.services);
            })
            .catch(error => console.log(error));
    }

    return (
        <div className="Dashboard">
            <div className="Dashboard-container">
                <div className="Dashboard-header">
                    <div className="Dashboard-header-left-section">
                        <h1 className="Dashboard-title">Dashboard</h1>
                    </div>
                    <div className="Dashboard-header-right-section">
                        <Button className="Dashboard-header-button" onClick={handleNotifications} variant="button">
                            <IoIosNotifications className="Dashboard-icon" />
                            <Badge bg="secondary">{currentUserData.notifications?.length}</Badge>
                        </Button>
                        <Button className="Dashboard-header-button" onClick={handleSettings} variant="button">
                            <IoMdSettings className="Dashboard-settings-icon" />
                        </Button>
                        <Link to="/aboutfile" className='Dashboard-about-link' variant="button">
                            <IoIosInformationCircle className='Dashboard-about-icon'/>
                        </Link>
                    </div>
                </div>
                <div className="Dashboard-section">
                    <div className="Dashboard-section-left">
                        <div className="Dashboard-drawer">
                            <div className="Dashboard-drawer-top">
                                <Button className="Dashboard-drawer-content-item" onClick={handleAddAPI} variant="button">
                                    Add API
                                </Button>
                                <Button className="Dashboard-drawer-content-item" onClick={handleShowActionReaction} variant="button">
                                    Action Reaction
                                </Button>
                            </div>
                            <div className="Dashboard-drawer-bottom">
                                <Button className="Dashboard-drawer-content-item" onClick={handleHelp} variant="button">
                                    ?
                                </Button>
                            </div>
                        </div>
                    </div>
                    <div className="Dashboard-section-right">
                        <div className="Dashboard-content">
                            {
                                currentUserData.subscriptions?.map((item, index) => {
                                    return (
                                        item.state === true ?
                                            <Widget
                                                key={index}
                                                title={item.name}
                                                actions={item.widgets[0].actions}
                                                reactions={item.widgets[0].reactions}
                                                currentUserData={currentUserData}
                                                index={index}
                                            />
                                            : null
                                    );
                                })
                            }
                        </div>
                    </div>
                    {/* Part which contain all toasts */}
                    <>
                        <Toast className="Dashboard-toast" show={showNotifications} onClose={handleNotifications}>
                            <Toast.Header className="Dashboard-toast-header">
                                <strong>
                                    <IoIosNotifications />
                                </strong>
                                <small>
                                    Total : {currentUserData.notifications?.length}
                                </small>
                            </Toast.Header>
                            <Toast.Body>
                                {
                                    currentUserData.notifications?.map((item, index) => {
                                        return (
                                            <Notifications
                                                key={index}
                                                content={item}
                                                index={index}
                                                currentUserData={currentUserData}
                                            />
                                        );
                                    })
                                }
                            </Toast.Body>
                        </Toast>
                        <Toast className="Dashboard-toast" show={showSettings} onClose={handleSettings}>
                            <Toast.Header className="Dashboard-toast-header">
                                <strong>
                                    Settings
                                </strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Settings id={currentUserData.id} />
                            </Toast.Body>
                        </Toast>
                        <Toast className="Dashboard-toast" show={showHelp} onClose={handleHelp}>
                            <Toast.Header className="Dashboard-toast-header">
                                <strong>
                                    Help
                                </strong>
                            </Toast.Header>
                            <Toast.Body>
                                <Help />
                            </Toast.Body>
                        </Toast>
                        <Toast className="Dashboard-toast overflow-auto" show={showAddAPI} onClose={handleAddAPI}>
                            <Toast.Header className="Dashboard-toast-header">
                                <strong>
                                    Connect your accounts
                                </strong>
                            </Toast.Header>
                            <Toast.Body className="Dashboard-toast-body overflow-auto">
                                {
                                    data.map((item, index) => {
                                        return (
                                            <Api
                                                key={index}
                                                name={item.name}
                                                link={item.widgets[0].api[0].link}
                                                access_token={item.widgets[0].api[0].input}
                                                currentUserData={currentUserData}
                                                index={index}
                                            />
                                        );
                                    })
                                }
                            </Toast.Body>
                        </Toast>
                        <Toast className="Dashboard-toast" show={showActionReaction} onClose={handleShowActionReaction}>
                            <Toast.Header className="Dashboard-toast-header">
                                <strong>
                                    Action Reaction
                                </strong>
                            </Toast.Header>
                            <Toast.Body>
                                <div className="Dashboard-table-container">
                                    <table className="Dashboard-table table">
                                        <thead>
                                            <tr>
                                                <th scope="col">#</th>
                                                <th scope="col">Action</th>
                                                <th scope="col">Value</th>
                                                <th scope="col">Reaction</th>
                                                <th scope="col">Delete</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            currentUserData.actionsreactions?.map((item, index) => {
                                                return (
                                                    item.actionInput ?
                                                        <ActionsReactions
                                                            key={index}
                                                            item={item}
                                                            currentUserData={currentUserData}
                                                            action={item.action}
                                                            actionInput={item.actionInput}
                                                            reaction={item.reaction}
                                                            index={index + 1}
                                                        />
                                                        :
                                                        <ActionsReactions
                                                            key={index}
                                                            item={item}
                                                            currentUserData={currentUserData}
                                                            action={item.action}
                                                            actionInput="none"
                                                            reaction={item.reaction}
                                                            index={index + 1}
                                                        />
                                                )
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </Toast.Body>
                    </Toast>
                </>
            </div>
        </div>
        </div >
    );
}

export default Dashboard;