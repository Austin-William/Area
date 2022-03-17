// Control all the reactions set by the user

require('../global/variables');

const reactionController = async (req, res, next) => {
    try {
        const type = req.params.type;
        switch (type) {
            case 'notification':
                reactionType = 'notification';
                res.json({
                    message: "Reaction notification is set"
                });
                break;
            case 'email':
                reactionType = 'email';
                res.json({
                    message: "Reaction email is set"
                });
                break;
            case 'sms':
                reactionType = 'sms';
                res.status(400).send("SMS not implemented yet");
                break;
            case 'repo':
                reactionType = 'repo';
                res.json({
                    message: "Reaction repo is set"
                });
                break;
            default:
                res.status(400).send("Reaction type not found");
                break;
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const setInterval = async (req, res, next) => {
    try {
        if (req.params.seconds !== "") {
            timerInterval = Number(req.params.interval);
            res.json({
                message: "Interval is set"
            });
        } else {
            res.json({
                message: "Interval is not set"
            });
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    reactionController,
    setInterval
}