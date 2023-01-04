var router = require('express').Router();
const multer  = require('multer')
const path = require("path");
const { Route } = require('react-router-dom');

const { 
    getMovie,
    videoStorage,
    videouploadpath,
    editMovie,
    createMovie,
    uploadBanner,
    bannerstorage,
    thumbnailstorage,
    uploadThumbnail,
    trailerStorage,
    traileruploadpath,
    uploadMovieDetails,
    lastMovieData
    
} = require('../../../controllers/web/admin/movies-controller');
  
const videoUpload = multer({
    storage: videoStorage,
    limits: {
    fileSize: 2147483648 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('Please upload a video'))
      }
      cb(undefined, true)
   }
  }).single('video')

  const uploadtrailer = multer({
    storage:trailerStorage ,
    limits: {
    fileSize: 2147483648 // 10000000 Bytes = 10 MB
    },
    fileFilter(req, file, cb) {
      // upload only mp4 and mkv format
      if (!file.originalname.match(/\.(mp4|MPEG-4|mkv)$/)) { 
         return cb(new Error('Please upload a trailer'))
      }
      cb(undefined, true)
   }
  }).single('trailer')


const maxSize = 1 * 1000 * 1000 *10000;
var RouteUploadBanner = multer({ storage: bannerstorage,
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
}).single('banner');

var RouteUploadThumbnail = multer({ storage:thumbnailstorage ,
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
}).single('thumbnail');

router.get('/get',getMovie);
router.post('/add',videoUpload,videouploadpath);
router.post('/edit',editMovie);
router.get('/create',createMovie);
router.post('/banner',RouteUploadBanner,uploadBanner);
router.post('/thumbnail',RouteUploadThumbnail,uploadThumbnail);
router.post('/trailer',uploadtrailer,traileruploadpath);
router.post('/details',uploadMovieDetails);
router.get('/lastmovie',lastMovieData);



module.exports = router;