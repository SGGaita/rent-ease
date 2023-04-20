import React, { useContext } from 'react'
import './tenants.scss'
import { Table } from './table'
import { propertytenantsColumns } from '../../utils'
import { AuthContext } from '../../context/AuthContext'

export const AddTenantsToProperty = () => {
    const {state:{user}} = useContext(AuthContext)
  return (
    
        <div className="main">
        <div className="container">
            <div className="content">
                <Table title='Add new Tenant to Properties' collectionName="Properties" columnSource={propertytenantsColumns} idValue={user.uid}/>
            </div>
        </div>
    </div>
    
  )
}

