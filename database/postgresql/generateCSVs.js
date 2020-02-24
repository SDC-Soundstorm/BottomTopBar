const fs = require('fs');
const path = require('path');

const data = require('./generateData.js');

const artistsTablePath = path.join(__dirname, 'data', 'artistsTable.csv');
const songsTablePath = path.join(__dirname, 'data', 'songsTable.csv');
const playlistsTablePath = path.join(__dirname, 'data', 'playlistsTable.csv');
const genresTablePath = path.join(__dirname, 'data', 'genres_songsTable.csv');

const ARTIST_COUNT = 500000;
const SONGS_PER_ARTIST = 20;
const ALBUMS_PER_ARTIST = 2;
const SONGS_PER_ALBUM = 10;
const TOTAL_ALBUMS = 1000000;
const TOTAL_SONGS = 10000000;
const GENRE_PLAYLIST_SIZE = 40;
const GENRES = ['rock', 'punk', 'rap', 'country', 'funk',
  'jazz', 'classical', 'soul', 'musical', 'dnb', 'house'];

const artistsStream = fs.createWriteStream(artistsTablePath);
const songsStream = fs.createWriteStream(songsTablePath);
const playlistsStream = fs.createWriteStream(playlistsTablePath);
const genresStream = fs.createWriteStream(genresTablePath);

let artist, title, albumName, duration, songUrl, songImage, artistId, albumId, songId;

function writeArtist() {
  let ok = true;
  do {
    i += 1;
    artist = data.randomArtist();
    if (i === ARTIST_COUNT) {
      artistsStream.write(`${artist}\n`);
    } else {
      ok = artistsStream.write(`${artist}\n`);
    }
  } while (i < ARTIST_COUNT && ok);
  if (i < ARTIST_COUNT) {
    artistsStream.once('drain', writeArtist);
  }
}

function writeAlbum() {
  let ok = true;
  do {
    j += 1;
    artistId = Math.ceil(j / ALBUMS_PER_ARTIST);
    albumName = data.randomAlbum();
    if (j === TOTAL_ALBUMS) {
      playlistsStream.write(`${albumName},,${artistId}\n`);
    } else {
      ok = playlistsStream.write(`${albumName},,${artistId}\n`);
    }
  } while (j < TOTAL_ALBUMS && ok);
  if (j < TOTAL_ALBUMS) {
    playlistsStream.once('drain', writeAlbum);
  } else if (j === TOTAL_ALBUMS) {
    for (let i = 0; i < GENRES.length; i += 1) {
      playlistsStream.write(`top ${GENRE_PLAYLIST_SIZE}: ${GENRES[i]},${GENRES[i]},\n`);
    }
  }
}

function writeSong() {
  let ok = true;
  do {
    k += 1;
    artistId = Math.ceil(k / SONGS_PER_ARTIST);
    albumId = Math.ceil(k / SONGS_PER_ALBUM);
    ({ title, duration, songUrl, songImage } = data.randomSong());
    if (k === TOTAL_SONGS) {
      songsStream.write(`${title},${albumId},${artistId},${duration},${songUrl},${songImage}\n`);
    } else {
      ok = songsStream.write(`${title},${albumId},${artistId},${duration},${songUrl},${songImage}\n`);
    }
  } while (k < TOTAL_SONGS && ok);
  if (k < TOTAL_SONGS) {
    songsStream.once('drain', writeSong);
  }
}

function writeGenrePlaylists() {
  for (let i = 0; i < GENRES.length; i += 1) {
    for (let j = 0; j < 40; j += 1) {
      songId = Math.ceil(Math.random() * TOTAL_SONGS);
      albumId = TOTAL_ALBUMS + i + 1;
      genresStream.write(`${albumId},${songId}\n`);
    }
  }
}

let i = 0;
let j = 0;
let k = 0;

writeArtist();
writeAlbum();
writeSong();
writeGenrePlaylists();
