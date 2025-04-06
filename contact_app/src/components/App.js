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

function AppContent() {

  const location = useLocation();
  const hideSidebarOnRoutes = [ '/signup','/login', '/home'];
  const [contacts,setcontacts] = useState([]);
   const [searchTerm,setSerchTerm]=useState('');
   const [serchResults,seterchResults]= useState([]);
   const [isAuthenticated, setIsAuthenticated] = useState(false);
   const [currentUser, setCurrentUser] = useState(null);

   const LOCAL_STORAGE_KEY ='contacts';
   const addConctactHandler= async(contact) =>{
    if (!currentUser) {
      toast.error("Please login first!");
      return;
    }
    const request = {
      id: uuidv4(),
      userId: currentUser.id,
      ...contact
    }
    try {
      const response = await api.post('/contacts', request);
      setcontacts([...contacts, response.data]);
      toast.success("Contact added successfully!");
    } catch (error) {
      toast.error("Failed to add contact!");
      console.error("Add contact error:", error);
    }
   }

   const updateContactHandler = async (contact) => {
     // Add logic for updating a contact here
     const response = await api.put(`/contacts/${contact.id}`, contact);
     const {id,name,email,mobile} =response.data;
     setcontacts(contacts.map((contact)=>{
      return contact.id === id ? {...response.data} : contact
     }))
     toast.success("Contact updated successfully!");

   };


   const removeContactHandler =async (id) =>{
    await api.delete(`/contacts/${id}`);
    const newContactsList = contacts.filter((contact)=>{
      return contact.id !== id
    })
    setcontacts(newContactsList);
    toast.success("Contact deleted successfully!");
   }
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
        const response = await api.get('/contacts');
        const allContacts = response.data;
    
         
        const userContacts = allContacts.filter(
          (contact) => contact.userId === currentUser.id
        );
    
        return userContacts;
      } catch (error) {
        console.error("Failed to fetch contacts:", error);
        return [];
      }
    };
    
   useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      setIsAuthenticated(true);
      setCurrentUser({ id: Number(userId) }); 
    }
  }, []);

 useEffect(()=>{
  //   const retriveConctacts= JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
  //   if (retriveConctacts && retriveConctacts.length ) setcontacts(retriveConctacts)
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
 useEffect(() => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    
    if (token && userId) {
      setIsAuthenticated(true);
      setCurrentUser({ id: userId });
    }
  }, []);

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
      <Signup />
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
