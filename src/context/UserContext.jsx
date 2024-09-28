import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
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
          return
        }
            const adminResponse = await axios.post(
              "http://localhost:3000/api/v1/campus-connect/admin/profile/",
              { withCredentials: true }
            );
            if (adminResponse.data.success) {
              setIsAdmin(true);
              setUserData(adminResponse.data)
            }
         
          }
    
  

    fetchUserData();
  }, []);

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
