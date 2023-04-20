import React, { useState, useEffect, useContext } from 'react';
import './table.scss'
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../firebaseConfig';
import { collection, query, onSnapshot, where } from 'firebase/firestore';
import { PropertyContext } from '../../context/PropertyContext';
import { useNavigate } from 'react-router-dom';



export const Table = ({ collectionName, columnSource, title,idValue, route }) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const { dispatch } = useContext(PropertyContext);
    const navigate = useNavigate()

    useEffect(() => {
        setLoading(true);
        // Set up a Firestore query based on "collectionName" prop
        // Subscribe to query snapshot and update state with mapped data
        // Return a cleanup function to unsubscribe from the snapshot listener
        const q = query(collection(db, collectionName), where('ownerID', '==', idValue));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const newData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
            setData(newData);
            setLoading(false);
        });

        return () => unsubscribe();
    }, [collectionName]);

    if (loading) {
        return (
          <div style={{ height: 400, width: '100%', position: 'relative' }}>
            <CircularProgress style={{ position: 'absolute', top: '50%', left: '50%', marginTop: -20, marginLeft: -20 }} />
          </div>
        );
      }
    




    // Define a function to handle editing an item in the database
    // Currently empty, needs to be filled in with code to handle editing
    const handleEdit = (id) => {
        // TODO: Implement function to handle editing
    };



    const columnsWithActions = [
        ...columnSource,
        {
          field: 'actions',
          headerName: 'Actions',
          sortable: false,
          filterable: false,
          width: 250,
          align: 'center',
          disableClickEventBubbling: true,
          renderCell: (params) => (
            <>
              <button style={{ margin: '2px', backgroundColor: '#4caf50', color: '#fff', cursor:'pointer' }} onClick={() => {
                // dispatch an action to update the property context state with the selected property id
                dispatch({ type: 'SET_PROPERTY', payload: { propertyId: params.id, propertyName: params.row.name } });
                
                // navigate to the Add New Tenant page
               navigate('../add-tenant')
              }}>
                Add Tenant
              </button>
              <button style={{ margin: '2px', backgroundColor: '#f44336', color: '#fff', cursor:'pointer' }} onClick={() => {}}>View Tenants</button>
            </>
          )
        },
      ];


    const styles = {
        root: {
          '& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell': {
            fontSize: '14px',
          },
        },
      };


    return (
        <div className='table-container' style={{ position:'relative' }}>
            <h3>{title}</h3>

            <div style={{ height: '70vh', width: '100%',  }}>
                <DataGrid
                    rows={data}
                    columns={columnsWithActions}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    classes={styles}
                />
            </div>
        </div>
    )
}
