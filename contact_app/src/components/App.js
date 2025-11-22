 
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import AddContact from './addconctact';
import ContactList from './conctactList';
import ContactDetail from './contactDetail';
import EditContact from './editConctact';
import Sidebar from './Sidebar';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';

import { auth } from './firebaseConfig';  
import { onAuthStateChanged } from 'firebase/auth';

import {
  addContactFirestore,
  getContactsFirestore,
  updateContactFirestore,
  deleteContactFirestore
} from './firestore';

function AppContent() {
  const location = useLocation();
  const navigate = useNavigate();
 
  const hideSidebarOnRoutes = ['/signup', '/login', '/home'];
 
  const [contacts, setContacts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsAuthenticated(true);
        setCurrentUser(user);  
      } else {
        setIsAuthenticated(false);
        setCurrentUser(null);
        setContacts([]);
        setSearchResults([]);
      }
    });

    return () => unsubscribe();
  }, []);

 
  useEffect(() => {
    if (!currentUser) return;

 
    const load = async () => {
      try {
        const userContacts = await getContactsFirestore(currentUser.uid);
        setContacts(userContacts || []);
        setSearchResults(userContacts || []);
      } catch (err) {
        console.error('Failed to fetch contacts:', err);
        setContacts([]);
        setSearchResults([]);
      }
    };

    load();
  }, [currentUser]);

 
  const addContactHandler = async (contact, imageFile = null) => {
    if (!currentUser) {
      toast.error('Please login first!');
      return;
    }

    try {
     
      const newContact = await addContactFirestore(contact, currentUser.uid);
       
      setContacts(prev => [...prev, newContact]);
      setSearchResults(prev => [...prev, newContact]);
      toast.success('Contact added successfully!');
      return newContact;
    } catch (err) {
      console.error('Add contact error:', err);
      toast.error('Failed to add contact!');
      throw err;
    }
  };

  
  const updateContactHandler = async (contact) => {
    try {
      const updated = await updateContactFirestore(contact);
      setContacts(prev => prev.map(c => (c.id === updated.id ? updated : c)));
      setSearchResults(prev => prev.map(c => (c.id === updated.id ? updated : c)));
      toast.success('Contact updated successfully!');
      return updated;
    } catch (err) {
      console.error('Update contact error:', err);
      toast.error('Failed to update contact!');
      throw err;
    }
  };

 
  const removeContactHandler = async (id) => {
    try {
      await deleteContactFirestore(id);
      setContacts(prev => prev.filter(c => c.id !== id));
      setSearchResults(prev => prev.filter(c => c.id !== id));
      toast.success('Contact deleted successfully!');
    } catch (err) {
      console.error('Delete contact error:', err);
      toast.error('Failed to delete contact!');
    }
  };

 
  const searchHandler = (term) => {
    setSearchTerm(term);
    if (!term) {
      setSearchResults(contacts);
      return;
    }
    const lower = term.toLowerCase();
    const filtered = contacts.filter(contact =>
      Object.values(contact).join(' ').toLowerCase().includes(lower)
    );
    setSearchResults(filtered);
  };

  const AddContactWithNavigation = (props) => {
    return <AddContact {...props} navigate={navigate} />;
  };

  const shouldShowSidebar = isAuthenticated && !hideSidebarOnRoutes.includes(location.pathname);
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    if (userData && userData.id) localStorage.setItem('userId', userData.id);
  };

  const handleLogout = () => {
    auth.signOut().catch(err => console.error('Sign out error', err));
    setIsAuthenticated(false);
    setCurrentUser(null);
    setContacts([]);
    setSearchResults([]);
    localStorage.removeItem('userId');
    localStorage.removeItem('token');
    toast.info('Logged out successfully');
    navigate('/login');
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0f0f1e' }}>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" />

      {shouldShowSidebar && <Sidebar currentUser={currentUser} onLogout={handleLogout} />}

      <div style={{
        flex: 1,
        marginLeft: shouldShowSidebar ? '280px' : '0',
        minHeight: '100vh',
        padding: '2em',
        background: '#0f0f1e'
      }}>
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/home" replace /> :
              <Login setIsAuthenticated={setIsAuthenticated} onLoginSuccess={handleLogin} />
          } />
          <Route path="/signup" element={
            isAuthenticated ? <Navigate to="/home" replace /> :
              <Signup setIsAuthenticated={setIsAuthenticated} />
          } />
          <Route path="/home" element={
            isAuthenticated ? (
              <Home currentUser={currentUser} contacts={contacts} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/" element={
            isAuthenticated ? (
              <ContactList
                contacts={searchTerm.length < 1 ? contacts : searchResults}
                getContactId={removeContactHandler}
                term={searchTerm}
                searchKeyword={searchHandler}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/add" element={
            isAuthenticated ? (
              <AddContactWithNavigation addContactHandler={addContactHandler} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/edit" element={
            isAuthenticated ? (
              <EditContact updateContactHandler={updateContactHandler} />
            ) : (
              <Navigate to="/login" replace />
            )
          } />
          <Route path="/contact/:id" element={
            isAuthenticated ? <ContactDetail /> : <Navigate to="/login" replace />
          } />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>

     
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
