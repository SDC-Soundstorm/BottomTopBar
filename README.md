# BottomTopBar
Top navigation bar and bottom audio player
-Top navigation bar:

-Bottom audio player:

## API routes:

### /songs

**GET /songs/:id**

retrieves the song that matches id param

request body: n/a

response body: song object

```
{
  title: String,
  artist: String,
  album:: String
  length: Number,
  song_url: String,
  song_image: String,
}
```

**POST /songs**

saves new song to the database, id auto-generated

request header: `content-type: application/json`

request body: JSON object representing song shape

```
{
  title: String,
  artist: String,
  album:: String
  length: Number,
  song_url: String,
  song_image: String,
}
```

response body: database id of the created record

**PATCH /songs/:id**

updates properties of the song record specified by id param

request header: `content-type: application/json`

request body: JSON object representing properties of song to modify

```
{
  title: String,
  artist: String,
  album:: String
  length: Number,
  song_url: String,
  song_image: String,
}
```

all properties are optional

**DELETE /songs/:id**

deletes song that matches id param

request body: n/a

response body: n/a

### /playlists

**GET /playlists/genres**

retrieves all curated genre playlists

request body: n/a

response body: array of playlist objects

```
[
  <playlistObj>
]

{
  id: UUID,
  name: String
}
```

**GET /playlists/:id**

retrieves array of songs that match playlist id param

request body: n/a

response body: array of song objects

```
[
  <songObj>
]

{
  id: UUID,
  title: String,
  artist: String,
  album:: String
  length: Number,
  song_url: String,
  song_image: String,
}
```

**GET /playlists/song/:id**

retrieves array of songs from the album to which the song id param belongs

request body: n/a

response body: array of song objects

```
[
  <songObj>
]

{
  id: UUID,
  title: String,
  artist: String,
  album:: String
  length: Number,
  song_url: String,
  song_image: String,
}
```

**POST /playlists/:playlistid/song/:songid**

adds a song in the playlist based on id params

request body: n/a

response body: n/a

**DELETE /playlists/:playlistid/song/:songid**

removes a song in the playlist based on id params

request body: n/a

response body: n/a

### /artists

**GET /artists/:id**

retrieves artist data based on id param

request body: n/a

response body: object representing artist data

```
{
  id: UUID,
  name: String
}
```

**POST /artists**

saves a new artist to the database, id auto-generated

request header: `content-type: application/json`

request body: object representing artist data

```
{
  name: String
}
```

response body: database id of created record

**PATCH /artists/:id**

updates artist record with new data

request header: `content-type: application/json`

request body: JSON object representing properties of artist to modify

```
{
  name: String
}
```

all properties are optional

**DELETE /artists/:id**

deletes artist based on id param

request body: n/a

response body: n/a
