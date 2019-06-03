const express = require('express');
const app = express();

app.use(express.static('.'));

app.listen(3000, () => {
  console.log('server is running on port 3000!');
});

app.get('/data', (req, res) => {
  res.send('data');
});