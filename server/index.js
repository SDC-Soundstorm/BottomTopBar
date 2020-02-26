require('newrelic');
const express = require('express');
const compression = require('compression');
const path = require('path');

const pool = require('../database/postgresql/index.js');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());
app.use(compression());

app.listen(PORT, () => { console.log(`Listening on PORT: ${PORT}`); });

app.get('/initial', (req, res) => {
  const callback = (data) => {
    res.json(data);
  };

  db.getInitial(callback);
});

app.post('/songs', (req, res) => {
  const song = req.body;
  pool.postSong(song, (err, id) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(id);
    }
  });
});

app.get('/playlists/song/:id', (req, res) => {
  const { id } = req.params;
  pool.getPlaylist(id, (err, data) => {
    if (err) {
      res.sendStatus(404);
    } else {
      res.send(data);
    }
  });
});
