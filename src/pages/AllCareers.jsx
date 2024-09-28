import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

function AllCareers() {
  const [careers, setCareers] = useState([]);

  useEffect(() => {
    fetchCareers();
  }, []);

  const fetchCareers = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/v1/campus-connect/career/college/all",
        { withCredentials: true }
      );
      setCareers(response.data.data.opportunities);
      console.log("Response :: ", response.data.data.opportunities);
    } catch (error) {
      toast.error("Failed to fetch careers!");
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
                  {/* <button className="bg-blue-500 hover:bg-blue-300 text-white font-bold py-2 px-4 rounded-full mt-4">
                    <Link to={`/career/${career._id}`}>Details</Link>
                  </button> */}
                </div>
              </div>
            ))
          : "No Opportunities Available"}
      </div>
    </div>
  );
}

export default AllCareers;
