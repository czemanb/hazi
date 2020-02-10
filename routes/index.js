const authMW = require('../middleware/auth/authMW');
const checkPassMW = require('../middleware/auth/checkPassMW');
const logoutMW = require('../middleware/auth/logoutMW');
const renderMW = require('../middleware/renderMW');
const delJatekosMW = require('../middleware/jatekos/delJatekosMW');
const getJatekosokMW = require('../middleware/jatekos/getJatekosokMW');
const getJatekosMW = require('../middleware/jatekos/getJatekosMW');
const saveJatekosMW = require('../middleware/jatekos/saveJatekosMW');
const delCsapatMW = require('../middleware/csapat/delCsapatMW');
const getCsapatokMW = require('../middleware/csapat/getCsapatokMW');
const getCsapatMW = require('../middleware/csapat/getCsapatMW');
const getTopCsapatokMW = require('../middleware/csapat/getTopCsapatokMW');
const saveCsapatMW = require('../middleware/csapat/saveCsapatMW');

const CsapatModel = require('../models/csapat');
const JatekosModel = require('../models/jatekos');

module.exports = function(app) {
    const objRepo = {
        CsapatModel: CsapatModel,
        JatekosModel: JatekostModel
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
        getCsapatkMW(objRepo),
        renderMW(objRepo, 'csapatlista')
    );

    app.use(
        '/jatekos/:jatekosid/new',
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
        '/jatekos/:jatekosid',
        authMW(objRepo),
        getNagymamaMW(objRepo),
        getBefottekMW(objRepo),
        renderMW(objRepo, 'csapatjatekosai')
    );

    app.use('/logout', logoutMW(objRepo));

    app.use('/', getTopCsapatokMW(objRepo), checkPassMW(objRepo), renderMW(objRepo, 'index'));
};
