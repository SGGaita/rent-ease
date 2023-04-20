import React from 'react'
import './tenants.scss'
import { TenantsForm } from './tenantsForm'
import { tenantInputs } from '../../utils/FormSource'

export const AddTenants = () => {
    return (
        <div className="main">
            <div className="container">
                <div className="content">
                    <TenantsForm formInputs={tenantInputs} collectionName="Tenants" title="Add New Tenant to" />
                </div>
            </div>
        </div>
    )
}
