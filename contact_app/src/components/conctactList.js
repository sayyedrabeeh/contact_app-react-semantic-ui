import React, { useRef,useState } from "react";
import ContactCard from "./conctactCard";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const ContactList = (props) => {
  const inputEl = useRef("");
  const contacts = Array.isArray(props.contacts) ? props.contacts : [];

  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 6;
  const totalPages = Math.ceil(props.contacts.length / contactsPerPage);
  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = props.contacts.slice(indexOfFirstContact, indexOfLastContact);
  const pages = Array.from({ length: totalPages }, (_, index) => index + 1);

  const goToPrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };
  
  const goToNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };
  const renderContactList = currentContacts.map((contact) => {
    return (
      <ContactCard
        contact={contact}
        clickHandler={props.getContactId}
        key={contact.id}
      />
    );
  });
  
  const getSearchTerm = () => {
    props.searchKeyword(inputEl.current.value);
    setCurrentPage(1);
  };
  

 return (
  <div style={{ padding: '1em' }}>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.5.0/semantic.min.css" />
    
    <div style={{
      background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
      borderRadius: '20px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
      border: '1px solid rgba(102,126,234,0.3)',
      padding: '2em',
      marginBottom: '2em'
    }}>
      <h2 style={{
        fontSize: '2.5em',
        color: '#fff',
        marginBottom: '1em',
        textShadow: '0 0 20px rgba(102,126,234,0.5)'
      }}>
        <i className="users icon" style={{ color: '#667eea' }}></i>
        All Contacts
      </h2>
      
      <div style={{ position: 'relative', marginTop: '1.5em' }}>
        <input
          ref={inputEl}
          type="text"
          placeholder="Search contacts by name..."
          value={props.term}
          onChange={getSearchTerm}
          style={{
            width: '100%',
            padding: '1em 1em 1em 3em',
            fontSize: '1.1em',
            borderRadius: '50px',
            border: '2px solid rgba(102,126,234,0.3)',
            background: 'rgba(255,255,255,0.05)',
            color: '#fff'
          }}
        />
        <i className="search icon" style={{ 
          position: 'absolute',
          left: '1.2em',
          top: '50%',
          transform: 'translateY(-50%)',
          color: '#667eea',
          fontSize: '1.2em'
        }}></i>
      </div>
    </div>

    {props.contacts.length > 0 ? (
      <>
        <div className="ui three column doubling stackable grid">
          {renderContactList}
        </div>
        
        <div style={{
          background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
          borderRadius: '15px',
          marginTop: '2em',
          padding: '1.5em',
          border: '1px solid rgba(102,126,234,0.3)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.4)',
          textAlign: 'center'
        }}>
          <div style={{ display: 'inline-flex', gap: '0.5em', flexWrap: 'wrap', justifyContent: 'center' }}>
            <button 
              onClick={goToPrevPage}
              disabled={currentPage === 1}
              style={{
                padding: '0.8em 1.2em',
                background: currentPage === 1 ? 'rgba(255,255,255,0.05)' : 'rgba(102,126,234,0.2)',
                border: '1px solid rgba(102,126,234,0.3)',
                borderRadius: '8px',
                color: currentPage === 1 ? '#666' : '#667eea',
                cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                fontWeight: '600'
              }}
            >
              <i className="chevron left icon"></i>
            </button>
            
            {pages.map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                style={{
                  padding: '0.8em 1.2em',
                  background: page === currentPage ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'rgba(255,255,255,0.05)',
                  border: page === currentPage ? 'none' : '1px solid rgba(102,126,234,0.3)',
                  borderRadius: '8px',
                  color: page === currentPage ? 'white' : '#b0b0c0',
                  cursor: 'pointer',
                  fontWeight: page === currentPage ? '700' : '500',
                  boxShadow: page === currentPage ? '0 4px 15px rgba(102,126,234,0.4)' : 'none',
                  minWidth: '45px'
                }}
              >
                {page}
              </button>
            ))}
            
            <button 
              onClick={goToNextPage}
              disabled={currentPage === totalPages}
              style={{
                padding: '0.8em 1.2em',
                background: currentPage === totalPages ? 'rgba(255,255,255,0.05)' : 'rgba(102,126,234,0.2)',
                border: '1px solid rgba(102,126,234,0.3)',
                borderRadius: '8px',
                color: currentPage === totalPages ? '#666' : '#667eea',
                cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                fontWeight: '600'
              }}
            >
              <i className="chevron right icon"></i>
            </button>
          </div>
        </div>
      </>
    ) : (
      <div style={{
        minHeight: '400px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(145deg, #1e1e2e 0%, #2a2a3e 100%)',
        borderRadius: '20px',
        boxShadow: '0 10px 40px rgba(0,0,0,0.5)',
        border: '1px solid rgba(102,126,234,0.2)',
        padding: '3em'
      }}>
        <i className="address book outline icon" style={{ 
          fontSize: '5em', 
          color: '#667eea', 
          marginBottom: '0.5em',
          opacity: 0.5,
          textShadow: '0 0 30px rgba(102,126,234,0.5)'
        }}></i>
        <h3 style={{ color: '#b0b0c0', fontSize: '1.8em', marginBottom: '0.5em' }}>No Contacts Found</h3>
        <p style={{ color: '#808090', fontSize: '1.1em' }}>Add a new contact to get started or try a different search.</p>
      </div>
    )}
  </div>
);


};

export default ContactList;
