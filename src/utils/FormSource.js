// import the counties.json file
import counties from '../counties.json'

// create an array of county options
const countyOptions = counties.map(county => ({
  value: county.name,
  label: county.name
}));



export const userInputs = [
  {
    id: "name",
    label: "name",
    type: "text",
    placeholder: "Enter property name"
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter address"
  },
  {
    id: "county",
    label: "County",
    type: "select",
    options: [
      { label: "Owner", value: "owner" },
      { label: "Tenant", value: "tenant" },
    ],
  },
  {
    id: "city",
    label: "City",
    type: "text",
    placeholder: "Enter the city"
  },
  {
    id: "cpassword",
    label: "Confirm Password",
    type: "password"
  },
  {
    id: "accountType",
    label: "Account Type",
    type: "select",
    options: [
      { label: "Owner", value: "owner" },
      { label: "Tenant", value: "tenant" },
    ],
  }
];


export const propertyInputs = [
  {
    id: "name",
    label: "Property name",
    type: "text",
    placeholder: "Enter property name"
  },
  {
    id: "address",
    label: "Address",
    type: "text",
    placeholder: "Enter property name"
  },

  {
    id: "county",
    label: "County",
    type: "select",
    options: countyOptions
  },

  {
    id: "city",
    label: "City/Town",
    type: "text",
    placeholder: "Enter city or town"
  },
  {
    id: "neighbourhood",
    label: "Neighbourhood",
    type: "text",
    placeholder: "Enter neighbourhood"
  },
  {
    id: "rent_due",
    label: "Rent due day(*example 5 represents 5th of each month)",
    type: "number",
  },
  {
    id: "rent",
    label: "Rent Amount",
    type: "number",
  },
  {
    id: "water_bill",
    label: "Water bill",
    type: "number",
  },
  {
    id: "garbage_bill",
    label: "Garbage bill",
    type: "number",
  },
  {
    id: "security_bill",
    label: "Security bill",
    type: "number",
  },

  // {
  //   id: "property_image",
  //   label: "Property Image",
  //   type: "file"
  // }

]

export const tenantInputs = [
  {
    section: "Tenant Information",
    inputs: [
      {
        id: "firstName",
        label: "First name",
        type: "text",
        placeholder: "Enter first name"
      },
      {
        id: "lastName",
        label: "Last name",
        type: "text",
        placeholder: "Enter last name"
      },
      {
        id: "idNumber",
        label: "ID Number",
        type: "text",
        placeholder: "Enter ID number"
      },
      {
        id: "phone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter phone number"
      },
      {
        id: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter email..."
      },
      
    ]
  },
  {
    section: "Next of Kin Information",
    inputs: [
      {
        id: "kinFirstName",
        label: "First name",
        type: "text",
        placeholder: "Enter first name"
      },
      {
        id: "kinLastName",
        label: "Last name",
        type: "text",
        placeholder: "Enter last name"
      },
      {
        id: "kinPhone",
        label: "Phone Number",
        type: "tel",
        placeholder: "Enter phone number"
      },
      {
        id: "kinEmail",
        label: "Email",
        type: "email",
        placeholder: "Enter email..."
      },
    ]
  }
];

export const lease =[
  {
    id: "moveInDate",
    label: "Move in date",
    type: "date",
  },
  {
    id: "lease",
    label: "Upload lease agreement",
    type: "file",
  }
]
