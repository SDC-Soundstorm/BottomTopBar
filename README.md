# BottomTopBar
Top navigation bar and bottom audio player
-Top navigation bar:

-Bottom audio player:

# API routes:
**GET /songs**
retrieves first 100 songs

**GET /songs/:id**
retrieves song that matches id param

**POST /songs/**
body: JSON object representing song shape
{
  title: String,
  artist: String,
  length: Number,
  song_url: String,
  song_image: String,
}
saves song info to the database
returns the id of the created song

**UPDATE /songs/:id**
body: JSON object representing new properties of the song
all properties are optional

**DELETE /songs/:id**
deletes song that matches id param
returns the song object that was deleted