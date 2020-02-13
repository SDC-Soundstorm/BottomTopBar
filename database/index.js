const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/soundclone',
  { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('connected');
});

const songSchema = mongoose.Schema({
  title: String,
  artist: String,
  length: Number,
  song_url: String,
  song_image: String,
});

const Song = mongoose.model('Song', songSchema);

module.exports = {
  getInitial: (cb) => {
    Song.find({}, null, { limit: 100 }, (error, docs) => {
      if (error) {
        console.log(error);
      } else {
        cb(docs);
      }
    });
  },
  getSongs: (callback) => {
    Song.find({}, null, { limit: 100 }, (err, docs) => {
      if (err) {
        callback(err);
      } else {
        callback(null, docs);
      }
    });
  },
  getSong: (id, callback) => {
    Song.findById(id, null, null, (err, docs) => {
      if (err) {
        callback(err);
      } else {
        callback(null, docs);
      }
    });
  },
  postSong: (song, callback) => {
    Song.create(song, (err, res) => {
      const { _id } = res;
      if (err) {
        callback(err);
      } else {
        callback(null, _id);
      }
    });
  },
  updateSong: (id, songData, callback) => {
    Song.findByIdAndUpdate(id, songData, (err) => { // data passed to cb could include the pre-modified doc
      if (err) {
        callback(err);
      } else {
        callback(null);
      }
    });
  },
  deleteSong: (id, callback) => {
    Song.findByIdAndDelete(id, (err, docs) => {
      if (err) {
        callback(err);
      } else {
        callback(null, docs);
      }
    });
  },
};
