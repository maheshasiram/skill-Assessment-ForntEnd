import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from "react";
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { getUsers } from '../../actions/actions';

function UserDetails() {

    const { userDetails } = useSelector(state => state);
 
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getUsers(sessionStorage.getItem('JWTtoken')))
    }, []);

    return (
        <React.Fragment>
<div className="datatable-templating-demo">
            <div className="card">
            {userDetails &&  <DataTable value={userDetails.data} responsiveLayout="scroll">
                    <Column field="username" header="username"></Column>
                    <Column field="role" header="role"></Column>
                    <Column field="email" header="email"></Column>
                </DataTable>}
            </div>
        </div>
        </React.Fragment>
    )
}

export default UserDetails;