'use strict';


/**
 * Add security headers
 */
module.exports = function(dir) {

    function csp(req, res, next) {
        res.setHeader('Content-Security-Policy', '' +
            'default-src \'self\';' +
            'style-src \'self\' \'unsafe-inline\' fonts.googleapis.com cdnjs.cloudflare.com;' +
            'img-src \'self\' *.storage.live.com;' +
            'font-src \'self\' fonts.gstatic.com fonts.googleapis.com cdnjs.cloudflare.com;' +
            'script-src \'self\' \'unsafe-inline\' www.google.com www.gstatic.com www.googletagmanager.com;' +
            'connect-src \'self\' www.google-analytics.com;' +
            'media-src \'self\' onedrive.live.com *.files.1drv.com;' +
            'frame-src public.tableau.com www.google.com onedrive.live.com;'
        );
        next();
    }

    return csp;
}

