import { Editor } from 'react-draft-wysiwyg';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { useState } from 'react';
import { EditorState } from 'draft-js';
function App() {
  const [editor, setEditor] = useState<EditorState>(EditorState.createEmpty());

  return (
    <Editor
      webDriverTestID="text-area"
      editorState={editor}
      toolbarClassName="toolbarClassName"
      wrapperClassName="wrapperClassName"
      editorClassName="my-editor"
      onEditorStateChange={ed => {
        console.log(ed.getCurrentContent().getPlainText());
        setEditor(ed);
      }
      }
    />
  );
}

export default App;
