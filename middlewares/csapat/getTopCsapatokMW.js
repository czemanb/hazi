const requireOption = require('../requireOption');

module.exports = function(objectrepository) {
    const JatekosModel = requireOption(objectrepository, 'JatekosModel');
    return function(req, res, next) {
        // maaaagic....
        JatekosModel.aggregate(
            [
                {
                    $group: {
                        _id: '$_jatszik',
                        count: {
                            $sum: 1
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'csapats',
                        localField: '_id',
                        foreignField: '_id',
                        as: 'jatszik'
                    }
                },
                {
                    $sort: {
                        count: -1
                    }
                },
                {
                    $limit: 10
                },
                { $unwind: { path: '$jatszik' } }
            ],
            function(err, result) {
                if (err) {
                    return next(err);
                }
                res.locals.toplista = result.map(e => {
                    return { nev: e.jatszik.nev, jatekosszam: e.count };
                });
                return next();
            }
        );
    };
};
