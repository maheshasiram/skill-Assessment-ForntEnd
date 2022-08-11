import React from 'react';
import FormDialog from '../../ReuseComponents/Dialogs/FormDialog';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { Editor } from 'primereact/editor';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { Dropdown } from 'primereact/dropdown';
import { RadioButton } from 'primereact/radiobutton';

function AddQuestionForms(props) {
    const { onCloseDialog, actionType } = props;
    const [optAnswer, setOptAnswer] = useState([]);
    const [selectedCity1, setSelectedCity1] = useState(null);

    const onCityChange = (e) => {
        setSelectedCity1(e.value);
    }
    const dispatch = useDispatch();

    const CreateQuestionSchema = Yup.object().shape({
        question: Yup.string()
            .required('Question is required'),
        opt1: Yup.string()
            .required('Please enter option'),
        opt2: Yup.string()
            .required('Please enter option'),
        opt3: Yup.string()
            .required('Please enter option'),
        opt4: Yup.string()
            .required('Please enter option'),

    });

    const onSubmitQuestion = (values) => {
        console.log("....values", values)
    }

    const formik = useFormik({
        initialValues: {
            question: '',
            opt1: '',
            opt2: '',
            opt3: '',
            opt4: '',
            answer: optAnswer.length > 0 ? optAnswer.toString() : optAnswer,
            questionType: null,
        },

        onSubmit: (values) => {
            onSubmitQuestion(values);
        },
        validationSchema: CreateQuestionSchema,
    })

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

    return (

        <FormDialog
            onCloseDialog={onCloseDialog}
            actionType={actionType}
            title={actionType}
            id="Question-form"
        >
            <form id="Question-form" onSubmit={formik.handleSubmit} className="my-2 mx-2">
                <h6>Question</h6>
                <Editor
                    value={formik.values.question}
                    name='question'
                    id='question'
                    onTextChange={(e) => formik.setFieldValue("question", e.textValue.trim())}
                    onChange={formik.handleChange}
                />
                {formik.touched.question && formik.errors.question && <div className='text-danger'>{formik.errors.question}</div>}
              <div className='d-block'>
              <label>Answer Type</label>
             
              </div>
                <div className='d-block mt-2'>
                    <label>Options</label>
                    <div className='d-flex align-items-center mt-1'>
                        <label htmlFor="opt1" >1.</label>
                        <InputText
                            value={formik.values.opt1}
                            name='opt1'
                            className='w-100'
                            id='opt1'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <div className="field-checkbox ml-2">
                            <Checkbox inputId="ans1" name="answer" value={formik.values.opt1} disabled={!formik.values.opt1 ? true : false} checked={optAnswer.indexOf(formik.values.opt1) !== -1} onChange={onAnswerChange} /> <span>Answer</span>
                        </div>
                    </div>
                    {formik.touched.opt1 && formik.errors.opt1 && <div className='text-danger'>{formik.errors.opt1}</div>}
                    <div className='d-flex align-items-center mt-2'>
                        <label htmlFor="opt2">2.</label>
                        <InputText
                            value={formik.values.opt2}
                            name='opt2'
                            id='opt2'
                            className='w-100'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <div className="field-checkbox ml-2">
                            <Checkbox inputId="ans2" name="answer" value={formik.values.opt2} disabled={!formik.values.opt2 ? true : false} checked={optAnswer.indexOf(formik.values.opt2) !== -1} onChange={onAnswerChange} /><span>Answer</span>
                        </div>
                    </div>
                    {formik.touched.opt2 && formik.errors.opt2 && <div className='text-danger'>{formik.errors.opt2}</div>}
                    <div className='d-flex align-items-center mt-2'>
                        <label htmlFor="opt2">3.</label>
                        <InputText
                            value={formik.values.opt3}
                            name='opt3'
                            className='w-100'
                            id='opt3'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <div className="field-checkbox ml-2">
                            <Checkbox inputId="ans3" name="answer" value={formik.values.opt3} disabled={!formik.values.opt3 ? true : false} checked={optAnswer.indexOf(formik.values.opt3) !== -1} onChange={onAnswerChange} /><span>Answer</span>
                        </div>
                    </div>
                    {formik.touched.opt3 && formik.errors.opt3 && <div className='text-danger'>{formik.errors.opt3}</div>}

                    <div className='d-flex align-items-center mt-2'>
                        <label htmlFor="opt2">4.</label>
                        <InputText
                            value={formik.values.opt4}
                            name='opt4'
                            id='opt4'
                            className='w-100'
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                        />
                        <div className="field-checkbox ml-2">
                            <Checkbox inputId="ans4" name="answer" value={formik.values.opt4} disabled={!formik.values.opt4 ? true : false} checked={optAnswer.indexOf(formik.values.opt4) !== -1} onChange={onAnswerChange} /><span>Answer</span>
                        </div>
                    </div>
                    {formik.touched.opt4 && formik.errors.opt4 && <div className='text-danger'>{formik.errors.opt4}</div>}
                </div>
            </form>
        </FormDialog>

    );
}

export default AddQuestionForms;