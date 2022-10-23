import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useEffect, useState } from 'react';
function App() {
  const [text, setText] = useState<string>('');
  const [charCount, setCharCount] = useState<number>();
  useEffect(() => {
    setCharCount(text.length);
  }, [text]);
  return (
    <div>
      <p>Chars: {charCount}</p>
      <textarea
        data-testid="text-area"
        onChange={changed => setText(changed.target.value)}
        defaultValue={text}
      />
    </div>
  );
}

export default App;
