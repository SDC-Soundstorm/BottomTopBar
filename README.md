# BottomTopBar
Top navigation bar and bottom audio player
-Top navigation bar:

-Bottom audio player:

# API routes:
**GET /songs**

retrieves first 100 songs

request body: n/a

response body: array of song objects

song object shape:

{
  title: String,
  artist: String,
  length: Number,
  song_url: String,
  song_image: String,
}

**GET /songs/:id**

retrieves song that matches id param

request body: n/a

response body: song object

**POST /songs**

saves song info to the database

request header: content-type: application/json

request body: JSON object representing song shape

{
  title: String,
  artist: String,
  length: Number,
  song_url: String,
  song_image: String,
}

response body: database id of the created record

**PUT /songs/:id**

updates properties of the song record specified by id param

request body: JSON object representing properties of song to modify

all properties are optional

**DELETE /songs/:id**

deletes song that matches id param

request body: n/a

response body: song object that was deleted
