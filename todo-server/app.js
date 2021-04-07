const users = require('./routes/users');
const auth = require('./routes/auth');
const todos = require('./routes/todos');
const favorites = require('./routes/favorite');
const express = require('express');
const app = express();
const http = require('http').Server(app);
const mongoose = require('mongoose');
const cors = require('cors');

mongoose.connect('mongodb://localhost/api', {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
}).then(() => console.log('Connected to MongoDB...'))
  .catch(() => console.error('Could not connect to MongoDB...'));

app.use(cors())
app.use(express.json());


const errorHandler = () => {
    res.status(500).send("An unexpected error occurred");
}

app.use('/api/users', users);
app.use('/api/auth', auth);
app.use('/api/todos', todos);
app.use('/api/favorites', favorites);
app.use(errorHandler);


const port = process.env.PORT || 3900;
http.listen(port, () => console.log(`Listening on port ${port}...`));
