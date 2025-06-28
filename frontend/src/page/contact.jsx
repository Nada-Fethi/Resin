// eslint-disable-next-line no-unused-vars
import React, { useState } from "react";

const Contact = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
const newMessage = {
  id: Date.now(),
  ...form,
  date: new Date().toLocaleString(),
};

    
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];
  localStorage.setItem("messages", JSON.stringify([...storedMessages, newMessage]));


    // Replace this with your logic (e.g. API call, EmailJS, etc.)
    console.log("Form submitted:", form);
    alert("Thank you for contacting us!");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div  className="section__container bg-primary-light">
        <h2 className="section__header capitalize">Contact Us</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={form.name}
          onChange={handleChange}
          className="search-bar searchs mg-b mgn-center"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          className="search-bar searchs mg-b mgn-center"
          required
        />
        <textarea
          name="message"
          placeholder="Your Message"
          rows="5"
          value={form.message}
          onChange={handleChange}
          className="search-bar searchs mg-b mgn-center"
          required
        />
        <button
          type="submit"
          className=" btn w-full  text-white py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Send Message
        </button>
      </form>
    </div>
  );
};

export default Contact;
