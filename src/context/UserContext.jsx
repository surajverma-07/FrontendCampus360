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

        if (response.data.success) {
          setIsAuthorized(true);
          setUserData(response.data);
        } else {
          try {
            const adminResponse = await axios.post(
              "http://localhost:3000/api/v1/campus-connect/admin/profile/",
              { withCredentials: true }
            );

            if (adminResponse.data.success) {
              setIsAdmin(true);
              setUserData(adminResponse.data);
              setIsAuthorized(true); // Set authorized if admin profile fetched
            } else {
              setIsAuthorized(false);
              setIsAdmin(false);
            }
          } catch (error) {
            console.log(error);
            setIsAuthorized(false);
            setIsAdmin(false);
          }
        }
      } catch (error) {
        console.log(error);
        setIsAuthorized(false);
        setIsAdmin(false);
      }
    };

    fetchUserData();
  }, []);

  useEffect(() => {
    console.log("isAuthorized updated: ", isAuthorized);
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
