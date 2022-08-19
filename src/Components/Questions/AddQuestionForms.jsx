import React from 'react';
import FormDialog from '../../ReuseComponents/Dialogs/FormDialog';
import { useFormik, FieldArray, FormikProvider, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { InputText } from 'primereact/inputtext';
import { InputNumber } from 'primereact/inputnumber';
import { Editor } from 'primereact/editor';
import { Checkbox } from 'primereact/checkbox';
import { useState } from 'react';
import { RadioButton } from 'primereact/radiobutton';
import _ from 'lodash';
import { addQuestion, getQuestions } from '../../actions/actions';
// import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import jwtDecode from "jwt-decode";
import { AlertDialog } from '../../ReuseComponents/Dialogs/actiondialog';
import CustomTooltip from '../../ReuseComponents/CustomTooltip/CustomTooltip';

function AddQuestionForms(props) {
    const { onCloseDialog, actionType } = props;
    const questionTypes = ['Radio', 'CheckBox'];
    const [selectedType, setSelectedType] = useState(questionTypes[0]);
    const [optAnswer, setOptAnswer] = useState([]);
    const [addOptionErr, setAddOptionErr] = useState(null);
    const [optionValue, setOptionValue] = useState(null);

    const dispatch = useDispatch();

    const CreateQuestionSchema = Yup.object().shape({
        question: Yup.string()
            .required('Question is required'),
        options: Yup.array().of(
            // Yup.object().shape({
                 Yup.string()
                    .required('please enter option in text field')
            // })
        )
    });

    const onSubmitQuestion = (values) => {
        let questionObj = _.cloneDeep(values);
        questionObj.answer = optAnswer.toString();
        questionObj.author = jwtDecode(sessionStorage.getItem('JWTtoken')).username
        questionObj.deleted = false
        questionObj.deletedBy = jwtDecode(sessionStorage.getItem('JWTtoken')).username
        dispatch(addQuestion(questionObj, (data) => {
            if (data.status === 200) {
                onCloseDialog();
                dispatch(AlertDialog({
                    status: data.status === 200 && '1',
                    message: data.data.message,
                    onok: () => {
                        dispatch(getQuestions());
                    }
                }))
            }
        }))
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
            options: [""],
            answer: null,
            questionType: selectedType,
            marks: 1,
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
            <FormikProvider value={formik}>
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
                            questionTypes.map((qType, i) => {
                                return (
                                    <div key={i} className="field-radiobutton mx-3">
                                        <RadioButton inputId={i} name="questionType" value={qType} onChange={(e) => setSelectedType(e.value)} checked={selectedType === qType} />
                                        <label htmlFor={i}>{qType}</label>
                                    </div>
                                )
                            })
                        }
                    </div>

                    <div>
                        <label>Marks :</label>
                        <InputNumber
                            inputId="integeronly"
                            value={formik.values.marks}
                            name='marks'
                            onValueChange={formik.handleChange}
                        />
                    </div>
                    <div className='d-block mt-2'>
                        <FieldArray
                            name="options"
                            render={(arrayHelpers) => {
                                const options = formik.values.options
                                return (
                                    <div>
                                        <label htmlFor="options">Options :
                                            <CustomTooltip title='Add option'>
                                                <AddCircleIcon sx={{ cursor: 'pointer' }} color='action' onClick={() => {
                                                    if (optionValue !== 0) {
                                                        arrayHelpers.push("")
                                                    } else {
                                                        setAddOptionErr('Please Enter Blank Option')
                                                    }

                                                }} />
                                            </CustomTooltip>
                                        </label>
                                        {addOptionErr && addOptionErr}
                                        {options && options.length > 0 ? options.map((opt, i) => (
                                            <div key={i}>
                                                <div className='d-flex align-items-center mt-2'>
                                                    <label htmlFor="options" >{i + 1}.</label>
                                                    <InputText
                                                        value={formik.values.options[i]}
                                                        name={`options.${i}`}
                                                        className='w-100'
                                                        id={`options.${i}`}
                                                        onChange={formik.handleChange}
                                                        onBlur={formik.handleBlur}
                                                        onKeyUp={()=>setAddOptionErr(null)}
                                                    />
                                                    <div className="field-checkbox ml-2">
                                                        <Checkbox inputId="answer" name="answer" value={formik.values.options[i]} disabled={!formik.values.options[i] ? true : false} checked={optAnswer.indexOf(formik.values.options[i]) !== -1} onChange={onAnswerChange} /> <span>Answer</span>
                                                    </div>
                                                    <div>
                                                        {i > 0 && <CustomTooltip title='Remove option'><i className='pi pi-minus-circle' style={{ cursor: 'pointer' }} onClick={() => { arrayHelpers.remove(i) }}></i></CustomTooltip>}
                                                    </div>
                                                </div>
                                                <div className='text-danger'>
                                                    <ErrorMessage name={`options.${i}.value`} />
                                                </div>
                                                {setOptionValue(opt.length)}
                                            </div>
                                        )) : null}
                                        
                                    </div>
                                )
                            }}
                        />

                    </div>
                </form>
            </FormikProvider>
        </FormDialog>

    );
}

export default AddQuestionForms;