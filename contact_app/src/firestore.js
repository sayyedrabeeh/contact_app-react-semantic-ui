// src/firestore.js
import { db } from "./firebase";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  query,
  where
} from "firebase/firestore";

// Add a contact
export const addContactFirestore = async (contact, userId) => {
  const docRef = await addDoc(collection(db, "contacts"), {
    ...contact,
    userId
  });
  return { id: docRef.id, ...contact, userId };
};

// Get contacts for a user
export const getContactsFirestore = async (userId) => {
  const q = query(collection(db, "contacts"), where("userId", "==", userId));
  const querySnapshot = await getDocs(q);
  const contacts = [];
  querySnapshot.forEach((doc) => {
    contacts.push({ id: doc.id, ...doc.data() });
  });
  return contacts;
};

// Update contact
export const updateContactFirestore = async (contact) => {
  const contactRef = doc(db, "contacts", contact.id);
  await updateDoc(contactRef, { ...contact });
  return contact;
};

// Delete contact
export const deleteContactFirestore = async (id) => {
  await deleteDoc(doc(db, "contacts", id));
};
