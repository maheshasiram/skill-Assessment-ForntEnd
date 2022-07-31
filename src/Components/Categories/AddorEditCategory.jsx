import React from "react";
import FormDialog from "../../ReuseComponents/Dialogs/CustomeDialog";
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import { AlertDialog } from "../../ReuseComponents/Dialogs/actiondialog";
import { onAddCategory, getAllCategories, updateCategory } from "../../actions/actions";

function AddorEditCategory(props){
    const { onCloseDialog, actionType, editCategory } = props;

    const { categoryParams } = useSelector(state => state);
  
    const dispatch = useDispatch();
  
    const CreateUserSchema = Yup.object().shape({
      category: Yup.string()
        .required('Required'),
        author: Yup.string()
        .required('Required'),
      
    });
  
    const onSubmitCategory = (values) => {
      if(actionType == 'Add'){
     dispatch(onAddCategory(values, (data)=>{
      if(data.status === 201){
        onCloseDialog();
        dispatch(AlertDialog({
          status: data.status === 201 && '1',
           message: data.data.message,
            onok: () => {
              dispatch(getAllCategories(categoryParams))
          }
        }))
      }
     }));
    }else{
      dispatch(updateCategory(editCategory.id, values, (data)=>{
        if(data.status === 200){
          onCloseDialog();
          dispatch(AlertDialog({
            status: data.status === 200 && '1',
             message: data.data.message,
              onok: () => {
                dispatch(getAllCategories(categoryParams))
            }
          }))
        }
      }))
    }
    }
  
   
    const formik = useFormik({
      initialValues:actionType == 'Add' ?{
        author: '',
        category: ''
      }: {
        author: editCategory.author,
        category: editCategory.category
      },

      onSubmit: (values) => {
          onSubmitCategory(values);
      },
      validationSchema: CreateUserSchema,
    })
    return (
      <FormDialog
        onCloseDialog={onCloseDialog}
        actionType={actionType}
        id="category-form"
      >
  
        <form id="category-form" onSubmit={formik.handleSubmit} className="my-4 mx-8">

        <Box sx={{ mb: 2 }}>
          {/* <AccountCircle sx={{ color: 'action.active', mr: 1, my: 2.5 }} /> */}
            <TextField
              sx={{ width: '17em' }}
              name='author'
              label="Author"
              variant='outlined'
              value={formik.values.author}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.author && Boolean(formik.errors.author)}
              helperText={formik.touched.author && formik.errors.author}
            />
          </Box>
          
          <Box sx={{ mb: 2 }}>
            <TextField
              sx={{ width: '17em' }}
              name='category'
              label="Category"
              variant='outlined'
              value={formik.values.category}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.category && Boolean(formik.errors.category)}
              helperText={formik.touched.category && formik.errors.category}
            />
          </Box>

        </form>
      </FormDialog>
    )
}

export default AddorEditCategory;