import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { deleteUser, getUserRoles, getUsers, restoreUser } from '../../actions/actions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Button } from "primereact/button";
import AddorEditUser from './AddorEditUser';
import moment from 'moment';
import { Types } from '../../constants/Types';


function UserDetails() {

    const { userDetails, usersParams, lazyParams } = useSelector(state => state);
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState(false);
    const [rowData, setRowData] = useState(null);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
    }, []);

    const CreateUser = () => {
        setActionType('Add');
        setOpen(true);
        dispatch(getUserRoles())
    }

    const onCloseDialog = () => {
        setOpen(false);
    }

    const onDeleteUser = (e, rowData) => {
        dispatch(deleteUser(rowData.username), (data) => {
        })
    }


    const onRestoreUser = (e, rowData) => {
        dispatch(restoreUser(rowData.username), (data) => {
        })
    }

    const onEditUser = (e, rowData)=>{
        dispatch(getUserRoles())
        setActionType('Edit');
        setOpen(true);
        setRowData(rowData);
    }

    const ActionTempletes = (rowData) => {
        return (
            <div className='userActions'>
                {rowData.active ? <div>
                    <EditIcon onClick={(e) => onEditUser(e, rowData)} />
                    <DeleteIcon onClick={(e) => onDeleteUser(e, rowData)} />
                    <LockResetIcon />
                </div> :
                    <ReplayIcon onClick={(e) => onRestoreUser(e, rowData)} />}
            </div>
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

    const onPageChange = (e) => {
        console.log(".....83", e.page)
        if (e.page !== usersParams.page) {
            let payload = { ...usersParams, page: e.page }
            dispatch({ type: Types.ON_PAGE_CHANGE, payload: e })
            dispatch({ type: Types.GET_USERS, payload: payload })
            dispatch(getUsers(sessionStorage.getItem('JWTtoken'), payload));
        }
    }

    const UserStatus = (rowData) => {
        return (
            <div>
                {rowData.active ? 'Active' : 'Disabled'}
            </div>
        )
    }

    const deletedRow = (rowData) => {
        return {
            'deletedRow': rowData.active === false
        }
    }

    return (
        <div className='userDetails'>
            <div className='userActions d-flex mb-2'>
                <div className='serachUser'></div>
                <div className='addButton'>
                    <Button icon="pi pi-user-plus" onClick={CreateUser} label='Create User' className="p-button-rounded p-button-secondary w-auto" />
                </div>
            </div>
            {open && <AddorEditUser
                actionType={actionType}
                onCloseDialog={onCloseDialog}
                userDataOnEdit={rowData}
            />}
            <div className="datatable-templating-demo">
                <div className="card">
                    {userDetails && userDetails.data && <DataTable
                        value={userDetails.data.data}
                        responsiveLayout="scroll"
                        dataKey="roleId"
                        lazy
                        stripedRows
                        rowHover
                        paginator
                        first={lazyParams.first}
                        rows={5}
                        totalRecords={userDetails.data.totalRecords}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords}"
                        onPage={(e) => onPageChange(e)}
                        emptyMessage="No Users found."
                        rowClassName={deletedRow}
                    >
                        <Column field="username" header="UserName"></Column>
                        <Column field="email" header="Email"></Column>
                        <Column body={CreatedAt} header="CreatedAt"></Column>
                        <Column body={UpdatedAt} header="UpdatedAt"></Column>
                        <Column body={UserStatus} header="Status"></Column>
                        <Column header="Actions" body={ActionTempletes}></Column>
                    </DataTable>}
                </div>
            </div>
        </div>
    )
}

export default UserDetails;