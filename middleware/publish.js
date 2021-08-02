'use strict';

const {mimes} = require('./../utils');
const {join} = require('path');
const {createReadStream, statSync} = require('fs');

/**
 * Publish files in a specific directory making them accessible via URL GET
 */
module.exports = function(publishDir) {

    function publish(req, res, next) {
        let url = new URL(req.url, `http://${req.headers.host}`);
        let pathname = decodeURIComponent(url.pathname);

        try {
            let dir = join(__dirname, '..', publishDir, pathname);
            let stats = statSync(dir);
            if (stats.isFile()) {
                let extname = pathname.slice(pathname.lastIndexOf('.'));
                res.setHeader('Cache-Control', 'private; max-age=86400');
                res.setHeader('Last-Modified', stats.mtime);
                res.setHeader('Content-Type', mimes[extname]);
                createReadStream(dir).pipe(res);
                return;
            }
            next();
        }
        catch (e) {
            next();
        }
    }

    return publish;
}

