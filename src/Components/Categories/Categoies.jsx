import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getAllCategories, onAddCategory } from '../../actions/actions';
import DeleteIcon from '@mui/icons-material/Delete';
import ReplayIcon from '@mui/icons-material/Replay';
import LockResetIcon from '@mui/icons-material/LockReset';
import { Button } from "primereact/button";
import { Types } from '../../constants/Types';
import { Pagination, Stack } from '@mui/material';
import { InputText } from 'primereact/inputtext';
import { AlertDialog, ConfirmDialog } from '../../ReuseComponents/Dialogs/actiondialog';
import _ from 'lodash';
import CustomTooltip from '../../ReuseComponents/CustomTooltip/CustomTooltip';
import { useDispatch, useSelector } from "react-redux";
import AddorEditCategory from "./AddorEditCategory";

function Categories() {
    const { categoryParams, allCategories } = useSelector(state => state);
    const dispatch = useDispatch();
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState(false);

    useEffect(() => {
        dispatch(getAllCategories(categoryParams))
    }, [])


const onCloseDialog = () =>{
    setOpen(false);
}

    const onCreateCategory = () => {
        setActionType('Add');
        setOpen(true);
        dispatch(onAddCategory())
    }

    return (
        <div className='userDetails'>
            {/* {console.log(".....27-allCategories", allCategories.data.data)} */}
            <div className='userActions d-flex mb-2 justify-content-end align-items-center'>
                <div className='serachUser'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        {/* <InputText placeholder="Search User" onChange={(e)=>onSearchUser(e)} /> */}
                    </span>
                </div>
                <div className='addButton mx-2'>
                    <Button icon="pi pi-user-plus" onClick={onCreateCategory} label='Create Category' className="p-button-rounded p-button-secondary" />
                </div>
            </div>
            {open && <AddorEditCategory
          actionType={actionType}
          onCloseDialog={onCloseDialog}
      />}
            <div className="userDetailsTable">
                <div className="card">
                    {allCategories && allCategories.data &&
                        <React.Fragment>
                            <DataTable
                                value={allCategories.data.data}
                                responsiveLayout="scroll"
                                rowHover
                                stripedRows
                                rows={5}
                                emptyMessage="No Categories found."
                            //rowClassName={deletedRow}
                            >
                                <Column field="username" header="UserName"></Column>
                                <Column field="email" header="Email"></Column>
                                {/* <Column header="Role" body={UserRole}></Column>
                  <Column body={CreatedAt} header="CreatedAt"></Column>
                  <Column body={UpdatedAt} header="UpdatedAt"></Column>
                  <Column body={UserStatus} header="Status"></Column>
                  <Column header="Actions" body={ActionTempletes}></Column> */}
                            </DataTable>
                            {allCategories.data.totalRecords > 5 && <Stack spacing={2} className='my-2 d-flex justify-content-end align-items-center'>
                                {/* <Pagination variant='outlined' color='secondary' count={ Math.ceil(allCategories.data.totalRecords/5) } showFirstButton showLastButton page={currentPage} onChange= {(e,val)=>onPageChange(e,val)} /> */}
                            </Stack>}
                        </React.Fragment>
                    }

                </div>
            </div>

        </div>
    )

}

export default Categories;