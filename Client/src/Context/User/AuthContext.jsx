import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState({});

  return (
    <AuthContext.Provider
      value={{ user, setUser, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};

// useEffect(() => {
//   // Fetch user data from API
//   const fetchUser = async () => {
//     try {
//       const response = await axios.get('/api/user'); // Replace with your API endpoint
//       setUser(response.data);
//     } catch (error) {
//       console.error('Failed to fetch user:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   fetchUser();
// }, []);

// const login = (userData) => {
//   setUser(userData);
// };

// const logout = () => {
//   setUser(null);
// };
