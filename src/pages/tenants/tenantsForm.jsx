
import React, { useState, useContext } from 'react';
import './tenantform.scss'
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { TenantContext } from '../../context/AuthContext';
import { PropertyContext } from '../../context/PropertyContext';


export const TenantsForm = ({ formInputs, title, collectionName, idValue }) => {
    const [formState, setFormState] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // add state variable for form submission status
    const [isRedirecting, setIsRedirecting] = useState(false); // add state variable for redirecting status
    const navigate = useNavigate()
    // add this after the import statements
    const { dispatch: tenantDispatch } = useContext(TenantContext);
    const { state:{property} } = useContext(PropertyContext);



    const handleInputChange = (e) => {
        console.log("Input changed:", e.target.name, e.target.value);
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const handleFileChange = () => {

    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        //add the property id to the form before submitting
        let formData = {...formState, 'propertyID': property.propertyId}
        // handle form submission here
        setIsSubmitting(true);

        try {
            const docRef = await addDoc(collection(db, collectionName), formData);
            console.log('Document written with ID: ', docRef.id);
            toast.success('Tenant information submitted added successfully!');
            setFormState({});
            // set isSubmitting to false when submission succeeds
            setIsSubmitting(false);

            // add this inside the try block of the handleSubmit function
            tenantDispatch({ type: 'SET_TENANT', payload: { tenantId: docRef.id, tenantName: formData.firstName + ' ' + formData.lastName } });
            setIsRedirecting(true);
            setTimeout(() => {
                setIsRedirecting(false);
                navigate('/lease-agreements/add-lease-agreement'); // redirect to the Add Lease page
            }, 3000);
        } catch (error) {
            console.error('Error adding document: ', error);
            toast.error('Error adding document: ' + error.message);
            // set isSubmitting to false when submission fails
            setIsSubmitting(false);

        }


    };


    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h3>{title} : {property.propertyName}</h3>
                <div className="form-sections">
                    {formInputs.map((section, i) => (

                        <div className="section" key={section.section}>
                            <h4 className='section-heading'>{section.section}</h4>
                            <div className="form-row">
                                {section.inputs.map((input) => {

                                    return (
                                        <div className="form-row__element" key={input.id}>
                                            <label htmlFor={input.id}>{input.label}</label>
                                            {input.type === "select" ? (
                                                <select id={input.id} name={input.id} value={formState[input.id] || ''}
                                                    onChange={handleInputChange} required={input.required}>
                                                    <option value="">Select an option</option>
                                                    {input.options.map((option) => (
                                                        <option key={option.value} value={option.value}>
                                                            {option.label}
                                                        </option>
                                                    ))}
                                                </select>
                                            ) : input.type === "file" ? (
                                                <input type="file" name={input.id} onChange={handleFileChange} />
                                            ) : (
                                                <input
                                                    type={input.type}
                                                    id={input.id}
                                                    name={input.id}
                                                    value={formState[input.id] || ''}
                                                    placeholder={input.placeholder}
                                                    required={input.required}
                                                    onChange={handleInputChange}
                                                />
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>


                    ))}
                </div>
                <button type="submit" disabled={isSubmitting}>
                    {isSubmitting ? "Submitting..." : "Submit"}
                </button>
            </form>
            {isRedirecting && (
                <div className="overlay">
                    <p>Redirecting to add lease page...</p>
                </div>
            )}
        </div>
    )


};








