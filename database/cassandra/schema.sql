songs
id: PRIMARY
title: STR
artist: STR
album: STR
duration: INT
song_url: STR
song_image: STR

playlists
id: PRIMARY
genre: str (can and should be null if not a top40)
name: STR (used for albums)
songs: array of song objects? or song ids?

usage: if getting a top40 playlist, 