var router = require('express').Router();

const { 
    getUser,
    createUser,
    editUser
    
} = require('../../../controllers/web/user/user-controller');


router.get('/get',getUser);
router.post('/add',createUser);
router.post('/edit',editUser);

module.exports = router;