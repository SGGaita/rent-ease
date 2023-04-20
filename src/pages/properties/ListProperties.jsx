import React from 'react'
import './properties.scss'
import { DataTable } from '../../components'
import {propertyColumns} from '../../utils'


export const ListProperties = () => {
    return (
        <div className="main">
            <div className="container">
                <div className="content">
                    <DataTable title='Properties' collectionName="Properties" columnSource={propertyColumns}/>
                </div>
            </div>
        </div>
    )
}
