import React, { useContext } from 'react';
import './lease.scss';
import { TenantContext } from '../../context/AuthContext';
import { PropertyContext } from '../../context/PropertyContext';
import { LeaseForm } from './LeaseForm';
import { lease } from '../../utils';

export const AddLeaseAgreement = () => {
  const { state: { tenant } } = useContext(TenantContext);
  const { state: { property } } = useContext(PropertyContext)

  return (
    <div className="main">
      <div className="container">
        <div className="content">
          <div className="heading">
            <LeaseForm inputs={lease} collectionName="Lease" title={"Lease agreement for: " + tenant.tenantName} leaseInfo={{'tenantId':tenant.tenantId, 'tenantName':tenant.tenantName, 'propertyId':property.propertyId,'propertyName':property.propertyName}}  />
          </div>
        </div>
      </div>
    </div>
  );
};