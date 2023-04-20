import React, { useState, useEffect, useContext } from 'react';
import './leasetable.scss'
import { DataGrid } from '@mui/x-data-grid';
import CircularProgress from '@mui/material/CircularProgress';
import { db } from '../../firebaseConfig';
import { collection, query, onSnapshot, deleteDoc, doc, where } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import CustomPrompt from '../../components/confirmPrompt/ConfirmPrompt';
import { AuthContext } from '../../context/AuthContext';


export const LeaseTable = ({ collectionName, columnSource, title, route }) => {
    const [leases, setLeases] = useState([]);
    const [tenants, setTenants] = useState({});
    const [properties, setProperties] = useState({});
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const { state: { user } } = useContext(AuthContext)


    useEffect(() => {
        setLoading(true);
        if (!user) return
        console.log("user", user)

        const q = query(collection(db, 'Properties'), where('ownerID', '==', user.uid));

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const propertyIDs = snapshot.docs.map((doc) => doc.id);

            const leasequery = query(collection(db, 'Lease'), where('propertyId', 'in', propertyIDs))
            onSnapshot(leasequery, (snapshot) => {
                setLeases(snapshot.docs.map((doc) => ({
                    id: doc.id,
                    moveInDate: doc.data().moveInDate,
                    tenantId: doc.data().tenantId,
                    propertyId: doc.data().propertyId,
                })))
            })
        });

        return unsubscribe;

    }, [user]);

    console.log("Leases", leases)

    //Fetch Tenants information
    useEffect(() => {
        const q = query(collection(db, 'Tenants'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedTenants = {};
            snapshot.docs.forEach((doc) => {
                updatedTenants[doc.id] = doc.data();
            });
            setTenants(updatedTenants);
        });

        return unsubscribe;
    }, []);


    //Fetch property information
    useEffect(() => {
        const q = query(collection(db, 'Properties'));
        const unsubscribe = onSnapshot(q, (snapshot) => {
            const updatedProperties = {};
            snapshot.docs.forEach((doc) => {
                updatedProperties[doc.id] = doc.data();
            });
            setProperties(updatedProperties);
            setLoading(false);
        });

        return unsubscribe;
    }, []);


    const rows = leases.map((lease,i) => ({
        id: i+1,
        firstName: tenants[lease.tenantId]?.firstName,
        lastName: tenants[lease.tenantId]?.lastName,
        idNumber: tenants[lease.tenantId]?.idNumber,
        phone: tenants[lease.tenantId]?.phone,
        name: properties[lease.propertyId]?.name,
        address: properties[lease.propertyId]?.address,
        county: properties[lease.propertyId]?.county,
        city: properties[lease.propertyId]?.city,
        moveInDate: lease.moveInDate
      }));

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
        <div className='table-container' style={{ position: 'relative' }}>
            <h3>{title}</h3>

            <div style={{ height: '70vh', width: '100%', }}>
                <DataGrid
                    rows={rows}
                    columns={columnsWithActions}
                    pageSize={9}
                    rowsPerPageOptions={[9]}
                    classes={styles}
                />
            </div>
        </div>
    )
}
