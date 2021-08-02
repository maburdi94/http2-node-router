'use strict';


const crypto = require("crypto");


let sessions = {};


let proto = module.exports = function(options = {}) {

    function session(req, res, next) {

        let sessionId = req.cookie['sessionId'];

        if (sessionId in sessions) {
            let session = sessions[sessionId];

            if (Date.now() < session.expire) {
                session.expire = Date.now() + 180000; // touch extend 3 minutes
                req.session = session;
            } else {
                delete sessions[sessionId];
            }
        }

        next();
    }

    return session;
}


proto.create = function () {
    let id = crypto.randomBytes(16).toString("base64");
    return sessions[id] = {id, value: {}, expire: Date.now() + 180000};
};

proto.delete = function (id) {
    delete sessions[id];
}
