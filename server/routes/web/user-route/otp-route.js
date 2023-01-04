var router = require('express').Router();

const { 
    SendOtp,
    verifyOtp
    
} = require('../../../controllers/web/user/otp-controller');

router.post('/send', SendOtp);
router.post('/verify', verifyOtp);

module.exports = router;