import React, { useEffect, useState } from 'react';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddQuestionForms from './AddQuestionForms';
import { useDispatch, useSelector } from 'react-redux';
import { getQuestions } from '../../actions/actions';

function QuestionCategory(props) {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getQuestions())
  }, []);

  const {getAllQuestions}= useSelector(state=>state)
  const [expanded, setExpanded] = useState(false);
  const [actionType, setActionType] = useState('');
  const [open, setOpen] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const addQuestion = () => {
    setOpen(true);
    setActionType('Add Question');
  }

  const onSearcQuestions = () => {

  }

  const onCloseDialog = () => {
    setOpen(false);
  }
  return (
    <div>
      <div className='userActions d-flex mb-2 justify-content-end align-items-center'>
        <div className='serachUser'>
          <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText className='searchField' placeholder="Search Question" onChange={(e) => onSearcQuestions(e)} />
          </span>
        </div>
        <div className='addButton mx-2'>
          <Button icon="pi pi-plus" onClick={addQuestion} label='Add Question' className="p-button-rounded p-button-secondary" />
        </div>
      </div>
      {open && <AddQuestionForms
        actionType={actionType}
        onCloseDialog={onCloseDialog}
      />}
      {getAllQuestions && getAllQuestions.data && getAllQuestions.data.map((data,i)=>(
        
        <Accordion key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>{data.question}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Answer: {data.answer}
          </Typography>
          <Typography>
          author:{data.author}
          </Typography>
          <Typography>
          questionType:{data.questionType}
          </Typography>
          {data.options.map((opt,i)=>(
            <Typography key={i}>
            {i}:{opt}
            </Typography>
          ))}
        </AccordionDetails>
      </Accordion>
      ))
      }
      
    </div>
  );
}

export default QuestionCategory;