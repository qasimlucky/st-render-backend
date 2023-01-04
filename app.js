const express = require('express')
const app = express()
const connectDB = require('./server/config/db');
const Users = require('./server/models/user/user');
const  Language = require('./server/models/movies/languages');
var bodyParser = require('body-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo');
const path = require('path');
const fs = require('fs');
const cors = require('cors');





// sessions
    app.use(session({
      secret: 'keyboard nexus',
      saveUninitialized: false,
      cookie :{maxAge:36000000},
      store: MongoStore.create({ mongoUrl: process.env.MONGOLAB_URL })
    }))


    app.use(cors());
// database connection
    connectDB();

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }))
    app.use('/static', express.static(path.join(__dirname, './server/public/movies')))   
    app.use('/static', express.static(path.join(__dirname, './server/public/banner')))
    app.use('/static', express.static(path.join(__dirname, './server/public/trailer')))
    app.use('/static', express.static(path.join(__dirname, './server/public/thumbnail')))
    app.use('/static', express.static(path.join(__dirname, './server/public/flags')))



//  routes
    const languageRoutes = require('./server/routes/web/admin-routes/language-route')
    const movieRoutes = require('./server/routes/web/admin-routes/movies-route')
    const titleRoutes = require('./server/routes/web/admin-routes/title-route')

// user routes 
    const userRoutes = require('./server/routes/web/user-route/user-route')
    const userLanguageRoutes = require('./server/routes/web/user-route/user-language')
    const userOtp = require('./server/routes/web/user-route/otp-route')




    app.use('/language', languageRoutes)
    app.use('/movie', movieRoutes)
    app.use('/add-title', titleRoutes)
    app.use('/user', userRoutes)
    app.use('/language', userLanguageRoutes)
    app.use('/otp', userOtp)


    //

     app.post('/user/login',  async function (req, res){  
       const {password,phone_number} = req.body;
       console.log( req.body)
       try {
          console.log(req.sessionID)
          const user = await Users.findOne({phone_number:phone_number});
          if(user)  {
              console.log(user.password)
              if(user.password ==  password){
                  req.session.authenticated = true;
                  req.session.user = {
                      user_id : user.user_id,
                      first_name : user.first_name,
                      default_language:user.default_language,
                      membership_plan:user.membership_plan
                  }
                  req.session.isAuth = true;
                  console.log(req.session)
                  res.send("user")
              }else{
                  res.send("invalid password or phone number")
              }
          }else{
              res.send("not a user") 
          }
      } catch (error) { 
          res.send(error)   
      }
    }) 
    
     app.get("/user/logout",(req, res) => {
        console.log("this is logout")
        req.session.destroy((err)=>{
             if(err) throw err;
            res.send("session destroy")
           
        })
      }); 
      app.get("/api/welcome",(req, res) => {
        console.log(req.session)
        res.status(200).send("Welcome 🙌 ");
      });

      //
      app.get('/video/:id', (req, res) => {
        const path = `./server/public/movies/${req.params.id}.mp4`;
        const stat = fs.statSync(path);
        const fileSize = stat.size;
        const range = req.headers.range;
        console.log(range)
        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1]
                ? parseInt(parts[1], 10)
                : fileSize-1;
            const chunksize = (end-start) + 1;
            const file = fs.createReadStream(path, {start, end});
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(path).pipe(res);
        }
    });

      //

     if(process.env.NODE_ENV=='production'){
         const path = require('path')
        app.use(express.static(path.join("client/build")))
     app.get('/',(req,res)=>{
         app.use(express.static(path.resolve(__dirname,'client','build')))
         res.sendFile(path.resolve(__dirname,'client','build','index.html'))
     })
 }

    // server
    const port = process.env.PORT || 4000;
    app.listen(port, () => {
      console.log(`Example app listening on port ${port}`)
    })