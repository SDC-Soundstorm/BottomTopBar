artists_by_id
id: UUID PRIMARY
name: STR
albums: array of STRs

songs by id
id: UUID PRIMARY
title: STR
artist: STR
album: array of STRs (if songs can be in multiple albums)
duration: INT
song_url: STR
song_image: STR

playlists by album
id: UUID
name: STR (used for albums) PRIMARY
artist: STR CLUSTER
songs: array of song objects

playlists by genre
id: UUID
genre: STR PRIMARY
songs: array of song objects





supported queries by endpoint
songs
  get song/:id
  table song by id

  post song
  table song by id

  patch song
  table song by id

  delete song
  need to delete song out of any playlist table(s) that lists song ids
  then delete song from table song by id

playlists
  get playlists/genres
  table playlists by genre

  get playlists/:albumname
  table playlists by album

  get playlists/song/:id
  table songs by album
  then 
  table playlists by album

  post playlists/:playlistid/song/:songid
  *only supports albums
  table playlists by album

  delete playlists/:playlistid/song/:songid
  table playlists by album

artists
  get artists/:id
  table artists by id

  post artists
  table artists by id

  patch artsts/:id
  table artists by id

  delete artists/:id
  table artists by id
  then



howto delete artist:
  get artist data by id
  get all song ids from songs by album
  delete all songs with those ids from songs by id
  get all genre playlists, delete any matching song ids
  delete matching songs from reults
  delete all albums from playlists by album
  delete artist from artists by id