const WORDS = require('./words.json');
const SIZE = 3250;

export default function getWord() {
  return WORDS.data[Math.floor(Math.random() * SIZE)].word.toUpperCase();
}
