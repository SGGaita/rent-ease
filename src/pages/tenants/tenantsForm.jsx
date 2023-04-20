
import React, { useState } from 'react';
import './tenantform.scss'
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';


export const TenantsForm = ({ formInputs, title, collectionName, idValue }) => {
    const [formState, setFormState] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false); // add state variable for form submission status
    const [isRedirecting, setIsRedirecting] = useState(false); // add state variable for redirecting status
    const navigate = useNavigate()



    const handleInputChange = (e) => {
        console.log("Input changed:", e.target.name, e.target.value);
        setFormState((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };


    const handleFileChange = () => {

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        // handle form submission here
        setIsSubmitting(true);

        try {

        }catch(error){
         console.error('Error adding document: ', error);
         toast.error('Error adding document: ' + error.message);
         setIsSubmitting(false); // set isSubmitting to false when submission fails

        }

        setIsRedirecting(true);
        setTimeout(() => {
            setIsRedirecting(false);
            navigate('/lease-agreements/add-lease-agreement'); // redirect to the Add Lease page
        }, 3000);
    };

    // const handleSubmit = async (e) => {

    //     e.preventDefault();
    //     //const isAddingTenantsForm = collectionName === 'Tenants'; // add this line to check if adding tenants

    //     let formData = formState
    //     console.log("Form data", formData)
    //     if (idValue) {
    //         formData = { ...formState, [idValue.name]: idValue.value };
    //     }




    //     setIsSubmitting(true); // set isSubmitting to true when form is submitted

    //     try {
    //         const docRef = await addDoc(collection(db, collectionName), formData);
    //         console.log('Document written with ID: ', docRef.id);
    //         toast.success('Document added successfully!');
    //         setFormState({});
    //         setIsSubmitting(false); // set isSubmitting to false when submission succeeds

    //         // set isRedirecting to true to show message to user
    //         if (isAddingTenantsForm) { // add this condition to redirect only when adding tenants
    //             setIsRedirecting(true);
    //             // delay the redirect by 2 seconds using setTimeout
    //             setTimeout(() => {
    //                 setIsRedirecting(false);
    //                 navigate('/lease-agreements/add-lease-agreement'); // redirect to the Add Lease page
    //             }, 2000);

    //         }



    //     } catch (error) {
    //         console.error('Error adding document: ', error);
    //         toast.error('Error adding document: ' + error.message);
    //         setIsSubmitting(false); // set isSubmitting to false when submission fails
    //     }
    // };

    return (
        <div className="form-wrapper">
            <form className="form" onSubmit={handleSubmit}>
                <h3>{title}</h3>
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








