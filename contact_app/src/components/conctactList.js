import React, { useRef } from "react";
import ContactCard from "./ContactCard";

const ContactList = (props) => {
  const inputEl = useRef("");
  
  const renderContactList = props.contacts.map((contact) => {
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
    </div>
  );
};

export default ContactList;
