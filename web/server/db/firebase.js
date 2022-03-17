const firebase = require('firebase-admin');
const config = require('../config');

const serviceAccout = require('./area.json');
const firebaseConfig = config.firebaseConfig;

/* CONNECTION TO FIREBASE SERVICE */
const db = firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccout),
    firebaseConfig
});

module.exports = db;