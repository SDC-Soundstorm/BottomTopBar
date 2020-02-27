import http from 'k6/http';
import { check, sleep } from 'k6';
// import e from 'express';

export const options = {
  vus: 600,
  duration: '300s',
};
let random;
let counter = 0;
const url = 'http://localhost:3000/';
const getPath = 'playlists/song/';
const postPath = 'songs';
const payload = JSON.stringify({
  title: 'new song from k6!',
  artistId: 32449,
  albumId: 123928,
  duration: 1089,
  songUrl: 'https://some.website.org',
  songImage: 'https://imagur.net',
});
const params = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export default function () {
  if (counter % 1000 === 0) {
    const res = http.post(`${url}${postPath}`, payload, params);
    check(res, {
      'POST status was 200': r => r.status == 200,
      'POST transaction time OK': r => r.timings.duration < 200,
    });
  } else {
    random = Math.ceil(Math.random() * 10000000);
    const res = http.get(`${url}${getPath}${random}`);
    check(res, {
      'GET status was 200': r => r.status == 200,
      'GET transaction time OK': r => r.timings.duration < 200,
    });
  }
  counter += 1;
  // random = Math.ceil(Math.random() * 10000000);
  // const res = http.get(`${url}${getPath}${9999999}`);
  // check(res, {
  //   'GET status was 200': r => r.status == 200,
  //   'GET transaction time OK': r => r.timings.duration < 200,
  // });
  sleep(0.1);
}
