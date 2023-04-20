import React from 'react'
import './lease.scss'
import { LeaseTable } from './LeaseTable'
import { leaseColumns } from '../../utils'

export const ViewLeaseAgreements = () => {
    return (
        <div className="main">
            <div className="container">
                <div className="content">
                <div className="heading">
                        <LeaseTable columnSource={leaseColumns} title="All lease agreements" />
                    </div>
                </div>
            </div>
        </div>
    )
}
