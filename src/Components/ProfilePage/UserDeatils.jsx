import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getUserRoles, getUsers } from '../../actions/actions';
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

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
        //console.log("......23-users",userDetails)
    }, []);

    const CreateUser = () => {
        setActionType('Add');
        setOpen(true);
        dispatch(getUserRoles())
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
        
        if(e.page != usersParams.page){
            let payload = { ...usersParams, page: e.page }
            dispatch({ type: Types.ON_PAGE_CHANGE, payload: e })
            dispatch({ type: Types.GET_USERS, payload: payload })
            dispatch(getUsers(sessionStorage.getItem('JWTtoken'), payload));
        }
       
    }

    const UserStatus = (rowData) =>{
return(
    <div>
        {rowData.active ? 'Active' : 'Disabled'}
    </div>
)
    }
    
    return (
        <div className='userDetails'>
            <div className='userActions d-flex mb-2'>
                <div className='serachUser w-75'></div>
                <div className='addButton w-25'>
                    <Button icon="pi pi-user-plus" onClick={CreateUser} label='Create User' className="p-button-rounded p-button-secondary w-auto" />
                </div>
            </div>
            {open && <AddorEditUser
                actionType={actionType}
                onCloseDialog={onCloseDialog}
            />}
            <div className="datatable-templating-demo">
                <div className="card">
                    {userDetails && userDetails.data && <DataTable
                        value={userDetails.data.data}
                        responsiveLayout="scroll"
                        dataKey="roleId"
                        lazy
                        rowHover
                        paginator
                        first={lazyParams.first}
                        rows={5}
                        totalRecords={userDetails.data.totalRecords}
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        onPage={(e) => onPageChange(e)}
                         emptyMessage="No Users found."
                    >
                        <Column field="username" header="username"></Column>
                        <Column field="email" header="email"></Column>
                        <Column body={CreatedAt} header="createdAt"></Column>
                        <Column body={UpdatedAt} header="updatedAt"></Column>
                        <Column body={UserStatus} header="Status"></Column>
                        <Column header="Actions" body={ActionTempletes}></Column>
                    </DataTable>}
                </div>
            </div>
        </div>
    )
}

export default UserDetails;