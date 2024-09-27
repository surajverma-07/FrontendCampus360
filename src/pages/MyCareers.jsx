import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function MyCareers() {
  const [careers, setCareers] = useState([]);
  const [selectedCareer, setSelectedCareer] = useState(null);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/campus-connect/career/my",
        { withCredentials: true }
      );
      setCareers(response.data.data.opportunities);
      console.log("Response :: ", response.data.data.opportunities);
    } catch (error) {
      toast.error("Failed to fetch careers!");
    }
  };

  const handleUpdate = async (id) => {
    try {
      const response = await axios.patch(
        `http://localhost:3000/api/v1/campus-connect/career/update/${id}`,
        selectedCareer,
        { withCredentials: true }
      );
      toast.success("Career updated successfully!");
      fetchCareers();
    } catch (error) {
      toast.error("Failed to update career!");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/v1/campus-connect/career/delete/${id}`, {
        withCredentials: true,
      });
      toast.success("Career deleted successfully!");
      fetchCareers();
    } catch (error) {
      toast.error("Failed to delete career!");
    }
  };

  return (
    <div className="container mx-auto px-8 md:px-4 pt-32 md:pt-6 bg-[#030717] text-white">
      <h1 className="text-3xl font-bold text-center mb-8">All Careers</h1>
      <div className="flex flex-wrap justify-center xl:gap-x-20 mb-8">
        {careers
          ? careers.map((career) => (
              <div
                key={career._id}
                className="bg-gray-100 rounded-lg shadow-md overflow-hidden w-full md:w-1/2 lg:w-1/3 xl:w-1/4 mb-4 text-black"
              >
                <div className="p-4">
                  <h2 className="text-2xl font-bold mb-4">{career.title}</h2>
                  <p className="text-sm mb-4">{career.description}</p>
                  <p className="text-sm mb-4">Category: {career.category}</p>
                  <p className="text-sm mb-4">Location: {career.location}</p>
                  <p className="text-sm mb-4">Company: {career.company}</p>
                  <p className="text-sm mb-4">
                    Due Date: {new Date(career.dueDate).toLocaleString()}
                  </p>
                  {career.applyLink && (
                    <a
                      href={career.applyLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4">
                        Apply Now
                      </button>
                    </a>
                  )}
                  <button
                    className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                    onClick={() => setSelectedCareer(career)}
                  >
                    Edit
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                    onClick={() => handleDelete(career._id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          : "No Opportunities Available"}
      </div>
      {selectedCareer && (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-900 bg-opacity-90 flex justify-center items-center">
          <div className="bg-gray-200 p-4 rounded-lg w-1/2">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Update Career</h2>
            <form>
              <label>
                Title:
                <input
                  type="text"
                  value={selectedCareer.title}
                  onChange={(e) =>
                    setSelectedCareer({ ...selectedCareer, title: e.target.value })
                  }
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Description:
                <input
                  type="text"
                  value={selectedCareer.description}
 onChange={(e) =>
                    setSelectedCareer({ ...selectedCareer, description: e.target.value })
                  }
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Category:
                <input
                  type="text"
                  value={selectedCareer.category}
                  onChange={(e) =>
                    setSelectedCareer({ ...selectedCareer, category: e.target.value })
                  }
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Location:
                <input
                  type="text"
                  value={selectedCareer.location}
                  onChange={(e) =>
                    setSelectedCareer({ ...selectedCareer, location: e.target.value })
                  }
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Company:
                <input
                  type="text"
                  value={selectedCareer.company}
                  onChange={(e) =>
                    setSelectedCareer({ ...selectedCareer, company: e.target.value })
                  }
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Due Date:
                <input
                  type="date"
                  value={selectedCareer.dueDate}
                  onChange={(e) =>
                    setSelectedCareer({ ...selectedCareer, dueDate: e.target.value })
                  }
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <label>
                Apply Link:
                <input
                  type="text"
                  value={selectedCareer.applyLink}
                  onChange={(e) =>
                    setSelectedCareer({ ...selectedCareer, applyLink: e.target.value })
                  }
                  className="w-full p-2 rounded-md text-gray-900"
                />
              </label>
              <br />
              <button
                className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => handleUpdate(selectedCareer._id)}
              >
                Update
              </button>
              <button
                className="bg-red-500 hover:bg-red-300 text-white font-bold py-2 px-4 rounded-full mt-4"
                onClick={() => setSelectedCareer(null)}
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

export default MyCareers;