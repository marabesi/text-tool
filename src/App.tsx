import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect, useState } from 'react';

function App() {
  const [text, setText] = useState<string>('');
  const [charCount, setCharCount] = useState<number>();
  const [wordCount, setWordCount] = useState<number>(0);

  useEffect(() => {
    setCharCount(text.length);

    if (text) {
      setWordCount(text.split(' ').length);
    }
  }, [text]);

  return (
    <div className="flex flex-col">
      <div className="flex">
        <p className="p-2 m-2 border-2">Chars: {charCount}</p>
        <p className="p-2 m-2 border-2">Words: {wordCount}</p>
      </div>

      <div className="m-2">
        <textarea
          className="border-2 w-full outline-none"
          data-testid="text-area"
          onChange={changed => setText(changed.target.value)}
          defaultValue={text}
          rows={10}
        />
      </div>
    </div>
  );
}

export default App;
