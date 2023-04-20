import React, {useEffect, useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'
import './properties.scss'
import { DynamicForm } from '../../components'
import { propertyInputs } from '../../utils/FormSource'

export const AddProperties = () => {
    const { state: { user } } = useContext(AuthContext)

useEffect(()=>{
    console.log("User uid", user.uid)
},[])

    return (
        <div className="main">
            <div className="container">
                <div className="content">
                    <DynamicForm inputs={propertyInputs} title="New Property" collectionName="Properties" idValue={{name:'ownerID', value:user.uid}} />
                </div>
            </div>
        </div>
    )
}
