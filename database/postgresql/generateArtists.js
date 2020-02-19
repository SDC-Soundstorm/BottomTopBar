const fs = require('fs');
const faker = require('faker');
const path = require('path');

const targetFile = path.join(__dirname, 'artistsTable.csv');


let outputString = '';
for (let i = 0; i < 100000; i += 1) {
  outputString += `${faker.name.findName()},\n`;
}

fs.writeFile(targetFile, outputString, (err, written) => {
  if (err) {
    console.log('error occurred during write:', err);
  } else {
    console.log('writing complete, bytes written:', written);
  }
});
