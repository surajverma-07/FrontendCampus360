import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
export const UserContext = createContext();

const decodeToken = (token) => {
  if (!token) return null;

  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");

  try {
    const decodedData = JSON.parse(atob(base64));
    return decodedData;
  } catch (error) {
    console.error("Error decoding token:", error);
    return null;
  }
};

const UserProvider = ({ children }) => {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/v1/campus-connect/user/current-user",{withCredentials:true});
        console.log("User data:", response.data.success);

      if(response.data.success){
        setIsAuthorized(true)
        setUserData(response.data)
        navigate('/allpost')
      }
      } catch (error) {
        console.log(error)
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
