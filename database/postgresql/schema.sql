\c postgres;

DROP DATABASE IF EXISTS soundstorm;

CREATE DATABASE soundstorm;

\c soundstorm;

CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80) NOT NULL,
  artist fk -> artists.id NOT NULL,
  duration INT NOT NULL,
  song_url STRING
  song_image STRING
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  type VARCHAR(80) NOT NULL,
  artist fk -> artists.id,
);

CREATE TABLE songs_playlists (
  song_id fk -> songs.id NOT NULL,
  playlist_id fk -> playlists.id NOT NULL
);

-- plan for getting album a song belongs to:
-- 1. use songs_playlists to get all playlists a song is associated with
-- 2. use the resulting playlist ids to query the playlists 
--   table and find the playlist id that has a non-null artist id
-- 3. use the playlist id to find the song list from songs_playlists

-- look into optimizations per database: queries, table structures, indexing

-- research strengths and weaknesses of each type based on the data shape and scale for decisions
-- what other features and scaling do each of these types support?
