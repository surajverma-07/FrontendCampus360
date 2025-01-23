import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/campus-connect/user/current-user/",
          { withCredentials: true }
        );
        if (response.data.user) {
          setIsAuthorized(true);
          console.log("User Response at user context :: ",response);
          setUserData(response.data);
          setIsAdmin(false);
        } else {
          try {
            const adminResponse = await axios.get(
              "http://localhost:3000/api/v1/campus-connect/admin/profile/",
              { withCredentials: true }
            );
            console.log("Admin Response at user context :: ",adminResponse);
            if (adminResponse.data.admin) {
              setIsAdmin(true);
              setUserData(adminResponse.data);
              setIsAuthorized(true); // Set authorized if admin profile fetched
            } else {
              setIsAuthorized(false);
              setIsAdmin(false);
            }
          } catch (error) {
            console.log("Error while fetching admin profile :: ",error);
            setIsAuthorized(false);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.log("Error while fetching user profile :: ",error);
        setIsAuthorized(false);
        setIsAdmin(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("isAuthorized updated: ", isAuthorized);
    console.log("isAdmin updated: ", isAdmin);
  }, [isAuthorized]);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isAuthorized,
        setIsAuthorized,
        isAdmin,
        setIsAdmin,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const userState = () => useContext(UserContext);

export default UserProvider;
