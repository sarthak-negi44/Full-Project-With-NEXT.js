import React from 'react'
import Image from 'next/image'
import {notFound} from 'next/navigation'
import BookEvent from '@/app/components/BookEvent';
import EventCard from '@/app/components/EventCard';
import Event, { IEvent } from '@/database/event.model';

import { getSimilarEventBySlug } from '@/lib/actions/event.actions';

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
 

const EventDetailItem = ({icon, alt, label}: {icon: string, alt: string, label: string})=> (
  <div className='flex-row-gap-2 items-center'>
    <Image src={icon} alt={alt} width={17} height={17} />
    <p><span className='font-semibold'>{label}:</span> </p>
  </div>
)
const EventAgenda = ({agendaItems}: {agendaItems: string[] })=> (
  <div className='agenda'>
    <h2>Agenda</h2>
    <ul >
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
)
const EventTags = ({tags}: {tags: string[]})=> (
  <div className='flex flex-row gap-1.5 flex-wrap'>
    {tags.map((tag) => (
      <div key={tag} className='pill'>{tag}</div>
    ))}
  </div>
)

const EventDetailPage = async({ params }: { params: Promise<{ slug: string }>})=> {
  const {slug} = await params;
  const request = await fetch(`${BASE_URL}/api/events/${slug}`);
  const {event  :{description, image, overview, date, time, location, mode, agenda, audience, organizer, tags}} = await request.json();

  if(!description) notFound();
 const booking = 10;
const similarEvents: IEvent[] = await getSimilarEventBySlug(slug);
  return (
  <section id = "event">
  
   <div className='header'>
   <h1>Event Description</h1>
   <p className=''>{description} </p>
   </div>
    <div className='details'>
    <div className='content'>
     
     
      <Image src={image} alt={"Event Banner"} width={800} height={800} className= "banner" />
      <section className='flex-col gap-2'>
      <h2>Overview</h2>
      <p>{overview}</p>
      </section>

      <section className='flex-col gap-2'>
      <h2>Event Details</h2>
      <EventDetailItem icon={"/icons/calendar.svg"} alt="Calendar" label={date} />
      <EventDetailItem icon={"/icons/clock.svg"} alt="Clock" label={time} />
      <EventDetailItem icon={"/icons/pin.svg"} alt="Location" label={location} />
      <EventDetailItem icon={"/icons/mode.svg"} alt="Mode" label={mode} />
      <EventDetailItem icon={"/icons/agenda.svg"} alt="Audience" label={audience} />
      </section>
      <EventAgenda agendaItems={agenda} />
      <section className='flex-col gap-2'>
      <h2>About the organizer</h2>
      <p>{organizer}</p>
      </section>
     <EventTags tags={tags} />
    </div>
     <aside className='booking'>
    <div className="signup-card">
      <h2>Book Your Spot</h2>
      {booking > 0 ? (
        <p className='text-sm'>Join {booking} people who have already registered!</p>
      ) : (
        <p className='text-sm'>No seats available</p>
      )}
      <BookEvent />
      </div>
     </aside>
    </div>
    <div className='flex w-full flex-col gap-4 pt-20'>
        <h2 >Similar Events</h2>
        <div className='events'>
          {similarEvents.length > 0 &&  similarEvents.map((similarEvents: IEvent) => (
            <EventCard key={similarEvents.title} {...similarEvents} />
          ))}
    </div>
    </div>
   </section>

  )
}

export default EventDetailPage