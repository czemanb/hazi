const requireOption = require('../requireOption');

module.exports = function (objectrepository) {
    const CsapatModel = requireOption(objectrepository, 'CsapatModel');

    return function (req, res, next) {
        CsapatModel.findOne(
            {
                _id: req.params.csapatid
            },
            (err, csapat) => {
                if (err || !csapat) {
                    return next(err);
                }

                res.locals.csapat = csapat;
                return next();
            }
        );
    };
};