const express = require('express');
const path = require('path');

const db = require('../database/index.js');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.listen(PORT, () => { console.log(`Listening on PORT: ${PORT}`); });

app.get('/initial', (req, res) => {
  const callback = (data) => {
    res.json(data);
  };

  db.getInitial(callback);
});

app.get('/songs', (req, res) => { // ideally should be keyed on a user or anon
  db.getSongs((err, data) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(data);
    }
  });
});

app.get('/songs/:id', (req, res) => { // utilizes the _id field native to each mongo doc, but could also be a number
  const { id } = req.params;
  db.getSong(id, (err, song) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(song);
    }
  });
});

app.post('/songs', (req, res) => {
  const song = req.body;
  db.postSong(song, (err, id) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(id);
    }
  });
});

app.put('/songs/:id', (req, res) => {
  const { id } = req.params;
  const songData = req.body;
  db.updateSong(id, songData, (err) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send();
    }
  });
});

app.delete('/songs/:id', (req, res) => {
  const { id } = req.params;
  db.deleteSong(id, (err, song) => {
    if (err) {
      res.sendStatus(500);
    } else {
      res.send(song);
    }
  });
});

// module.exports = app;
