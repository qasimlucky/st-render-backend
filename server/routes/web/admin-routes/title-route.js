var router = require('express').Router();

const { 
    addLanguageTitle,
    
} = require('../../../controllers/web/admin/title-controller');


router.get('/',addLanguageTitle);

module.exports = router;