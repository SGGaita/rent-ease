import { db } from "../firebaseConfig";
import { collection, query, onSnapshot } from 'firebase/firestore';

const propertiesQuery = query(collection(db, "Properties"));

let properties = [];

onSnapshot(propertiesQuery, (querySnapshot) => {
  let newProperties = []; // Create a new array
  querySnapshot.forEach((doc) => {
    newProperties.push({
      id: doc.id,
      ...doc.data(),
    });
  });
  properties = newProperties; // Assign the new array to properties
});

export {properties};
