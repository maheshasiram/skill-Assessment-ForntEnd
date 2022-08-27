import React from 'react';
import FormDialog from "../../ReuseComponents/Dialogs/FormDialog";
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
import { changePassword } from '../../actions/actions';
import { ConfirmDialog } from '../../ReuseComponents/Dialogs/actiondialog';
import { getUsers } from '../../actions/actions';

function ChangePassword(props) {

    const { onCloseDialog, actionType, user } = props;

    const { usersParams } = useSelector(state => state);

    const dispatch = useDispatch();

    const ResetPasswordSchema = Yup.object().shape({
        newPassword: Yup.string()
            .required('Required'),
            oldPassword: Yup.string()
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
        dispatch(changePassword(values, (data) => {
            // if (data.data.status === 200) {
            //     onCloseDialog();
            //     dispatch(ConfirmDialog({
            //         status: '2',
            //         message: data.data.message,
            //         onok: () => {
            //             dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
            //         }
            //     }))
            // }
        }))
    }

    const formik = useFormik({
        initialValues: {
            oldPassword: '',
            newPassword: ''
           
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
            id="Change-form"
            title="Reset Password"
        >

            <form id="Change-form" onSubmit={formik.handleSubmit} className="my-4 mx-8">

            <Box sx={{ mb: 2 }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }}></LockIcon>
                    <TextField
                        type={values.showPassword ? 'text' : 'Password'}
                        name='oldPassword'
                        label='Enter Old Password'
                        variant='outlined'
                        value={formik.values.oldPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.oldPassword && Boolean(formik.errors.oldPassword)}
                        helperText={formik.touched.oldPassword && formik.errors.oldPassword}
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

                <Box sx={{ mb: 2 }}>
                    <LockIcon sx={{ color: 'action.active', mr: 1, my: 2.5 }}></LockIcon>
                    <TextField
                        type={values.showPassword ? 'text' : 'Password'}
                        name='newPassword'
                        label='Enter New Password'
                        variant='outlined'
                        value={formik.values.newPassword}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.newPassword && Boolean(formik.errors.newPassword)}
                        helperText={formik.touched.newPassword && formik.errors.newPassword}
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

export default ChangePassword;