'use client'
import React from 'react'
import {useState} from 'react'


const BookEvent = () => {
  const [email, setEmail] = React.useState("");
  const [submited, setSubmitted] = React.useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTimeout(() => {
      setSubmitted(true);
    }, 1000);
  };
  return (
    <div id="book-event">
      {submited ? (
        <p className='text-sm'>Thank you for signing up for the event!</p>
      ) : (
        <form onSubmit={handleSubmit}>
         
      
          <div>
          <label htmlFor="email" className='text-sm'>Email Address:</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
        </div>
          <button type="submit" className="button-submit">
            Sign Up
          </button>
        </form>
      )}
    </div>
  )
}

export default BookEvent;