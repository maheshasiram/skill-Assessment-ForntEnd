import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getUsers } from '../../actions/actions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Button } from "primereact/button";
import AddorEditUser from './AddorEditUser';

function UserDetails() {

    const { userDetails, usersParams } = useSelector(state => state);
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
    }, []);

    const Adduser = () => {
        setActionType('Add');
        setOpen(true);
    }

    const onCloseDialog = () => {
        setOpen(false);
    }

    const ActionTempletes = (rowData) => {
        return (
            <div>
                {rowData.active ? <div>
                    <EditIcon />
                    <DeleteIcon />
                    <LockResetIcon />
                </div> :
                    <ReplayIcon />}
            </div>
        )
    }

    const CreatedAt = (rowData) => {
        return (
            <div>
                {new Date(rowData.createdAt).getDate() + '-' + new Date(rowData.createdAt).getMonth() + 1 + '-' + new Date(rowData.createdAt).getFullYear()}
            </div>
        )
    }

    const UpdatedAt = (rowData) => {
        return (
            <div>
                {new Date(rowData.updatedAt).getDate() + '-' + new Date(rowData.updatedAt).getMonth() + 1 + '-' + new Date(rowData.updatedAt).getFullYear()}
            </div>
        )
    }

    return (
        <div className='userDetails'>
            <div className='userActions d-flex mb-2'>
                <div className='serachUser w-75'></div>
                <div className='addButton w-25'>
                    <Button icon="pi pi-user-plus" onClick={Adduser} label='Add User' className="p-button-rounded p-button-secondary w-auto" />
                </div>
            </div>
            <AddorEditUser
                openDialog={open}
                actionType={actionType}
                onCloseDialog={onCloseDialog}
            />
            <div className="datatable-templating-demo">
                <div className="card">
                    {userDetails && userDetails.data && <DataTable
                        value={userDetails.data.data}
                        responsiveLayout="scroll"
                    >
                        <Column field="username" header="username"></Column>
                        <Column field="email" header="email"></Column>
                        <Column body={CreatedAt} header="createdAt"></Column>
                        <Column body={UpdatedAt} header="updatedAt"></Column>
                        <Column header="Actions" body={ActionTempletes}></Column>
                    </DataTable>}
                </div>
            </div>
        </div>
    )
}

export default UserDetails;