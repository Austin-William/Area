class User  {
    constructor(id, login, password, status, subscriptions, notifications, actionsreactions) {
        this.id = id;
        this.login = login;
        this.password = password;
        this.status = status;
        this.subscriptions = subscriptions;
        this.notifications = notifications;
        this.actionsreactions = actionsreactions;
    }
}

module.exports = User;