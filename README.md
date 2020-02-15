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

response body: song object that was deleted

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
### /playlists

**GET /playlists/genre**

retrieves all curated genre playlists

request body: n/a

response body: array of playlist objects

```
{
  id: UUID,
  name: String
}
```

**GET /playlists/genre/:genrename**

retrieves curated array of songs that match the genre param

request body: n/a

response body: object with nested array of song objects

```
{
  id: UUID,
  [
    id: UUID,
    title: String,
    artist: String,
    album:: String,
    length: Number,
    song_url: String,
    song_image: String,
  ]
}
```

**GET /playlists/album/:albumname/artist/:artistid**

retrieves array of songs that match the album name and artist id params (assumes one artist can have one album of a specific name)

request body: n/a

response body: array of song objects

```
{
  id: UUID,
  [
    id: UUID,
    title: String,
    artist: String,
    album:: String,
    length: Number,
    song_url: String,
    song_image: String,
  ]
}
```

**POST /playlists**

posts a new playlist of either type genre or album, depending on shape of the data

request header: `content-type: application/json`

request body: playlist data including array of songs

```
{
  name: String,
  artistId: UUID (optional),
  songs: [
    songId: UUID
  ]
}

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

response body: playlist id of database record created

**DELETE /playlists/:id**

deletes playlist matching the id param

request body: n/a

response body: array of songIds in the deleted playlist

```
[
  songId: UUID,
]
```

**PATCH /playlists/:playlistid/song/:songid**

adds or removes a song in the playlist based on id params

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

response body: object representing artist data that was deleted

```
{
  name: String
}
```
