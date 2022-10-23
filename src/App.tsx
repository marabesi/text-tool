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
    <div>
      <p>Chars: {charCount}</p>
      <p>Words: {wordCount}</p>
      <textarea
        data-testid="text-area"
        onChange={changed => setText(changed.target.value)}
        defaultValue={text}
      />
    </div>
  );
}

export default App;
