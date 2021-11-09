const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('hello node js');
});

app.get('/api/course', (req, res) => {
  res.send([1, 2, 3]);
});

app.listen(3000, () => console.log('listening on port 3000'));
