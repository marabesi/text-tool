import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect, useState } from 'react';

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

  useEffect(() => {
    setCharCount(text.length);
    const strings = text.split(' ');

    if (text) {
      const listOfStrings = strings.filter(strings => strings !== '');

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
    }
  }, [text]);

  return (
    <div className="flex h-screen overflow-hidden">
      <div className="flex flex-col w-4/5">
        <div className="flex">
          <p className="p-2 m-2 border-2 w-60">
            <span className="font-bold">Chars</span>: {charCount}
          </p>
          <p className="p-2 m-2 border-2 w-60">
            <span className="font-bold">Words</span>: {wordCount}
          </p>
        </div>

        <div className="m-2">
          <textarea
            className="border-2 w-full outline-none"
            style={{ minHeight: '90vh' }}
            data-testid="text-area"
            onChange={changed => setText(changed.target.value)}
            defaultValue={text}
            rows={10}
            placeholder="Type here"
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
