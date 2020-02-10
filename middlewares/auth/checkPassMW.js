const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof req.body.password === 'undefined') {
            return next();
        }

        if (req.body.password === '1234') {
            req.session.belepve = true;
            return req.session.save(err => res.redirect('/csapat'));
        }

        res.locals.error = 'Téves jelszó';
        return next();
    };
};