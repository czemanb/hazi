const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const JatekosModel = requireOption(objectrepository, 'JatekosModel');

    return function(req, res, next) {
        if (
            typeof req.body.nev === 'undefined' ||
            typeof req.body.mezszam === 'undefined' ||
            typeof req.body.teljesitmeny === 'undefined' ||
            typeof res.locals.csapat === 'undefined'
        ) {
            return next();
        }

        if (typeof res.locals.jatekos === 'undefined') {
            res.locals.jatekos = new JatekosModel();
        }

        if (Number.isNaN(parseInt(req.body.mezszam, 10))) {
            return next(new Error('Év számmal kell hogy megadva legyen!'));
        }

        res.locals.jatekos.nev = req.body.nev;
        res.locals.jatekos.mezszam = parseInt(req.body.mezszam, 10);
        res.locals.jatekos.teljesitmeny = req.body.teljesitmeny;
        res.locals.jatekos._jatszik = res.locals.csapat._id;

        res.locals.jatekos.save(err => {
            if (err) {
                return next(err);
            }

            return res.redirect(`/jatekos/${res.locals.csapat._id}`);
        });
    };
};
