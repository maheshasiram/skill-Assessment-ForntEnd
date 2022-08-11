import React, { useState } from 'react';
import { Button } from "primereact/button";
import { InputText } from 'primereact/inputtext';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import AddQuestionForms from './AddQuestionForms';

function QuestionCategory(props) {
    const [expanded, setExpanded] = useState(false);
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

    const addQuestion =()=>{
        setOpen(true);
        setActionType('Add Question');  
    }

const onSearcQuestions =()=>{

}

const onCloseDialog = ()=>{
    setOpen(false);
}
    return (
        <div>
               <div className='userActions d-flex mb-2 justify-content-end align-items-center'>
                <div className='serachUser'>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className='searchField' placeholder="Search Question" onChange={(e)=>onSearcQuestions(e)} />
                </span>
                </div>
                <div className='addButton mx-2'>
                    <Button icon="pi pi-plus" onClick={addQuestion} label='Add Question' className="p-button-rounded p-button-secondary"/>
                </div>
            </div>
           {open && <AddQuestionForms 
            actionType={actionType}
            onCloseDialog={onCloseDialog}
            />}
            <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography>I am an accordion</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat.
            Aliquam eget maximus est, id dignissim quam.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Users</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            You are currently not an owner
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Donec placerat, lectus sed mattis semper, neque lectus feugiat lectus,
            varius pulvinar diam eros in elit. Pellentesque convallis laoreet
            laoreet.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>
            Advanced settings
          </Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            Filtering has been entirely disabled for whole web server
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel4bh-content"
          id="panel4bh-header"
        >
          <Typography sx={{ width: '33%', flexShrink: 0 }}>Personal data</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
            Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer sit
            amet egestas eros, vitae egestas augue. Duis vel est augue.
          </Typography>
        </AccordionDetails>
      </Accordion>
        </div>
    );
}

export default QuestionCategory;