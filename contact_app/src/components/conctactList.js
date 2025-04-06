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
    <div className="fade-in">
      <div className="header">
        <h2>All Contacts</h2>
      </div>
      
      <div className="search-container">
        <i className="search icon search-icon"></i>
        <input
          ref={inputEl}
          type="text"
          placeholder="Search contacts..."
          className="search-input"
          value={props.term}
          onChange={getSearchTerm}
        />
      </div>
      <ToastContainer position="top-right" autoClose={3000} />

      {props.contacts.length > 0 ? (
        <div className="cards-grid">
          {renderContactList}
        </div>
      ) : (
        <div className="empty-state">
          <i className="address book outline icon"></i>
          <h3>No Contacts Found</h3>
          <p>Add a new contact to get started or try a different search.</p>
        </div>
      )}
      <div className="ui pagination menu center aligned pagination-container">
  <a className={`icon item ${currentPage === 1 ? 'disabled' : ''}`} onClick={goToPrevPage}>
    <i className="chevron left icon"></i>
  </a>
  {pages.map((page) => (
    <a
      key={page}
      className={`item ${page === currentPage ? 'active' : ''}`}
      onClick={() => setCurrentPage(page)}
    >
      {page}
    </a>
  ))}
  <a className={`icon item ${currentPage === totalPages ? 'disabled' : ''}`} onClick={goToNextPage}>
    <i className="chevron right icon"></i>
  </a>
</div>

    </div>
  );
};

export default ContactList;
