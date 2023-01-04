var router = require('express').Router();
const multer  = require('multer');
const path = require("path");

const { 
    AddLanguage,
    flagstorage,
    getAllLanguage,
    UpdateLanguage,
    getselectionLanguage
    
} = require('../../../controllers/web/admin/language-controllers');

const maxSize = 1 * 1000 * 1000 *10000;
var RouteUploadFlag = multer({ storage:flagstorage ,
    limits: { fileSize: maxSize },
    fileFilter: function (req, file, cb){
    
        // Set the filetypes, it is optional
        var filetypes = /jpeg|jpg|png/;
        var mimetype = filetypes.test(file.mimetype);
  
        var extname = filetypes.test(path.extname(
                    file.originalname).toLowerCase());
        
        if (mimetype && extname) {
            return cb(null, true);
        }else{            
          cb("Error: File upload only supports the " + "following filetypes - " + filetypes); 
        }
      
        
      } 
  }).single('flag');

router.post('/',RouteUploadFlag,AddLanguage);
router.post('/get',getAllLanguage);
router.post('/update',RouteUploadFlag,UpdateLanguage);
router.get('/select',getselectionLanguage);
/* router.post('/flag',RouteUploadFlag,uploadflag); */

module.exports = router;