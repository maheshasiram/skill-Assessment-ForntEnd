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
        <AccordionDetails className='row'>
        
          <div className='col-sm-6 float-start'>
          <b className='d-flex bg-success text-white'><span className='ms-2'>Options For Answer</span></b>
          {data.options.map((opt,i)=>(
            <Typography key={i} className='d-flex'>
           <label>{i} :</label> <Typography className='ms-2'>{opt}</Typography>
            </Typography>
          ))}
          </div>
          <div className='float-start col-sm-6'>
          <b className='bg-success text-white d-flex col-sm-10'><span className='ms-2'>Details Of Question</span> </b>
          <Typography className='d-flex'>
           <label>Answer :</label> <Typography className='ms-2'>{data.answer}</Typography> 
          </Typography>
          <Typography className='d-flex'>
         <label>Author :</label><Typography className='ms-2'>{data.answer}</Typography>
          </Typography>
          <Typography className='d-flex'>
          <label>questionType :</label><Typography className='ms-2'>{data.author}</Typography>
          </Typography>
          </div>
        </AccordionDetails>
      </Accordion>
      ))
      }
      
    </div>
  );
}

export default QuestionCategory;