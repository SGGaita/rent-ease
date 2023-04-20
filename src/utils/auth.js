
import { auth, db } from '../firebaseConfig'; // Replace './firebase' with the path to your Firebase SDK file
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, serverTimestamp, doc } from "firebase/firestore";
import { toast } from 'react-toastify';

export const signUpWithEmailAndPassword = async (email, password, phoneNumber, type ) => {
  try {
    // Create user with email and password
    
    

     await createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {

              console.log('test user',userCredential)
                setDoc(doc(db, "Users/" + userCredential.user.uid), {
                    
                    email: userCredential.user.email,
                    phoneNumber,
                    type,
                    createdAt:new Date()
                });

                toast.success(`User account created successfully.`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
               

            })
            .catch((err) => {

                const errorCode = err.code;
                const errorMessage = err.message;
                toast.warning(`${errorMessage}`, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                
                // ..
            });




  } catch (error) {
    console.error(error);
    throw error;
  }
};


export const loginWithEmailAndPassword = async(email,password)=>{
  try{

  }catch(error){
    console.error(error)
    throw error
  }
}
