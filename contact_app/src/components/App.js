// App.js
import React, {useState,useEffect, use} from 'react';
import './App.css';
import Header from './header';
import AddContact from './addconctact';
import './darkTheme.css';
import api from '../api/contact';
 import ContactList from './conctactList';
 import { v4 as uuidv4 } from 'uuid';
 import { BrowserRouter as Router, Routes, Route,Navigate,useLocation  } from 'react-router-dom';
 import { useNavigate } from 'react-router-dom';
import ContactDetail from './contactDetail';
import EditContact from './editConctact';
import Sidebar from './Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Signup from './Signup';
import Login from './Login';
import Home from './Home';
import { addContactFirestore, getContactsFirestore, updateContactFirestore, deleteContactFirestore } from "./firestore";


function AppContent() {

  const location = useLocation();
  const hideSidebarOnRoutes = [ '/signup','/login', '/home'];
  const [contacts,setcontacts] = useState([]);
   const [searchTerm,setSerchTerm]=useState('');
   const [serchResults,seterchResults]= useState([]);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [currentUser, setCurrentUser] = useState(null);

   const LOCAL_STORAGE_KEY ='contacts';
  const addConctactHandler = async (contact) => {
  if (!currentUser) {
    toast.error("Please login first!");
    return; 
  }
  
  try {
    const newContact = await addContactFirestore(contact, currentUser.id);
    setcontacts(prevContacts => [...prevContacts, newContact]);
    seterchResults(prevContacts => [...prevContacts, newContact]);
    console.log("Contact added successfully:", newContact);
    toast.success("Contact added successfully!");  
    return newContact;
  } catch (error) {
    console.error("Add contact error:", error);
    toast.error("Failed to add contact!");
    throw error;
  }
};
  

  const updateContactHandler = async (contact) => {
  try {
    const updated = await updateContactFirestore(contact);
    setcontacts(contacts.map(c => c.id === updated.id ? updated : c));
    toast.success("Contact updated successfully!");
  } catch (error) {
    console.error("Update contact error:", error);
    toast.error("Failed to update contact!");
  }
};


  const removeContactHandler = async (id) => {
  try {
    await deleteContactFirestore(id);
    setcontacts(contacts.filter(c => c.id !== id));
    toast.success("Contact deleted successfully!");
  } catch (error) {
    console.error("Delete contact error:", error);
    toast.error("Failed to delete contact!");
  }
};

    const searchHandler = (serchTerm)=>{
      setSerchTerm(serchTerm);
       if (serchTerm !== ""){
        const newContactList = contacts.filter((contact)=>{
          return Object.values(contact).join(' ').toLowerCase().includes(serchTerm.toLowerCase())
        })
        seterchResults(newContactList);
       }else{
        seterchResults(contacts);
       }
    }


   const retriveConctacts = async () => {
  if (!currentUser) return [];
  try {
    const userContacts = await getContactsFirestore(currentUser.id);
    setcontacts(userContacts || []);
    seterchResults(userContacts || []);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);
    setcontacts([]);
    seterchResults([]);
  }
};

 
useEffect(() => {
  const token = localStorage.getItem('token');
  const userId = localStorage.getItem('userId');

  if (token && userId) {
    setIsAuthenticated(true);
    setCurrentUser({ id: userId });
  }
}, []);

useEffect(() => {
  if (isAuthenticated && currentUser) {
    retriveConctacts();  
  }
}, [isAuthenticated, currentUser]);

  
 useEffect(()=>{
 
  const getAllContacts = async () => {
    if (isAuthenticated && currentUser) {
      const userContacts = await retriveConctacts();
      setcontacts(userContacts || []);
    } else {
      setcontacts([]);
    }
  };
  
  getAllContacts();
}, [isAuthenticated, currentUser]);


   useEffect(()=>{
    localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
   },[contacts])
  

   const AddContactWithNavigation = (props) => {
    const navigate = useNavigate();
    return <AddContact addConctactHandler={addConctactHandler} navigate={navigate} />;
  };
  const shouldShowSidebar = isAuthenticated && !hideSidebarOnRoutes.includes(location.pathname);
  
  const handleLogin = (userData) => {
    setIsAuthenticated(true);
    setCurrentUser(userData);
    localStorage.setItem('userId', userData.id);
  };

  // Handle user logout
  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null);
    setcontacts([]);
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    toast.info("Logged out successfully");
  };
  
  return (
    <div className="app-container">
       
      <Sidebar />
        
        <div className="main-content">
          <Routes>
          <Route path="/login" element={
    isAuthenticated ? (
      <Navigate to="/home" replace />
    ) : (
      <Login setIsAuthenticated={setIsAuthenticated} onLoginSuccess={handleLogin} />
    )
  }/>
          <Route path="/signup" element={
    isAuthenticated ? (
      <Navigate to="/home" replace />
    ) : (
      <Signup setIsAuthenticated={setIsAuthenticated} />
    )
  } />
          <Route path="/home" element={<Home currentUser={currentUser} contacts={contacts}  />} />
            <Route
              path="/"
              element={
                isAuthenticated ?(
                <ContactList
                  contacts={searchTerm.length < 1
                    ? contacts
                    : contacts.filter((contact) =>
                        contact.name.toLowerCase().includes(searchTerm.toLowerCase())
                      )}
                  getContactId={removeContactHandler}
                  term={searchTerm}
                  searchKeyword={searchHandler}
                />): (
                  <Navigate to="/login" replace />
                )
              }
            />
            <Route
              path="/add"
              element={isAuthenticated ?(<AddContact addContactHandler={addConctactHandler} />):(
                <Navigate to="/login" replace />
              )}
            />
            <Route
              path="/edit"
              element={isAuthenticated ?(<EditContact updateContactHandler={updateContactHandler} />):(
                <Navigate to="/login" replace />
              )}
            />
            <Route path="/contact/:id" element={isAuthenticated ?(<ContactDetail />):(
                <Navigate to="/login" replace />
              )} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </div>
        <ToastContainer position="top-right" autoClose={3000} />

    </div>
  );
}
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};
export default App;
