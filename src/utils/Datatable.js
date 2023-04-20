import { format } from 'date-fns';

export const propertyColumns = [
    { field: 'id', headerName: 'ID', width: 70 , 
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
    { field: 'id', headerName: 'ID', width: 70 , 
    valueGetter: (params) => {
      const rowIndex = Number(params.rowIndex);
      if (isNaN(rowIndex)) {
        return null; // or a default value if needed
      }
      return rowIndex + 1;
    },
  },
    { field: 'firstName' ,headerName: 'First name', width: 200 },
    { field: 'lastName', headerName: 'Last name', width: 200 },
    { field: 'idNumber', headerName: 'ID Number', width: 200 },
    { field: 'phone', headerName: 'Phone', width: 200 },
    { field: 'email', headerName: 'Email', width: 200 },
    { 
      field: 'moveInDate', 
      headerName: 'Move in Date', 
      width: 200,
      valueFormatter: (params) => {
        const date = new Date(params.value);
        return format(date, 'MMM dd, yyyy');
      },
    },
   
  ]