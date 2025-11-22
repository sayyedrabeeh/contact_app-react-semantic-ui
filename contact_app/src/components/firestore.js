// firestore.js
import { collection, addDoc, getDocs, query, where, doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "./firebase";

// Add a new contact
export const addContactFirestore = async (contact, userId) => {
  const docRef = await addDoc(collection(db, "contacts"), {
    userId,
    ...contact
  });
  return { id: docRef.id, ...contact, userId };
};

// Get all contacts of a user
export const getContactsFirestore = async (userId) => {
  const q = query(collection(db, "contacts"), where("userId", "==", userId));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Update a contact
export const updateContactFirestore = async (contact) => {
  const contactRef = doc(db, "contacts", contact.id);
  await updateDoc(contactRef, contact);
  return contact;
};

// Delete a contact
export const deleteContactFirestore = async (contactId) => {
  const contactRef = doc(db, "contacts", contactId);
  await deleteDoc(contactRef);
};
