'use strict';

require('../global/variables');
const firebase = require('../db/firebase');
const User = require('../models/user');
const firestore = firebase.firestore();
const { setEmail } = require('./emailController');

const addUser = async(req, res, next) => {
    try {
        const data = req.body;
        await firestore.collection('user').doc().set(data);
        res.send('User saved successfully');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllUsers = async(req, res, next) => {
    try {
        const users = await firestore.collection('user');
        const data = await users.get();
        const userArray = [];
        if (data.empty) {
            res.status(404).send('No user found');
        } else {
            data.forEach(doc => {
                const user = new User(
                    doc.id,
                    doc.data().login,
                    doc.data().password,
                    doc.data().status,
                    doc.data().subscriptions,
                    doc.data().notifications,
                    doc.data().actionsreactions
                )
                userArray.push(user);
            });
            res.send(userArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const users = await firestore.collection('user');
        const data = await users.get();
        if (data.empty) {
            res.status(404).send('No user found');
        } else {
            var user = [];
            data.forEach((doc) => {
                user = new User(
                    doc.id,
                    doc.data().login,
                    doc.data().password,
                    doc.data().status,
                    doc.data().subscriptions,
                    doc.data().notifications,
                    doc.data().actionsreactions
                )
                if (user.login === req.params.login) {
                    userId = user.id;
                    userEmail = user.login;
                    newNotifList = user.notifications;
                    setEmail(user.login);
                    currentUserData = user;
                    res.send(user);
                    throw user;
                }
            });
            res.status(404).send('User not found');
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user = await firestore.collection('user').doc(id);
        await user.update(data);
        res.send('user upadate successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await firestore.collection('user').doc(id).delete();
        res.send('user deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}