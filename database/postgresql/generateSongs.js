const fs = require('fs');
const faker = require('faker');
const path = require('path');

const targetFile = path.join(__dirname, 'songsTable.csv');
const SONGS = 10000000;

// postgres schema and data
// table: artists
  // id: pri auto
  // name: str

// table: songs
  // id: pri auto
  // title: str
  // artist: fk -> artists.id
  // duration: int
  // song_url: str
  // song_image: str

let outputString = 'title,artist,duration,song_url,song_image\n';
for (let i = 0; i < SONGS; i += 1) {
  outputString += `${faker.name.findName()},\n`;
}

fs.writeFile(targetFile, outputString, (err, written) => {
  if (err) {
    console.log('error occurred during write:', err);
  } else {
    console.log('writing complete, bytes written:', written);
  }
});
