import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      fetch(`${process.env.REACT_APP_API_BASE_URL}/api/user`, {
        headers: { Authorization: `Bearer ${authToken}` },
      })
        .then((response) => response.json())
        .then((data) => setUser(data))
        .catch((error) => console.error('유저 정보 가져오기 실패:', error));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
