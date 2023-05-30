import { format } from 'date-fns';

export const propertyColumns = [
  {
    field: 'id', headerName: 'ID', width: 70,
    valueGetter: (params) => {
      const rowIndex = Number(params.rowIndex);
      if (isNaN(rowIndex)) {
        return null; // or a default value if needed
      }
      return rowIndex + 1;
    },
  },
  { field: 'name', headerName: 'Property name', width: 200 },
  { field: 'address', headerName: 'Address', width: 250 },
  { field: 'county', headerName: 'County', width: 130 },
  { field: 'city', headerName: 'City/Town', width: 130 },
]


export const propertytenantsColumns = [
  {
    field: 'id', headerName: 'ID', width: 70,
    valueGetter: (params) => {
      const rowIndex = Number(params.rowIndex);
      if (isNaN(rowIndex)) {
        return null; // or a default value if needed
      }
      return rowIndex + 1;
    },
  },
  { field: 'name', headerName: 'Property name', width: 200 },
  { field: 'address', headerName: 'Address', width: 250 },
  { field: 'county', headerName: 'County', width: 130 },
  { field: 'city', headerName: 'City/Town', width: 130 },
]

export const tenantsColumns = [
  {
    field: 'id', headerName: 'ID', width: 70,
  },
  { field: 'firstName', headerName: 'First name', width: 200 },
  { field: 'lastName', headerName: 'Last name', width: 200 },
  { field: 'idNumber', headerName: 'ID Number', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 200 },
  { field: 'email', headerName: 'Email', width: 200 },


]

export const leaseColumns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'tenantName', headerName: 'Name', width: 200 },
  { field: 'idNumber', headerName: 'ID Number', width: 150 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'name', headerName: 'Property Name', width: 200 },
  { field: 'moveInDate', headerName: 'Move-in Date', width: 150 },
  { field: 'rent', headerName: 'Rent Amount', width: 150 },
  { field: 'water', headerName: 'Water bill', width: 150 },
  { field: 'garbage', headerName: 'Garbage bill', width: 150 },
  { field: 'security', headerName: 'Security Bill', width: 130 },
  { field: 'totalBill', headerName: 'Total Bill', width: 130 }

];


export const paymentColumns = [
  { field: 'id', headerName: 'ID', width: 40 },
  { field: 'tenantName', headerName: 'Name', width: 200 },
  { field: 'phone', headerName: 'Phone', width: 150 },
  { field: 'name', headerName: 'Property Name', width: 150 },
  { field: 'mode', headerName: 'Payment Mode', width: 150 },
  { field: 'rent', headerName: 'Rent Amount', width: 150 },
  { field: 'balance', headerName: 'Balance', width: 150 },
  { field: 'due_date', headerName: 'Due Date', width: 150 },
  { field: 'status', headerName: 'Status', width: 150 },
]