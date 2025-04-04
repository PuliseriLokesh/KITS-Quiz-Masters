import React, { useState } from 'react';
import './ContactUs.css';

const ContactUs = () => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [description, setDescription] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent the default form submission
        alert(`Thank you for your message, ${username}! We will get back to you shortly.`);
        // Reset the form fields
        setUsername('');
        setEmail('');
        setDescription('');
    };

    return (
        <div className="contact-us">
            <h1>Contact Us</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    name="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    name="description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    required
                ></textarea>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContactUs;