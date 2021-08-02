'use strict';


const split = (str, delim='=') => {
    let index = str.indexOf(delim);
    return [str.slice(0, index), str.slice(index+1)];
};

const parseCookie = (str) => str ?
    str.split(';')
        .map(v =>  split(v))
        .reduce((acc, v= ["", ""]) => {
            acc[decodeURIComponent(v[0].trim())] = decodeURIComponent(v[1].trim());
            return acc;
        }, {}) : "";


module.exports = function(options = {}) {

    function cookie(req, res, next) {
        req.cookie = parseCookie(req.headers['cookie']);
        next();
    }

    return cookie;
}
