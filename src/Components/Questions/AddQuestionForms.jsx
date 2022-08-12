import React from 'react';
import FormDialog from '../../ReuseComponents/Dialogs/FormDialog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import _ from 'lodash';
import { addQuestion } from '../../actions/actions';

function AddQuestionForms(props) {
    const { onCloseDialog, actionType } = props;
    const questionTypes = ['Radio','CheckBox'];
    const [selectedType, setSelectedType] = useState(questionTypes[0]);
    const [optAnswer, setOptAnswer] = useState([]);

    const dispatch = useDispatch();

    const CreateQuestionSchema = Yup.object().shape({
        question: Yup.string()
            .required('Question is required'),
       
    });

    const onSubmitQuestion = (values) => {
        console.log("....values", values)
        let questionObj = _.cloneDeep(values);
        questionObj.answer = optAnswer.toString();
        questionObj.author = "admin"
        questionObj.deleted = false
        questionObj.deletedBy = 'admin'
       dispatch(addQuestion(questionObj))
    }

    
    const onAnswerChange = (e) => {
        let selectedOptions = [...optAnswer];
        if (e.checked) {
            selectedOptions.push(e.value);
            setOptAnswer(selectedOptions);
        } else {
            selectedOptions.splice(selectedOptions.indexOf(e.value), 1);
            setOptAnswer(selectedOptions);
        }
    }

    const formik = useFormik({
        initialValues: {
            question: '',
            options: [],
            answer: null,
            questionType: selectedType,
            marks: '1',
        },

        onSubmit: (values) => {
            onSubmitQuestion(values);
        },
        validationSchema: CreateQuestionSchema,
    })


    return (

        <FormDialog
            onCloseDialog={onCloseDialog}
            actionType={actionType}
            title={actionType}
            id="Question-form"
        >
            <form id="Question-form" onSubmit={formik.handleSubmit} className="my-2 mx-2">
                <h6>Question :</h6>
                <Editor
                    value={formik.values.question}
                    name='question'
                    id='question'
                    onTextChange={(e) => formik.setFieldValue("question", e.textValue.trim())}
                    onChange={formik.handleChange}
                />
                {formik.touched.question && formik.errors.question && <div className='text-danger'>{formik.errors.question}</div>}
                <div className='d-flex mt-3'>
                    <label>Question Type :</label>
                    {
                        questionTypes.map((qType,i) => {
                            return (
                                <div key={i} className="field-radiobutton mx-3">
                                    <RadioButton inputId={i} name="questionType" value={qType} onChange={(e) => setSelectedType(e.value)} checked={selectedType === qType} />
                                    <label htmlFor={i}>{qType}</label>
                                </div>
                            )
                        })
                    }
                </div>
                <Box sx={{ minWidth: 120 }}>
                    <label>Marks :</label>
                    <FormControl sx={{ m: 1, width: '100%' }} size="small">
                        <InputLabel id="marks">Marks</InputLabel>
                        <Select
                            id="marks"
                            value={formik.values.marks}
                            label="marks"
                            name='marks'
                            onChange={formik.handleChange}
                        >
                            <MenuItem value={1}>1</MenuItem>
                            <MenuItem value={2}>2</MenuItem>
                            <MenuItem value={3}>3</MenuItem>
                            <MenuItem value={4}>4</MenuItem>
                            <MenuItem value={5}>5</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <div className='d-block mt-2'>
                    <h6>Options :</h6>
                    {[...Array(4)].map((item,i)=>{
                        return(
                            <div key={i} className='d-flex align-items-center mt-2'>
                            <label htmlFor="options[i]" >{i+1}.</label>
                            <InputText
                                value={formik.values.options[i]}
                                name={`options.${i}`}
                                className='w-100'
                                id={`options.${i}`}
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                            />
                            <div className="field-checkbox ml-2">
                                <Checkbox inputId="answer" name="answer" value={formik.values.options[i]} disabled={!formik.values.options[i] ? true : false} checked={optAnswer.indexOf(formik.values.options[i]) !== -1} onChange={onAnswerChange} /> <span>Answer</span>
                            </div>
                        </div>
                        )
       
                    })
                }
                     {/* {formik.touched.options[i] && formik.errors.options[i] && <div className='text-danger'>{formik.errors.options[i]}</div>} */}

                </div>
            </form>
        </FormDialog>

    );
}

export default AddQuestionForms;