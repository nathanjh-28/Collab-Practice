/* --------------------- Import Tools As Variables ------------------- */


// 1. importing the express tools
const express = require('express');
// 2. importing the tool method override
const methodOverride = require('method-override');
// 3. making express in to an object called app we can use
const app = express();
// 4. Make a port Variable
const PORT = process.env.PORT || 4000;

/* --------------------- Controllers ------------------- */

// 5. link up your controller files
const articleCtrl = require('./controllers/articleController');
const authorCtrl = require('./controllers/authController');

// 6. Set View engine to EJS
app.set('view engine','ejs');

/* --------------------- Middleware ------------------- */

// 7. Serve Static Assets (Front End JS, CSS, Images, etc)
app.use(express.static(`${__dirname}/public`));

// 8. Add the tool Method Override
app.use(methodOverride('_method'));

// 9. Add the tool Body Parser
app.use(express.urlencoded({extended: false}));

// 10.  Kenny's custom Logger middleware
app.use((req,res,next)=>{
console.log(`${req.method}${req.url}${new Date().toLocaleTimeString()}`);
next();
});

/* --------------------- Routes ------------------- */

// 11. Home (Root) Route, this will render the index ejs file, right now we are just gonna have links to other parts of the app.
app.get('/', (req,res) => {
    res.render('index');
});

// 12. Route to your Routers using the variables from the top
// app.use('/authors', authorCtrl);
// app.use('/articles', articleCtrl);

// 13.  404 Error, for all other routes, serve up a 404 error
app.get('*', (req,res)=>{
res.send('<h1> 404 this is not the page you are looking for </h1>');
});

/* --------------------- Start Server Listener ------------------- */

// 14. Start the server listener using the PORT variable at the top of page
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));