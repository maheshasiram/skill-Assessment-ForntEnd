import React, { useState } from 'react';
import { Editor } from 'primereact/editor';

function QuestionTextEditor(props) {
    //const [text1, setText1] = useState('<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>');
  
    return (
        <div>
            <div className="card">
                <Editor style={{ minHeight: '200px' }}  />
            </div>
        </div>
    );
}

export default QuestionTextEditor;