import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';

function MyEvent() {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    fetchEvents();
  }, []);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/v1/campus-connect/event/my', { withCredentials: true });
      setEvents(response.data.data.events);
    } catch (error) {
      toast.error('Failed to fetch events!');
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:3000/api/v1/campus-connect/event/update/${id}`, selectedEvent, { withCredentials: true });
      toast.success('Event updated successfully!');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to update event!');
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/campus-connect/event/delete/${id}`, { withCredentials: true });
      toast.success('Event deleted successfully!');
      fetchEvents();
    } catch (error) {
      toast.error('Failed to delete event!');
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
                  <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4">
                    Apply Now
                  </button>
                </a>
              )}
              <button
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => setSelectedEvent(event)}
              >
                Edit
              </button>
              <button
                className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => handleDelete(event._id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {selectedEvent && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex justify-center items-center">
          <div className="bg-gray-200 p-4 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Update Event</h2>
            <form>
              <label>
                Title:
                <input
                  type="text"
                  value={selectedEvent.title}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, title: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Description:
                <input
                  type="text"
                  value={selectedEvent.description}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, description: e.target.value })}
                  className =" w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Category:
                <input
                  type="text"
                  value={selectedEvent.category}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, category: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Location:
                <input
                  type="text"
                  value={selectedEvent.location}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, location: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Company:
                <input
                  type="text"
                  value={selectedEvent.company}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, company: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Due Date:
                <input
                  type="date"
                  value={selectedEvent.dueDate}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, dueDate: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Apply Link:
                <input
                  type="text"
                  value={selectedEvent.applyLink}
                  onChange={(e) => setSelectedEvent({ ...selectedEvent, applyLink: e.target.value })}
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <button
                className="bg-green-500 hover:bg-green-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => handleUpdate(selectedEvent._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => setSelectedEvent(null)}
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyEvent;