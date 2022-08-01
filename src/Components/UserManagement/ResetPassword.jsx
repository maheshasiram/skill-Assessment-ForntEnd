import React from 'react';
import FormDialog from "../../ReuseComponents/Dialogs/CustomeDialog";
import * as Yup from 'yup';
import { TextField } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import { Box } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import { InputAdornment } from '@mui/material';
import { IconButton } from '@mui/material';
import { resetPassword } from '../../actions/actions';
import { ConfirmDialog } from '../../ReuseComponents/Dialogs/actiondialog';
import { getUsers } from '../../actions/actions';

function ResetPassword(props) {

    const { onCloseDialog, actionType, user } = props;

    const { usersParams } = useSelector(state => state);

    const dispatch = useDispatch();

    const ResetPasswordSchema = Yup.object().shape({
        Password: Yup.string()
            .required('Required'),

    });
    const [values, setValues] = React.useState({
        Password: '',
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onSubmitPassword = (values) => {
        dispatch(resetPassword(user, values, (data) => {
            if (data.data.status === 200) {
                onCloseDialog();
                dispatch(ConfirmDialog({
                    status: '2',
                    message: data.data.message,
                    onok: () => {
                        dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
                    }
                }))
            }
        }))
    }

    const formik = useFormik({
        initialValues: {
            Password: ''
        },

        onSubmit: (values) => {
            onSubmitPassword(values);
        },
        validationSchema: ResetPasswordSchema,
    })

    return (
        <FormDialog
            onCloseDialog={onCloseDialog}
            actionType={actionType}
            id="Password-form"
            title="Reset Password"
        >

            <form id="Password-form" onSubmit={formik.handleSubmit} className="my-4 mx-8">

                <Box sx={{ mb: 2 }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }}></LockIcon>
                    <TextField
                        type={values.showPassword ? 'text' : 'Password'}
                        name='Password'
                        label='Enter New Password'
                        variant='outlined'
                        value={formik.values.Password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.Password && Boolean(formik.errors.Password)}
                        helperText={formik.touched.Password && formik.errors.Password}
                        InputProps={{
                            endAdornment:
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle Password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                    >
                                        {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                        }}
                    />
                </Box>

            </form>
        </FormDialog>
    );
}

export default ResetPassword;