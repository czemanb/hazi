const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const JatekosModel = requireOption(objectrepository, 'JatekosModel');

    return function(req, res, next) {
        JatekosModel.findOne(
            {
                _id: req.params.jatekosid
            },
            (err, jatekos) => {
                if (err || !jatekos) {
                    return next(err);
                }

                res.locals.jatekos = jatekos;
                return next();
            }
        );
    };
};
