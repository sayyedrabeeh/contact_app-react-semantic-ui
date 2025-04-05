// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './darkTheme.css';
import Sidebar from './Sidebar';
import ContactList from './ContactList';
import AddContact from './AddContact';
import EditContact from './EditContact';
import ContactDetail from './contactDetail';
import { v4 as uuid } from 'uuid';

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredContacts, setFilteredContacts] = useState([]);

  const addContactHandler = (contact) => {
    setContacts([...contacts, { id: uuid(), ...contact }]);
  };

  const updateContactHandler = (updatedContact) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === updatedContact.id ? updatedContact : contact
      )
    );
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => contact.id !== id);
    setContacts(newContactList);
  };

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contact) => {
        return Object.values(contact)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setFilteredContacts(newContactList);
    } else {
      setFilteredContacts(contacts);
    }
  };

  useEffect(() => {
    const retrieveContacts = JSON.parse(
      localStorage.getItem(LOCAL_STORAGE_KEY)
    );
    if (retrieveContacts) setContacts(retrieveContacts);
  }, []);

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    setFilteredContacts(contacts);
  }, [contacts]);

  return (
    <div className="app-container">
      <Router>
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route
              path="/"
              element={
                <ContactList
                  contacts={searchTerm.length < 1 ? contacts : filteredContacts}
                  getContactId={removeContactHandler}
                  term={searchTerm}
                  searchKeyword={searchHandler}
                />
              }
            />
            <Route
              path="/add"
              element={<AddContact addContactHandler={addContactHandler} />}
            />
            <Route
              path="/edit"
              element={<EditContact updateContactHandler={updateContactHandler} />}
            />
            <Route path="/contact/:id" element={<ContactDetail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
