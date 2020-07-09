const express = require('express');
const router = express.Router();

// Database
const db = require('../models');


// Articles Index
router.get('/', (req, res) => {
//   db.Article.find({}, (err, allArticles) => {
//     if (err) return console.log(err);

//     console.log(allArticles);

//     res.render('articles/index', {
//       articles: allArticles,
//     });
//   });
res.render('articles/index');

});