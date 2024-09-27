import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/campus-connect/user/current-user",
          { withCredentials: true }
        );

        if (response.data.success) {
          setIsAuthorized(true);
          setUserData(response.data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <UserContext.Provider
      value={{
        userData,
        setUserData,
        isAuthorized,
        setIsAuthorized,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook to use UserContext
export const userState = () => useContext(UserContext);

export default UserProvider;
