const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_CONNECTION_STRING;

mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

mongoose.connect(MONGODB_URI, () => {
  console.log('Sucessfully connected to MongoDB.');
});
