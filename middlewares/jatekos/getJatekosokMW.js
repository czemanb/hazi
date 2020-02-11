const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const JatekosModel = requireOption(objectrepository, 'JatekosModel');

    return function(req, res, next) {
        if (typeof res.locals.csapat === 'undefined') {
            return next();
        }

        JatekosModel.find({_jatszik: res.locals.csapat._id }, (err, jatekosok) => {
            if (err) {
                return next(err);
            }

            res.locals.jatekosok = jatekosok;
            return next();
        });
    };
};