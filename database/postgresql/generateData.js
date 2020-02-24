const faker = require('faker');

module.exports = {
  randomArtist() {
    const outputString = `${faker.name.findName()}`;
    return outputString;
  },
  randomSong() {
    const outputObject = {
      title: faker.lorem.word(),
      duration: Math.floor(Math.random() * 600),
      songUrl: faker.internet.url(),
      songImage: faker.image.imageUrl(30, 30),
    };
    return outputObject;
  },
  randomAlbum() {
    const outputString = faker.lorem.word();
    return outputString;
  },
};
