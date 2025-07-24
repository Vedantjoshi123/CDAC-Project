import React, { useEffect, useState } from 'react';
import { getAllContactUs } from '../../services/contactService'; // adjust path if needed

function AllContactUs() {
  const [contacts, setContacts] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    async function fetchContacts() {
      const result = await getAllContactUs();
      if (result.status === 'success') {
        setContacts(result.data);
      } else {
        setError(result.message);
      }
    }
    fetchContacts();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4 text-green-700">All Contact Us Submissions</h2>

      {error && (
        <div className="text-red-600 bg-red-100 p-3 rounded mb-4">
          Error: {error}
        </div>
      )}

      {contacts.length === 0 ? (
        <p className="text-gray-600">No contact messages found.</p>
      ) : (
        <div className="space-y-4">
          {contacts.map((contact, index) => (
            <div
              key={index}
              className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white"
            >
              <p><strong>Name:</strong> {contact.name}</p>
              <p><strong>Email:</strong> {contact.email}</p>
              <p><strong>Subject:</strong> {contact.subject}</p>
              <p><strong>Message:</strong> {contact.message}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AllContactUs;
