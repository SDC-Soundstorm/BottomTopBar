const { Pool } = require('pg');

const pool = new Pool({
  user: 'postgres',
  host: '54.184.21.160',
  database: 'soundstorm',
  password: 'unbreakablepassword',
  port: 5432,
});

module.exports = {
  getPlaylist(songId, callback) {
    const query = 'SELECT * FROM songs WHERE album_id=(SELECT album_id FROM songs WHERE id=$1)';
    const values = [songId];
    pool.query(query, values)
      .then((res) => callback(null, res.rows))
      .catch((err) => {
        // console.log('error occurred during GET query', err.stack);
        callback(err);
      });
  },
  postSong(song, callback) {
    const songsQuery = 'INSERT INTO songs (title, album_id, artist_id, duration, song_url, song_image) VALUES ($1, $2, $3, $4, $5, $6) RETURNING id';
    const { title, albumId, artistId, duration, songUrl, songImage } = song;
    const values = [title, albumId, artistId, duration, songUrl, songImage];
    pool.query(songsQuery, values)
      .then((res) => {
        const data = res.rows[0];
        callback(null, data);
      })
      .catch((err) => {
        // console.log('error occurred during POST query', err.stack);
        callback(err);
      });
  },
  test(callback) {
    const math = 'SELECT 1+1';
    pool.query(math)
      .then((res) => {
        const data = res.rows[0];
        callback(null, data);
      })
      .catch((err) => {
        callback(err);
      });
  },
};
