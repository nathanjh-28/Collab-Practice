const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/express-blog-collab';

mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
})
  .then(() => console.log('MongoDB connected successfully'))
  .catch((err) => console.log(`MongoDB connection error: ${err}`));


// Make All Models Available
module.exports = {
    Author: require('./Author'),
    Article: require('./Article'),
};
