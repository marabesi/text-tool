import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect, useState } from 'react';
import { defaultStopWords } from './StopWords';

interface MostFrequent {
  word: string
  count: number
  rank: number
}

function App() {
  const [text, setText] = useState<string>('');
  const [charCount, setCharCount] = useState<number>();
  const [wordCount, setWordCount] = useState<number>();
  const [mostFrequent, setMostFrequent] = useState<MostFrequent[]>([]);
  const [stopWords, setStopWords] = useState<string[]>([]);
  const [isStopWordsEnabled, setIsStopWordsEnabled] = useState<boolean>(true);
  const [originalStopWords, setOriginalStopWords] = useState<string>(defaultStopWords);

  useEffect(() => {
    setCharCount(text.length);
    const strings = text.split(' ');

    if (text) {
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

      setMostFrequent(sortByMostFrequent);
      setWordCount(listOfStrings.length);

    } else {
      setWordCount(0);
      setMostFrequent([]);
    }
  }, [text, stopWords, isStopWordsEnabled]);

  const onStopWordsChanged = (value: string) => {
    setOriginalStopWords(value);
    const strings = value.split(',');
    const cleanedStopWords = strings
      .filter(stop => stop !== '')
      .map(stop => stop.replace('\n', ''));

    setStopWords(cleanedStopWords);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col w-4/5">
        <div className="flex items-center">
          <p className="p-2 m-2 border-2 w-60">
            Chars: {charCount}
          </p>
          <p className="p-2 m-2 border-2 w-60">
            Words: {wordCount}
          </p>
          <label htmlFor="stopwords">
            Ignore stop words
            <input
              type="checkbox"
              id="stopwords"
              className="ml-2"
              checked={isStopWordsEnabled}
              onChange={changed => setIsStopWordsEnabled(changed.target.checked)}
            />
          </label>
        </div>
        <div className="m-2">
          <textarea
            className="border-2 w-full outline-none"
            style={{ minHeight: '70vh' }}
            data-testid="text-area"
            onChange={changed => setText(changed.target.value)}
            defaultValue={text}
            rows={10}
            placeholder="Type here"
          />
          <textarea
            data-testid="stop-words-area"
            className="border-2 w-full outline-none"
            style={{ minHeight: '15vh' }}
            onChange={changed => onStopWordsChanged(changed.target.value)}
            placeholder="Stop words: the, an, I"
            defaultValue={originalStopWords}
            disabled={!isStopWordsEnabled}
          />
        </div>
      </div>
      <div className="overflow-y-scroll w-1/5">
        <h1 className="font-bold">Most frequent words</h1>
        {mostFrequent.map((frequent, index) => <p key={index}>{frequent.rank}. {frequent.word}: {frequent.count}</p>)}
      </div>
    </div>
  );
}

export default App;
