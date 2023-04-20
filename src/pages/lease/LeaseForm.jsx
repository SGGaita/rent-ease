import React, { useState, useContext } from 'react'
import './form.scss'
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

export const LeaseForm = ({ inputs, title, collectionName,leaseInfo }) => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    //add the propertyid and tenantId
    let formData = { ...formState, 'propertyId': leaseInfo.propertyId, 'tenantId': leaseInfo.tenantId }
    console.log(formData)

    setIsSubmitting(true); // set isSubmitting to true when form is submitted
    try {
      const docRef = await addDoc(collection(db, collectionName), formData);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Lease agreement has been added successfully!');
      setFormState({});
      setIsSubmitting(false);
      setIsRedirecting(true);
            setTimeout(() => {
                setIsRedirecting(false);
                navigate('../../tenants/to-property'); // redirect to the Add Lease page
            }, 5000);
    } catch (error) {
      toast.error('Error adding document: ' + error.message);
      setIsSubmitting(false); // set isSubmitting to false when submission fails
    }
  }




  const handleFileChange = () => {

  }


  return (
    <div className="form-wrapper">
      <form className="form" onSubmit={handleSubmit}>
        <h3>{title}</h3>
        <div className="form-row">
          {inputs.map((input, index) => {
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
            );
          })}
        </div>
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </button>
      </form>

      {isRedirecting && (
                <div className="overlay">
                  <p>Lease information for <span>{leaseInfo.tenantName}</span>, property name <span>{leaseInfo.propertyName}</span> has been submitted successfully</p>
                    <p>You are being redirecting to <span className='redirect'>"add new tenant"</span>  page...</p>
                </div>
            )}
    </div>
  )
}

