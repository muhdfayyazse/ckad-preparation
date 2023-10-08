const express = require('express');
const app = express();
const connectDb = require('./src/connection');
const User = require('./src/User.model');
const cors = require('cors');
const bodyParser = require('body-parser');

const PORT = process.env.BACKEND_PORT || 8000;
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))


app.get('/users', async (req, res) => {
  const users = await User.find();

  res.json(users);
});

app.post('/user-create', async (req, res) => {
  let data = req.body;
  const user = new User({ username: data.username });
  await user.save().then(() => console.log('User created'));
  res.send('User created \n');
});


app.listen(PORT, function() {
  console.log(`Listening on ${PORT}`);

  connectDb().then(() => {
    console.log('MongoDb connected');
  });
});
