import React, { useState } from 'react';
import { Editor } from 'primereact/editor';

function QuestionTextEditor(props) {
    const [text1, setText1] = useState('<div>Hello World!</div><div>PrimeReact <b>Editor</b> Rocks</div><div><br></div>');
    const renderHeader = () => {
        return (
            <span className="ql-formats">
                <button className="ql-bold" aria-label="Bold"></button>
                <button className="ql-italic" aria-label="Italic"></button>
                <button className="ql-underline" aria-label="Underline"></button>
            </span>
        );
    }
    const header = renderHeader();
    return (
        <div>
            <div className="card">
                <Editor style={{ minHeight: '120px' }} value={text1} onTextChange={(e) => setText1(e.htmlValue)} />
            </div>
        </div>
    );
}

export default QuestionTextEditor;