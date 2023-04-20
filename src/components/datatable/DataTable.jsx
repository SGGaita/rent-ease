import React, { useState, useEffect } from 'react';
import './table.scss'
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../firebaseConfig';
import { collection, query, onSnapshot, deleteDoc, doc } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import CustomPrompt from '../confirmPrompt/ConfirmPrompt';


export const DataTable = ({ collectionName, columnSource, title, route }) => {
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        setLoading(true);
        // Set up a Firestore query based on "collectionName" prop
        // Subscribe to query snapshot and update state with mapped data
        // Return a cleanup function to unsubscribe from the snapshot listener
        const q = query(collection(db, collectionName));

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
    


    // Define a function to set the "open" state to true, used for opening a modal or dialog box
    const handleOpen = () => {
        setOpen(true);
    };

    // Define a function to set the "open" state to false, used for closing a modal or dialog box
    const handleClose = () => {
        setOpen(false);
    };

    // Define a function to handle deleting an item from the database
    // Takes an "id" parameter and displays a confirmation message to the user
    // If the user confirms, it calls the deleteDoc() function with the appropriate parameters
    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this item?')) {
            deleteDoc(doc(db, collectionName, id));
        }
    };

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
                    <button style={{ margin: '2px', backgroundColor: '#4caf50', color: '#fff' }} onClick={() => handleEdit(params.id)}>View</button>
                    <button style={{ margin: '2px', backgroundColor: '#f44336', color: '#fff' }} onClick={handleOpen}>Delete</button>
                    {/* Render a custom prompt component */}
                    <CustomPrompt open={open}
                        handleClose={handleClose}
                        title="Confirm Delete"
                        message="Are you sure you want to delete this item?"
                        confirmText="Delete"
                        cancelText="Cancel"
                        onConfirm={handleDelete} />
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
