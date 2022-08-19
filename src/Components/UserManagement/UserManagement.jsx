import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { deleteUser, getUserRoles, getUsers, restoreUser } from '../../actions/actions';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Button } from "primereact/button";
import AddorEditUser from './AddorEditUser';
import moment from 'moment';
import { Types } from '../../constants/Types';
import { Pagination, Stack } from '@mui/material';
import { InputText } from 'primereact/inputtext';
import { AlertDialog, ConfirmDialog } from '../../ReuseComponents/Dialogs/actiondialog';
import { userdetails } from '../../constants/messages';
import _ from 'lodash';
import CustomTooltip from '../../ReuseComponents/CustomTooltip/CustomTooltip';
import ResetPassword from './ResetPassword';


function UserManagement() {

    const { userDetails, usersParams, UserRoles, lazyParams } = useSelector(state => state);
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [resetPasswordForm, setResetPasswordForm] = useState(false);
    const [user, setUser] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
        dispatch(getUserRoles())
    }, []);

    const CreateUser = () => {
        setActionType('Add');
        setOpen(true);
    }

    const onCloseDialog = () => {
        setOpen(false);
        setResetPasswordForm(false);
    }

    const onDeleteUser = (e, rowData) => {
       dispatch(ConfirmDialog({
        status: '0',
        message: userdetails.deleteConfirMsg,
        onok: () => {
            dispatch(deleteUser(rowData.username,(data) => {
                if(data.status === 200){
                    dispatch(AlertDialog({
                        status: '2',
                        message: data.data.message,
                        onok:()=>{
                            dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
                        }
                    }))
                }
              }))
      }
       })) 
    }


    const onRestoreUser = (e, rowData) => {
        dispatch(ConfirmDialog({
            status: '0',
            message: userdetails.restoreConfirmMsg,
            onok: () => {
                dispatch(restoreUser(rowData.username,(data) => {
                    if(data.status === 200){
                        dispatch(AlertDialog({
                            status: '2',
                            message: data.data.message,
                            onok:()=>{
                                dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
                            }
                        }))
                    }
                  }))
          }
           })) 
    }

    const onResetPassword =(e, rowData)=>{
        setActionType('Submit');
        setResetPasswordForm(true);
        setUser(rowData.username);
    }

    const ActionTempletes = (rowData) => {
        let role = '' ;
        if(UserRoles && UserRoles.data){
        _.map(UserRoles.data, (id,index)=>{
          if(id.id === rowData.roleId){
              role = id.role
          }
        })
        }
        return (
            <React.Fragment>
            {role !== '' && <div className='userActions'>
                {rowData.active ? <div className='d-inline-flex'>
                    <CustomTooltip title="Delete User">
                    <DeleteIcon className='mx-1' color='action' onClick={(e) => onDeleteUser(e, rowData)} />
                    </CustomTooltip>
                    <CustomTooltip title="Reset Password">
                    <LockResetIcon color='action' onClick={(e)=>onResetPassword(e, rowData)} />
                    </CustomTooltip>
                </div> :
                <CustomTooltip title="Restore User">
                    <ReplayIcon className='mx-1' color='action' onClick={(e) => onRestoreUser(e, rowData)} />
                    </CustomTooltip>}
            </div>}
            </React.Fragment>
        )
    }

    const CreatedAt = (rowData) => {
        let d = new Date(0);
        d.setUTCSeconds(rowData.createdAt);
        return (
            <div>
                {moment(d).format('DD-MMM-YYYY hh:mm a')}
            </div>
        )
    }

    const UpdatedAt = (rowData) => {
        let d = new Date(0);
        d.setUTCSeconds(rowData.updatedAt);
        return (
            <div>
                {moment(d).format('DD-MMM-YYYY hh:mm a')}
            </div>
        )
    }

    const onPageChange = (e,val) => {
            setCurrentPage(val)
            let payload = { ...usersParams, page: val }
            dispatch({ type: Types.USER_PARAMS, payload: payload })
            dispatch(getUsers(sessionStorage.getItem('JWTtoken'), payload));
    }

    const UserStatus = (rowData) => {
        return (
            <div>
                {rowData.active ? 'Active' : 'Inactive'}
            </div>
        )
    }

    const deletedRow = (rowData) => {
        return {
            'deletedRow': rowData.active === false
        }
    }

    const onSearchUser=(e)=>{
        let payload = { ...usersParams, search: e.target.value }
        dispatch({ type: Types.USER_PARAMS, payload: payload })
        dispatch(getUsers(sessionStorage.getItem('JWTtoken'), payload));
    }

    const UserRole=(rowData)=>{
        let role = '' ;
      if(UserRoles && UserRoles.data){
      _.map(UserRoles.data, (id,index)=>{
        if(id.id === rowData.roleId){
            role = id.role
        }
      })
      }
      return (
        <div>
            {role !== '' ? role : 'Admin'}
        </div>
      )
    }

    const onSort = (e) =>{
        let payload = { ...usersParams, sortBy: e.sortField, orderBy: usersParams.orderBy === 'asc' ? 'desc' : 'asc' }
         dispatch({ type: Types.USER_PARAMS, payload: payload })
         dispatch({type: Types.ON_SORT_FIELD, payload: e})
         dispatch(getUsers(sessionStorage.getItem('JWTtoken'), payload));
    }
    
    return (
        <div className='userDetails'>
            <h2 className='text-left'>User Management</h2>
            <div className='userActions d-flex mb-2 justify-content-end align-items-center'>
                <div className='serachUser'>
                <span className="p-input-icon-left">
                    <i className="pi pi-search" />
                    <InputText className='searchField' placeholder="Search User" onChange={(e)=>onSearchUser(e)} />
                </span>
                </div>
                <div className='addButton mx-2'>
                    <Button icon="pi pi-user-plus" style={{background: 'linear-gradient(0deg, #3f9bb4 0%, #3a8ea5 100%)'}} onClick={CreateUser} label='Create User' className="p-button-rounded "/>
                </div>
            </div>
            
            {open && <AddorEditUser
                actionType={actionType}
                onCloseDialog={onCloseDialog}
            />}
            
            {resetPasswordForm && <ResetPassword 
            actionType={actionType}
            onCloseDialog={onCloseDialog}
            user={user}
            /> }
            <div className="userDetailsTable">
                <div className="card">
                    {userDetails && userDetails.data && 
                    <React.Fragment>
                    <DataTable
                        value={userDetails.data.data}
                        responsiveLayout="scroll"
                        rowHover
                        lazy
                        stripedRows
                        rows={5}
                        emptyMessage="No Users found."
                        rowClassName={deletedRow}
                        onSort={onSort}
                        sortField={lazyParams.sortField} 
                        sortOrder={lazyParams.sortOrder}
                    >
                        <Column field="username" header="UserName" sortable></Column>
                        <Column field="email" header="Email" sortable></Column>
                        <Column field="role" header="Role" body={UserRole} ></Column>
                        <Column body={CreatedAt} field="createdAt" header="CreatedAt" sortable></Column>
                        <Column body={UpdatedAt} field="updatedAt" header="UpdatedAt" sortable></Column>
                        <Column body={UserStatus} field="Status" header="Status"></Column>
                        <Column header="Actions" body={ActionTempletes}></Column>
                    </DataTable>
                  {userDetails.data.totalRecords > 5 && <Stack spacing={2} className='my-2 d-flex justify-content-end align-items-center'>
                    <Pagination variant='outlined' color='secondary' count={ Math.ceil(userDetails.data.totalRecords/5) } showFirstButton showLastButton page={currentPage} onChange= {(e,val)=>onPageChange(e,val)} />
                    </Stack>}
                 </React.Fragment>   
                }
                </div>
            </div>
        
        </div>
    )
}

export default UserManagement;