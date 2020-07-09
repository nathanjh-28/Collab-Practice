const express = require('express');
const router = express.Router();
const db = require('../models');

// Current Path = '/authors'

// Authors Index
router.get('/', (req, res) => {
  // Query the db for all authors
  db.Author.find({}, (err, allAuthors) => {
    if (err) return console.log(err);

    // Log all authors
    console.log('All Authors = ', allAuthors);

    // Render the index template with all authors
    res.render('authors/index', {
      authors: allAuthors,
    });
  });
});


// Authors New
router.get('/new', (req, res) => {
  res.render('authors/new');
});


// Authors Show
router.get('/:id', (req, res) => {
  // Query the database for the author by ID
  db.Author.findById(req.params.id)
    .populate({path: 'articles'})
    .exec((err, foundAuthor) => {
      if (err) return console.log(err);
      res.render('authors/show', {
        author: foundAuthor,
      });
  })
});


// Authors Create
router.post('/', (req, res) => {
  // Configure bodyParser
  // Query the database to create a new record

  // Log the request body
  console.log('Request body = ', req.body);


  db.Author.create(req.body, (err, newAuthor) => {
    if (err) return console.log(err);

    // Log the new author
    console.log('New Author = ', newAuthor);

    // Redirect authors index
    res.redirect('/authors');
  });
});


// Authors Edit
router.get('/:id/edit', (req, res) => {
  db.Author.findById(req.params.id, (err, foundAuthor) => {
    if (err) return console.log(err);

    res.render('authors/edit', {
      author: foundAuthor,
    });
  });
});


// Author Update
router.put('/:id', (req, res) => {
  // Log the data from client
  console.log('Updated Author = ', req.body);

  db.Author.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedAuthor) => {
      if (err) return console.log(err);

      res.redirect('/authors');
    }
  );
});


// Author Destroy
router.delete('/:id', (req, res) => {
  console.log('Deleting Author ID = ', req.params.id);

  db.Author.findByIdAndDelete(req.params.id, (err, deletedAuthor) => {
    if (err) return console.log(err);
    console.log('The deleted author = ', deletedAuthor);
    db.Article.deleteMany({
      _id: {
        $in: deletedAuthor.articles
      }
    }, (err, data) => {
      res.redirect('/authors');
    })
  });
});

module.exports = router;