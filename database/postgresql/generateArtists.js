const fs = require('fs');
const faker = require('faker');
const path = require('path');

const targetFile = path.join(__dirname, 'artistsTable.csv');
const ARTISTS = 1000000;

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

let outputString = 'id,name,\n';
for (let i = 0; i < ARTISTS; i += 1) {
  outputString += `${i + 1},${faker.name.findName()},\n`;
}

fs.writeFile(targetFile, outputString, (err, written) => {
  if (err) {
    console.log('error occurred during write:', err);
  } else {
    console.log('writing complete, bytes written:', written);
  }
});
