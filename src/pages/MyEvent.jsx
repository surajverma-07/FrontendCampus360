import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function MyEvent() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-connect/event/my',{withCredentials:true});
      setEvents(response.data.data.events);
    } catch (error) {
      toast.error('Failed to fetch events!');
    }
  };

  return (
    <div className="container mx-auto px-8 md:px-4 pt-32 md:pt-6 bg-[#030717] text-white">
      <h1 className="text-3xl font-bold text-center mb-8">My Events</h1>
      <div className="flex flex-wrap justify-center xl:gap-x-20 mb-8">
        {events.map((event) => (
          <div key={event._id} className="bg-gray-100 rounded-lg shadow-md overflow-hidden w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 text-black">
            <div className="p-4">
              <div className="bg-white rounded-lg aspect-square flex items-center justify-center mb-4 overflow-hidden">
                {event.poster ? (
                  <img src={event.poster} alt={event.title} className="w-full h-full object-cover" />
                ) : (
                  <h2 className="text-3xl font-bold text-center">Event</h2>
                )}
              </div>
              <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
              <p className="text-sm mb-4">{event.description}</p>
              <p className="text-sm mb-4">Location: {event.location}</p>
              <p className="text-sm mb-4">Organizer: {event.organizer}</p>
              <p className="text-sm mb-4">Date: {new Date(event.date).toLocaleString()}</p>
              {event.applyLink && (
                <a href={event.applyLink} target="_blank" rel="noopener noreferrer">
                  <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2  px-4 rounded-full mt-4">
                    Apply Now
                  </button>
                </a>
              )}
              {/* <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4">
                <Link to={`/event/${event._id}`}>Details</Link>
              </button> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyEvent;