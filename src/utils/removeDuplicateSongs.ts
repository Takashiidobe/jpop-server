import SongData from "./SongData";

function removeDuplicateSongs(songs: SongData[]): SongData[] {
  const cleanedItems = Array.from(new Set(songs));

  const cleaned = [];

  let i = 0;
  let j = 1;
  cleaned.push(cleanedItems[i]);
  while (j < cleanedItems.length) {
    if (cleanedItems[i].rank !== cleanedItems[j].rank) {
      cleaned.push(cleanedItems[j]);
      i++;
      j++;
    } else {
      i++;
      j++;
    }
  }

  return cleaned;
}

export default removeDuplicateSongs;
