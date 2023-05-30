import React from 'react'
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../firebaseConfig';
import { collection, query, onSnapshot, deleteDoc, doc, where } from 'firebase/firestore';
import { AuthContext } from '../../context/AuthContext';


const rows = [{id:1, tenantName: 'Steve Gaita', phone: '0723272915', name:'Sewickley Apartments', mode:'M-Pesa', confirmation_code:'', rent:'Kes 10000',balance:'-', due_date:"May 5th", status:'Pending'}]

export const PaymentTable = ({ collectionName, columnSource, title }) => {
    return (
        <div className='table-container' style={{ position: 'relative' }}>
            <h3>{title}</h3>

            <div style={{ height: '70vh', width: '100%', }}>
                <DataGrid
                    rows={rows}
                    columns={columnSource}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                //classes={styles}
                />
            </div>
        </div>
    )
}

