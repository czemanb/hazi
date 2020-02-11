const authMW = require('../middlewares/auth/authMW');
const checkPassMW = require('../middlewares/auth/checkPassMW');
const logoutMW = require('../middlewares/auth/logoutMW');
const renderMW = require('../middlewares/renderMW');
const delJatekosMW = require('../middlewares/jatekos/delJatekosMW');
const getJatekosokMW = require('../middlewares/jatekos/getJatekosokMW');
const getJatekosMW = require('../middlewares/jatekos/getJatekosMW');
const saveJatekosMW = require('../middlewares/jatekos/saveJatekosMW');
const delCsapatMW = require('../middlewares/csapat/delCsapatMW');
const getCsapatokMW = require('../middlewares/csapat/getCsapatokMW');
const getCsapatMW = require('../middlewares/csapat/getCsapatMW');
const getTopCsapatokMW = require('../middlewares/csapat/getTopCsapatokMW');
const saveCsapatMW = require('../middlewares/csapat/saveCsapatMW');

const CsapatModel = require('../models/csapat');
const JatekosModel = require('../models/jatekos');

module.exports = function(app) {
    const objRepo = {
        CsapatModel: CsapatModel,
        JatekosModel: JatekosModel
    };

    app.use('/csapat/new',
        authMW(objRepo),
        saveCsapatMW(objRepo),
        renderMW(objRepo, 'csapatedit')
    );
    app.use(
        '/csapat/edit/:csapatid',
        authMW(objRepo),
        getCsapatMW(objRepo),
        saveCsapatMW(objRepo),
        renderMW(objRepo, 'csapatedit')
    );
    app.get(
        '/csapat/del/:csapatid',
        authMW(objRepo),
        getCsapatMW(objRepo),
        delCsapatMW(objRepo)
    );
    app.get(
        '/csapat',
        authMW(objRepo),
        getCsapatokMW(objRepo),
        renderMW(objRepo, 'csapatlista')
    );

    app.use(
        '/jatekos/:csapatid/new',
        authMW(objRepo),
        getCsapatMW(objRepo),
        saveJatekosMW(objRepo),
        renderMW(objRepo, 'jatekosedit')
    );
    app.use(
        '/jatekos/:csapatid/edit/:jatekosid',
        authMW(objRepo),
        getCsapatMW(objRepo),
        getJatekosMW(objRepo),
        saveJatekosMW(objRepo),
        renderMW(objRepo, 'jatekosedit')
    );
    app.get(
        '/jatekos/:csapatid/del/:jatekosid',
        authMW(objRepo),
        getCsapatMW(objRepo),
        getJatekosMW(objRepo),
        delJatekosMW(objRepo),
        renderMW(objRepo, 'jatekosedit')
    );
    app.get(
        '/jatekos/:csapatid',
        authMW(objRepo),
        getCsapatMW(objRepo),
        getJatekosokMW(objRepo),
        renderMW(objRepo, 'csapatjatekosai')
    );

    app.use('/logout', logoutMW(objRepo));

    app.use('/', getTopCsapatokMW(objRepo), checkPassMW(objRepo), renderMW(objRepo, 'index'));
};
