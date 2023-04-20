import React, { useState } from 'react';
import './form.scss'
import { db } from '../../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { toast } from 'react-toastify';



export const DynamicForm = ({ inputs, title, collectionName, idValue }) => {
  const [formState, setFormState] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false); // add state variable for form submission status
  const [isRedirecting, setIsRedirecting] = useState(false); // add state variable for redirecting status


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
    console.log("Check form state", formState)
    e.preventDefault();
    const isAddingTenantsForm = collectionName === 'Tenants'; // add this line to check if adding tenants

    let formData = formState
    console.log("Form data", formData)
    if (idValue) {
      formData = { ...formState, [idValue.name]: idValue.value };
    }




    setIsSubmitting(true); // set isSubmitting to true when form is submitted

    try {
      const docRef = await addDoc(collection(db, collectionName), formData);
      console.log('Document written with ID: ', docRef.id);
      toast.success('Document added successfully!');
      setFormState({});
      setIsSubmitting(false); // set isSubmitting to false when submission succeeds

    } catch (error) {
      console.error('Error adding document: ', error);
      toast.error('Error adding document: ' + error.message);
      setIsSubmitting(false); // set isSubmitting to false when submission fails
    }
  };


  return (
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
      {isRedirecting && <p>Redirecting to add lease page...</p>}
    </form>
  );

};








