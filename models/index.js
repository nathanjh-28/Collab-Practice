const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/express-blog-12';

mongoose.connect(connectionString, {
<<<<<<< HEAD
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));
=======
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
    .then(() => console.log('MongoDB connected successfully'))
    .catch((err) => console.log(`MongoDB connection error: ${err}`));
>>>>>>> 086297b425e696c0ca4bb2edb4a42392eb946387


// Make All Models Available
module.exports = {
<<<<<<< HEAD
  Author: require('./Author'),
  Article: require('./Article'),
=======
    Author: require('./Author'),
    Article: require('./Article'),
>>>>>>> 086297b425e696c0ca4bb2edb4a42392eb946387
};
