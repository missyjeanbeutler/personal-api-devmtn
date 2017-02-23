var skillz = require('../skillz.js');

module.exports = {
    addHeaders: function(req, res, next) {
        res.status(200).set({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'OPTIONS, GET, POST, PUT',
            'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
            'X-XSS-Protection': '1; mode=block',
            'X-Frame-Options': 'SAMEORIGIN',
            'Content-Security-Policy': "default-src 'self' devmountain.github.io"
        });
        next();
    },
    generateId: function(req, res, next){
         req.body.id = skillz.length + 1;
         next();
    },

    verifyUser: function(req, res, next){
        if(req.params.username == 'missy' && req.params.id == 555) {
           return next()
        }
        res.status(403).json('Error!')
    }
}