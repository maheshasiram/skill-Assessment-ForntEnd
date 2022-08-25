import * as React from 'react';
import QuestionTabs from './CategoryTabs';

function QuestionMainComponent(props) {
    
    return (
        <div className='questionsComponent'>
            <h2 className='text-left'>Questions</h2>
            <div className='unAssignedMsg'>No Technology is assigned to create question</div>
            <QuestionTabs />
     
        </div>
    );
}

export default QuestionMainComponent;

