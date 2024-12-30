// 사용자 정보 상태 관리코드

import React, { createContext, useState } from 'react';

// UserContext 생성
export const UserContext = createContext();

// UserContext Provider 컴포넌트
export function UserProvider({ children }) {
  const [user, setUser] = useState({
    userId: 'testUser',
    name: '테스트 사용자',
    role: 'admin', // 'general', 'vet', 'seller', or 'admin'
    isAuthenticated: true, // 로그인 상태
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
