'use client'
import React from 'react'
import {useState} from 'react'
import { createBooking } from '@/lib/actions/bookig.actions';
import posthog from "posthog-js";

const BookEvent = ({ eventId, slug }: { eventId: string; slug: string }) => {
  const [email, setEmail] = React.useState("");
  const [submited, setSubmitted] = React.useState(false);
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { success} = await createBooking({ eventId, slug, email });
    if(success) {
      setSubmitted(true);
      posthog.capture("event_booked",{eventId, slug, email});
    }
    else{
      console.log("Booking failed");
      posthog.captureException("Booking failed");
    }
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