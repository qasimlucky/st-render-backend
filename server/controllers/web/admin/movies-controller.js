const express = require('express');
const app = express();
const multer  = require('multer');

const Movies = require('../../../models/movies/movies')
const { success, error, validation } = require("../../../helpers/apiResponse");
const { CleanData } = require("../../../helpers/cleanEmptyData");


// upload Movies 


var bannerstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "server/public/banner")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now()+".jpg");
        var filePath = file.fieldname + "-" + Date.now()+".jpg";

    } 
});

var thumbnailstorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "server/public/thumbnail")
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + "-" + Date.now()+".jpg");
        var filePath = file.fieldname + "-" + Date.now()+".jpg";

    } 
});


const videoStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "server/public/movies")
    },
    //destination: 'server/public/videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()+".mp4"); 
        // + path.extname(file.originalname))
    }
});

const trailerStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        // Uploads is the Upload_folder_name
        cb(null, "server/public/trailer")
    },
    //destination: 'server/public/videos', // Destination to store video 
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '_' + Date.now()+".mp4"); 
        // + path.extname(file.originalname))
    }
});

const videouploadpath =  async function (req, res){
    console.log(req.file)
    console.log(req.body)
    try{
        
        if(req.file){
            
            const video =("https://salom-vercel-deploy-qasim9754-gmailcom.vercel.app/"+req.file.filename);
            if(video !=="undefined"){
                let bytesValue = req.file.size;
                let gbValue = ((bytesValue / (1000 * 1000 * 1000)).toFixed(2)+"GB");
                console.log(gbValue)

                const movie_id = req.body.movie_id
                const updatedMovie = await Movies.findOneAndUpdate({movie_id:movie_id},{$set :{video:video,size:gbValue}});
                res.send(video)
            }else{
                res.send("file not found")
            }
            

        }else{
            res.send("file not found")
        }
    }catch(err){
        console.log(err)
            res
            .status(500)
            .json(error("Server error", res.statusCode));     
    }
         
}

//upload trailer
const traileruploadpath =  async function (req, res){
    console.log(req.file)
    console.log(req.body)
    const movie_id = req.body.movie_id
    try{
        if(req.file){
            const  trailer=("http://localhost:3000/"+req.file.filename);
            const updatedMovie = await Movies.findOneAndUpdate({movie_id:movie_id},{$set :{trailer:trailer}});
            res.send(trailer)

        }else{
            res.send("file not found")
        }
    }catch(err){
        console.log(err)
            res
            .status(500)
            .json(error("Server error", res.statusCode));     
    }
         
}
// Get Movies

const getMovie = async function (req, res){    
    try {
        const movieList = await Movies.find();

        res.send(movieList)
    } catch (error) { 
        res.send(error)   
    }
}

// last movie id
const lastMovieData = async function (req, res){    
    try {
        const movieList = await Movies.find();
        console.log(movieList.length)
        let lastElement = arry[arry.length - 1];

        res.send(movieList)
    } catch (error) { 
        res.send(error)   
    }
}


// Edit Movies

const editMovie = async function (req, res){    
    try {
       const data = req.body;
        var cleanData = await CleanData(data);
        const {title,description,thumbnail,banner,trailer,release_year,genres,category,quality,tags,status,movie_id} = cleanData;
        const updatedMovie = await Movies.findOneAndUpdate({movie_id:movie_id},{$set :{status:status,title:title,description:description,thumbnail:thumbnail,banner:banner,trailer:trailer,release_year:release_year,genres:genres,category:category,quality:quality,tags:tags}});
        const movie = await Movies.find({movie_id:movie_id});
        res.send(movie)
    } catch (error) { 
        res.send(error)   
    }
}

const createMovie = async function (req, res){
    try{

        const movieList = await Movies.find();
        console.log(movieList.length)
        if (movieList.length ==0 ){
            movie_collection_index = 0;
            console.log(movie_collection_index)
        }else{
           Robject =movieList.slice(-1).pop()
           movie_collection_index  =Robject.movie_collection_index ;
        }
        console.log(movie_collection_index)
        var movie_id = 'st-movie-'+(Number(movie_collection_index)+1);
          console.log(movie_id)
          movie_collection_index = (Number(movie_collection_index)+1)
        console.log(movie_collection_index)
        
        
        
        var movies = await Movies.create({
            movie_id,
            movie_collection_index,
        });
          res.send(movies)
        }catch(err){
        console.log(err)
        res
        .status(500)
        .json(error("Server error", res.statusCode));     
        }    
    
}

const uploadBanner = async function (req, res){    
    try {
        console.log(req.file)
        console.log(req.body)
        const movie_id= req.body.movie_id
       console.log("this is uploadBanner")
       if(req.file){
        const banner =("http://localhost:3000/"+req.file.filename);
        console.log(banner)
        const updatedMovie = await Movies.findOneAndUpdate({movie_id:movie_id},{$set :{banner:banner}});
        res.send(banner)
       }else{
        res.send("file not found")
       }
       

    } catch (error) { 
        res.send(error)   
    }
}

const uploadThumbnail = async function (req, res){    
    try {
        console.log(req.file)
        console.log(req.body)
        const movie_id= req.body.movie_id
        console.log("this is uploadThumbnail")
       if(req.file){
        const  thumbnail=("http://localhost:3000/"+req.file.filename);
        console.log(thumbnail)
        const updatedMovie = await Movies.findOneAndUpdate({movie_id:movie_id},{$set :{thumbnail:thumbnail}});
        res.send(thumbnail)
       }else{
        res.send("file not found")
       }
       

    } catch (error) { 
        res.send(error)   
    }
}

const uploadMovieDetails = async function (req, res){    
    try {
        /* var names = 'Harry,John,Clark,Peter,Rohn,Alice';
        var nameArr = names.split(',');
        console.log(nameArr) */
        console.log(req.body)
        console.log("this is uploadInfo")
        const title= req.body.title;
       if(req.body.tags){const tagsfrombody= req.body.tags; var tags = tagsfrombody.split(',');} 
       if(req.body.genres){const genresfrombody= req.body.genres; var genres = genresfrombody.split(',');} 
        if(req.body.cast){const castfrombody= req.body.cast; var cast = castfrombody.split(',');}
        
        
        
        console.log(tags)
        const movie_id= req.body.movie_id
       
       if(req.body){
        const updatedMovie = await Movies.findOneAndUpdate({movie_id:movie_id},{$set :{tags:tags,genres:genres,cast:cast,title:title}});
        res.send(updatedMovie)
       }else{
        res.send("data not found")
       }
       

    } catch (error) { 
        res.send(error)   
    }
}

module.exports = {
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
    
}