import React, { useEffect, useState, useRef } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getAllCategories, deleteCategory, updateCategory } from '../../actions/actions';
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
import { userdetails } from "../../constants/messages";
import EditIcon from '@mui/icons-material/Edit';

function Categories() {
    const { categoryParams, allCategories, lazyParams } = useSelector(state => state);
    const dispatch = useDispatch();
    const [actionType, setActionType] = useState('');
    const [open, setOpen] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [editCategory, setEditCategory] = useState(null);

//useEffect will call twice in React-18 version so, we are using (callUseeffect) state to make call only once.
const callUseeffect = useRef(true);

    useEffect(() => {
        if(callUseeffect.current){
            callUseeffect.current = false
        dispatch(getAllCategories(categoryParams))
        }
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

    const onPageChange = (e, val) => {
        setCurrentPage(val)
        let payload = { ...categoryParams, page: val }
        dispatch({ type: Types.CATEGORY_PARAMS, payload: payload })
        dispatch(getAllCategories(payload));
    }

    const onSearchCategory = (e) => {
        let payload = { ...categoryParams, search: e.target.value }
        dispatch({ type: Types.CATEGORY_PARAMS, payload: payload })
        dispatch(getAllCategories(payload));
    }

    const onDeleteCategory = (e, rowData) => {
        dispatch(ConfirmDialog({
            status: '0',
            message: userdetails.deleteConfirMsg,
            onok: () => {
                dispatch(deleteCategory(rowData.id, (data) => {
                    if (data.status === 200) {
                        dispatch(AlertDialog({
                            status: '2',
                            message: data.data.message,
                            onok: () => {
                                dispatch(getAllCategories(categoryParams));
                            }
                        }))
                    }
                }))
            }
        }))
    }

    const onEditCategory = (e, rowData) => {
        setActionType('Update');
        setOpen(true);
        setEditCategory(rowData)
    }

    const ActionTempletes = (rowData) => {
        return (
            <div className='userActions'>
                <CustomTooltip title="Delete Category">
                    <DeleteIcon className='mx-1' color='action' onClick={(e) => onDeleteCategory(e, rowData)} />
                </CustomTooltip>
                <CustomTooltip title="Edit Category" >
                    <EditIcon color='action' onClick={(e) => onEditCategory(e, rowData)} />
                </CustomTooltip>
            </div>
        )
    }

    const onSort = (e) => {
        console.log("e....",e)
        let payload = { ...categoryParams, sortBy: e.sortField, orderBy: categoryParams.orderBy === 'asc' ? 'desc' : 'asc' }
        dispatch({ type: Types.CATEGORY_PARAMS, payload: payload })
        dispatch({ type: Types.ON_SORT_FIELD, payload: e })
        dispatch(getAllCategories(payload));
    }

    return (
        <div className='userDetails'>
            <h2 className='text-left'>Categories</h2>
            <div className='userActions d-flex mb-2 justify-content-end align-items-center'>
                <div className='serachUser'>
                    <span className="p-input-icon-left">
                        <i className="pi pi-search" />
                        <InputText className="searchField" placeholder="Search Category" onChange={(e) => onSearchCategory(e)} />
                    </span>
                </div>
                <div className='addButton mx-2'>
                    <Button icon="pi pi-user-plus" onClick={onCreateCategory} label='Create Category' className="p-button-rounded p-button-secondary" />
                </div>
            </div>
            {open && <AddorEditCategory
                actionType={actionType}
                onCloseDialog={onCloseDialog}
                editCategory={editCategory}
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
                                onSort={onSort}
                                sortField={lazyParams.sortField}
                                sortOrder={lazyParams.sortOrder}
                            >
                                <Column field="category" header="Category" sortable></Column>
                                <Column body={CreatedAt} header="CreatedAt" sortable></Column>
                                <Column body={UpdatedAt} header="UpdatedAt" sortable></Column>
                                <Column header="Actions" body={ActionTempletes}></Column>
                            </DataTable>
                            {allCategories.data.totalRecords > 5 && <Stack spacing={2} className='my-2 d-flex justify-content-end align-items-center'>
                                <Pagination variant='outlined' color='secondary' count={Math.ceil(allCategories.data.totalRecords / 5)} showFirstButton showLastButton page={currentPage} onChange={(e, val) => onPageChange(e, val)} />
                            </Stack>}
                        </React.Fragment>
                    }

                </div>
            </div>

        </div>
    )

}

export default Categories;