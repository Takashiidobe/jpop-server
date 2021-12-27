import request from 'request';
import express, { Application, Request, Response } from 'express'
import SongData from './utils/SongData';
import parseHtml from './utils/parseHtml';
import removeDuplicateSongs from './utils/removeDuplicateSongs';

const CHARTS_URL = "https://www.billboard.com/charts/japan-hot-100";

const PORT = process.env.PORT || 3001;
const app: Application = express();

let currentDate: number | null = null;
let songs: SongData[] = [];

function fetchSongs() {
  request(CHARTS_URL, (err, res, html) => {
    if (!err && res.statusCode === 200) {
      songs = removeDuplicateSongs(parseHtml(html));
      currentDate = Date.now();
    }
  });
}

app.get('/', (_: Request, res: Response) => {
  if (Date.now() - 86400000 > currentDate) {
    fetchSongs();
  }
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.json(songs);
});

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}!`);
  fetchSongs();
});
