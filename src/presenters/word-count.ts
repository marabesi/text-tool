import { WordCountResult } from '../use-cases/types/types';
import { wordCountFor } from '../use-cases/words-count';

export function format(text: string[], stopWords: string[], isStopWordsEnabled: boolean) : WordCountResult  {
  if (text) {
    return wordCountFor(text, stopWords, isStopWordsEnabled);
  }

  return {
    listOfStrings: [], sortByMostFrequent: []
  };
}