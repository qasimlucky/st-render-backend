var router = require('express').Router();

const { 
    getUserLanguage,
    
} = require('../../../controllers/web/user/user-language-controller');


router.get('/get',getUserLanguage);

module.exports = router;