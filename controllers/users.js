var userModel = require('../models/users');

var users = {};

// controller that handles user login request
users.auth = function(req, res) {

    if (!req.body.username || !req.body.password) {
        res.status(400);
        res.send({ status: 'error', error: 'Username or password is missing.' });
    }

    var user = userModel.authUser(req.body.username, req.body.password);

    user.then(function(users) {
        res.send(users);
    }, function() {
        res.send({ status: 'error', error: 'Error occured while fetching data from database.' });
    });

};

// controller that handles user logout request
users.logout = function(req, res) {

    var sessionId = req.query.sessionId;

    var user = userModel.logout(sessionId);

    res.send({ status: 'success' });


};

users.validateSessionId = function(req, res) {
    userModel.getBySessionId(req.query.sessionId).then(result => {
        res.send({
            status: 200,
            data: result
        });
    }, error => {
        console.log(error);
        res.send({
            status: 500
        });
    });
}


module.exports = users;