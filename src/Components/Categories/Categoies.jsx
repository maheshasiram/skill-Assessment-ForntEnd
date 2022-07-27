import React, { useEffect, useState } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getAllCategories, onAddCategory } from '../../actions/actions';
import { Button } from "primereact/button";
import { Types } from '../../constants/Types';
import { Pagination, Stack } from '@mui/material';
import { InputText } from 'primereact/inputtext';
import { AlertDialog, ConfirmDialog } from '../../ReuseComponents/Dialogs/actiondialog';
import _ from 'lodash';
import CustomTooltip from '../../ReuseComponents/CustomTooltip/CustomTooltip';
import { useDispatch, useSelector } from "react-redux";
import AddorEditCategory from "./AddorEditCategory";
import moment from 'moment';
import DeleteIcon from '@mui/icons-material/Delete';

function Categories() {
    const { categoryParams, allCategories } = useSelector(state => state);
    const dispatch = useDispatch();
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        dispatch(getAllCategories(categoryParams))
    }, [])


    const onCloseDialog = () => {
        setOpen(false);
    }

    const onCreateCategory = () => {
        setActionType('Add');
        setOpen(true);
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
        let payload = { ...categoryParams, page: val }
        dispatch({ type: Types.GET_ALL_CATEGORIES, payload: payload })
        dispatch(getAllCategories(payload));
}

    const onSearchCategory = (e) => {
        let payload = { ...categoryParams, search: e.target.value }
        dispatch({ type: Types.GET_ALL_CATEGORIES, payload: payload })
        dispatch(getAllCategories(payload));
    }

    // const onDeleteCategory = (e, rowData) => {
    //     dispatch(ConfirmDialog({
    //      status: '0',
    //      message: userdetails.deleteConfirMsg,
    //      onok: () => {
    //          dispatch(deleteUser(rowData.username,(data) => {
    //              if(data.status === 200){
    //                  dispatch(AlertDialog({
    //                      status: '2',
    //                      message: data.data.message,
    //                      onok:()=>{
    //                          dispatch(getUsers(sessionStorage.getItem('JWTtoken'), usersParams));
    //                      }
    //                  }))
    //              }
    //            }))
    //    }
    //     })) 
    //  }

    const ActionTempletes = (rowData) => {
        return (
            <div className='userActions'>

               <CustomTooltip title="Delete Category">
                {/* <DeleteIcon  color='action' onClick={(e) => onDeleteCategory(e, rowData)}  /> */}
                </CustomTooltip>  
                
            </div>
        )
    }

    return (
        <div className='userDetails'>
            <div className='userActions d-flex mb-2 justify-content-end align-items-center'>
                <div className='serachUser'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText placeholder="Search Category" onChange={(e) => onSearchCategory(e)} />
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
                            >
                                <Column field="category" header="Category"></Column>
                                <Column body={CreatedAt} header="CreatedAt"></Column>
                                <Column body={UpdatedAt} header="UpdatedAt"></Column>
                                <Column header="Actions" body={ActionTempletes}></Column>
                            </DataTable>
                            {allCategories.data.totalRecords > 5 && <Stack spacing={2} className='my-2 d-flex justify-content-end align-items-center'>
                                <Pagination variant='outlined' color='secondary' count={ Math.ceil(allCategories.data.totalRecords/5) } showFirstButton showLastButton page={currentPage} onChange= {(e,val)=>onPageChange(e,val)} />
                            </Stack>}
                        </React.Fragment>
                    }

                </div>
            </div>

        </div>
    )

}

export default Categories;