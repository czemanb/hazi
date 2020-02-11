const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const CsapatModel = requireOption(objectrepository, 'CsapatModel');

    return function(req, res, next) {
        if (
            typeof req.body.csapatnev === 'undefined' ||
            typeof req.body.varos === 'undefined' ||
            typeof req.body.stadion === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.csapat === 'undefined') {
            res.locals.csapat = new CsapatModel();
        }

        res.locals.csapat.csapatnev = req.body.csapatnev;
        res.locals.csapat.varos= req.body.varos;
        res.locals.csapat.stadion = req.body.stadion;

        res.locals.csapat.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect('/csapat');
        });
    };
};