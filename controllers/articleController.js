const express = require('express');
const router = express.Router();

// Database
const db = require('../models');

// Articles Index
router.get('/', (req, res) => {
  db.Article.find({}, (err, allArticles) => {
    if (err) return console.log(err);

    console.log(allArticles);

    res.render('articles/index', {
      articles: allArticles,
    });
  });
});

// Articles New
router.get('/new', (req, res) => {
  db.Author.find({}, (err, authors) => {
    if (err) console.log(err);
    res.render('articles/new', {authors});
  })
});


// Articles Create
router.post('/', (req, res) => {
  console.log(req.body);
  db.Article.create(req.body, (err, newArticle) => {
    if (err) return console.log(err);

    console.log(newArticle);
    db.Author.findById(req.body.authorId, (err, foundAuthor) => {
      foundAuthor.articles.push(newArticle);
      foundAuthor.save((err, savedAuthor) => {
        console.log('savedAuthor: ', savedAuthor);
        res.redirect('/articles');
      })
    })
  });
});


// Articles Show
router.get('/:id', (req, res) => {
  db.Author.findOne({'articles': req.params.id})
    .populate({
      path: 'articles',
      match: {_id: req.params.id}
    })
    .exec((err, foundAuthor) => {
      console.log('author: ', foundAuthor);
      res.render('articles/show', {
        article: foundAuthor.articles[0],
        author: foundAuthor
      });
    })
});


// Articles Edit
router.get('/:id/edit', (req, res) => {
  db.Author.find({}, (err, allAuthors) => {
    db.Author.findOne({'articles': req.params.id})
      .populate({
        path: 'articles',
        match: {_id: req.params.id}
      })
      .exec((err, foundArticleAuthor) => {
        res.render('./articles/edit', {
          article: foundArticleAuthor.articles[0],
          authors: allAuthors,
          articleAuthor: foundArticleAuthor
        })
    })
  })
});

// Articles Update
router.put('/:id/', (req, res) => {
  db.Article.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    (err, updatedArticle) => {
    if (err) return console.log(err);
    db.Author.findOne({'articles': req.params.id}, (err, foundAuthor) => {
      if (foundAuthor._id.toString() !== req.body.authorId){
        foundAuthor.articles.remove(req.params.id);
        foundAuthor.save((err, savedAuthor) => {
          db.Author.findById(req.body.authorId, (err, newAuthor) => {
            newAuthor.articles.push(updatedArticle);
            newAuthor.save((err, savedNewAuthor) => {
              res.redirect(`/articles/${req.params.id}`);
            })
          })
        })
      } else {
        res.redirect(`/articles/${req.params.id}`); // redirect to articles show route
      }
    })
  });
});


// Articles Destroy
router.delete('/:id', (req, res) => {
  db.Article.findByIdAndDelete(req.params.id, (err, deletedArticle) => {
    if (err) return console.log(err);
    console.log(deletedArticle);
    db.Author.findOne({'articles': req.params.id}, (err, foundAuthor) => {
      foundAuthor.articles.remove(req.params.id);
      foundAuthor.save((err, updatedAuthor) => {
        console.log(updatedAuthor);
        res.redirect('/articles');
      })
    })
  });
});


module.exports = router;
