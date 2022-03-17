'use strict';

const firebase = require('../db/firebase');
const firestore = firebase.firestore();

const getApi = async (req, res, next) => {
    try {
        const name = req.query.name;
        const api = await firestore.collection('API').doc(name);
        const data = await api.get();
        if (!data.exists) {
            res.status(404).send("API doesn't exist");
        } else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    getApi
}