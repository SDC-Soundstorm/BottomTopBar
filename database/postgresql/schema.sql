\c postgres;

DROP DATABASE IF EXISTS soundstorm;

CREATE DATABASE soundstorm;

\c soundstorm;

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  type VARCHAR(80),
  artist_id INT REFERENCES artists ON DELETE CASCADE
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80) NOT NULL,
  album_id INT NOT NULL REFERENCES playlists ON DELETE CASCADE,
  artist_id INT NOT NULL REFERENCES artists ON DELETE CASCADE,
  duration INT NOT NULL,
  song_url VARCHAR(80) NOT NULL,
  song_image VARCHAR(80) NOT NULL
);

CREATE TABLE songs_playlists (
  playlist_id INT NOT NULL REFERENCES playlists ON DELETE CASCADE,
  song_id INT NOT NULL REFERENCES songs ON DELETE CASCADE
);

COPY artists(name) FROM '/Users/tyler/Documents/Galvanize/SDC/BottomTopBar/database/postgresql/data/artistsTable.csv' DELIMITER ',' CSV;

COPY playlists(name, type, artist_id) FROM '/Users/tyler/Documents/Galvanize/SDC/BottomTopBar/database/postgresql/data/playlistsTable.csv' DELIMITER ',' CSV;

COPY songs(title, album_id, artist_id, duration, song_url, song_image) FROM '/Users/tyler/Documents/Galvanize/SDC/BottomTopBar/database/postgresql/data/songsTable.csv' DELIMITER ',' CSV;

COPY songs_playlists(playlist_id, song_id) FROM '/Users/tyler/Documents/Galvanize/SDC/BottomTopBar/database/postgresql/data/genres_songsTable.csv' DELIMITER ',' CSV;

-- Queries by route
-- GET song/:id
SELECT * FROM songs WHERE id=?;
-- POST song
INSERT INTO songs (title, album_id, artist_id, duration, song_url, song_image) VALUES (?) RETURNING id;
INSERT INTO songs_playlists (playlist_id, song_id) VALUES (?); -- why post to curated playlist when adding a song to album?
-- PATCH song/:id
UPDATE songs SET ?=? WHERE id=? VALUES (?);
-- DELETE song/:id
DELETE FROM songs WHERE id=?;

-- GET playlists/genre
ALTER TABLE playlists ADD CONSTRAINT genres UNIQUE (type);
SELECT * FROM playlists WHERE type IS NOT NULL;
-- GET playlists/:id
CREATE INDEX ON songs (album_id);
SELECT * FROM songs WHERE album_id=?;
-- GET playlists/song/:id
SELECT * FROM songs WHERE album_id=(SELECT album_id FROM songs WHERE id=?);

-- plan for getting album a song belongs to:
-- 1. use songs_playlists to get all playlists a song is associated with
-- 2. use the resulting playlist ids to query the playlists 
--   table and find the playlist id that has a non-null artist id
-- 3. use the playlist id to find the song list from songs_playlists

-- look into optimizations per database: queries, table structures, indexing

-- research strengths and weaknesses of each type based on the data shape and scale for decisions
-- what other features and scaling do each of these types support?

-- most used routes (but need one post):
-- get /playlists/song/:id
-- post /songs/