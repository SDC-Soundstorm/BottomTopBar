CREATE TABLE artists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL
);

CREATE TABLE songs (
  id SERIAL PRIMARY KEY,
  title VARCHAR(80) NOT NULL,
  artist fk -> artists.id,
  duration INT NOT NULL,
  song_url STRING
  song_image STRING
);

CREATE TABLE playlists (
  id SERIAL PRIMARY KEY,
  name VARCHAR(80) NOT NULL,
  is_album BOOL NOT NULL
);

CREATE TABLE songs_playlists (
  song_id fk -> songs.id,
  playlist_id fk -> playlists.id
);