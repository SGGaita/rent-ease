import React from 'react'
import './paymenttable.scss'
import {PaymentTable} from './PaymentTable'
import { paymentColumns } from '../../utils'

export const ViewPayments = () => {
    return (
        <div className="main">
            <div className="container">
                <div className="content">
                <div className="heading">
                        <PaymentTable columnSource={paymentColumns} title="Rent Payments"/>
                    </div>
                </div>
            </div>
        </div>
    )
}
