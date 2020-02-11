const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    return function(req, res, next) {
        if (typeof res.locals.csapat === 'undefined') {
            return next();
        }

        res.locals.csapat.remove(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/csapat');
        });
    };
};