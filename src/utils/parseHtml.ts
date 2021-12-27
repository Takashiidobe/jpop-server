import cheerio from "cheerio";
import SongData from "./SongData";

function parseHtml(html: string): SongData[] {
  let $ = cheerio.load(html);
  const titles = $(".c-title.a-no-trucate")
    .text()
    .trim()
    .split("\n")
    .filter((item) => item !== "");

  const artists = $(".c-label.a-no-trucate")
    .text()
    .trim()
    .split("\n")
    .filter((item) => item !== "");

  const songs = [];

  for (let i = 0; i < 100; i++) {
    songs.push({
      rank: i + 1,
      artist: artists[i],
      song: titles[i],
    });
  }

  return songs;
}

export default parseHtml;
