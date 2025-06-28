// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from 'react';

const ContactAd = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("messages")) || [];
    setMessages(stored);
  }, []);

  const handleDelete = (indexToDelete) => {
    const updatedMessages = messages.filter((_, index) => index !== indexToDelete);
    localStorage.setItem("messages", JSON.stringify(updatedMessages));
    setMessages(updatedMessages);
  };

  return (
    <div className="p-6  m tablewrer conner">
      <h2 className="text-xl font-bold mb-4">Contact</h2>
      {messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <table className="producttable w-full border">
          <thead>
            <tr>
              <th>Date</th>
              <th>Name</th>
              <th>Email</th>
              <th>Message</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((msg, index) => (
              <tr key={index}>
                <td>{msg.date || "N/A"}</td>
                <td>{msg.name}</td>
                <td>{msg.email}</td>
                <td>{msg.message}</td>
                <td>
                  <button
                    onClick={() => handleDelete(index)}
                    className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 transition"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ContactAd;
