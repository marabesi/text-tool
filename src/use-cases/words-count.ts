import { MostFrequent, WordCountResult } from './types/types';

export function wordCountFor(strings: string[], stopWords: string[], isStopWordsEnabled: boolean): WordCountResult {
  let listOfStrings = strings.filter(strings => strings !== '');

  if (stopWords.length && isStopWordsEnabled) {
    listOfStrings = listOfStrings.filter(strings => {
      for (let stop of stopWords) {
        if (strings.includes(stop)) {
          return false;
        }
      }
      return true;
    });
  }

  const empty = [];
  for (const word in listOfStrings) {
    empty.push(
      { rank: 0, word: listOfStrings[word], count: 0 }
    );
  }

  for (const word in listOfStrings) {
    const found: MostFrequent | undefined = empty.find(strings => strings.word === listOfStrings[word]);
    if (found) {
      found.count++;
    }
  }

  const sortByMostFrequent = empty.sort((a, b) => b.count - a.count);

  for (let i = 0; i < sortByMostFrequent.length; i++) {
    sortByMostFrequent[i].rank = i + 1;
  }
  return { listOfStrings, sortByMostFrequent };
}