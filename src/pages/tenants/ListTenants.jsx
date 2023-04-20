import React from 'react'
import './tenants.scss'
import { DataTable } from '../../components'
import {tenantsColumns} from '../../utils'

export const ListTenants = () => {
    return (
        <div className="main">
        <div className="container">
            <div className="content">
                <DataTable title='Tenants' collectionName="Tenants" columnSource={tenantsColumns}/>
            </div>
        </div>
    </div>
    )
}
