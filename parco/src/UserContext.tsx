import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type of data we want to store in the context
interface UserContextType {
  id: number | null;
  email: string | null;
  ticketInfo: any | null;
  status: String | null;
  setUserData: (data: Partial<UserContextType>) => void; // Allow partial updates
}

// Create the context with default values
const UserContext = createContext<UserContextType | undefined>(undefined);

// Create a provider component
export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [userData, setUserData] = useState<UserContextType>({
    id: null,
    email: null,
    ticketInfo: null,
    status: null,
    setUserData: (data: Partial<UserContextType>) => setUserData(prev => ({
      ...prev,
      ...data
    }))
  });

  return (
    <UserContext.Provider value={userData}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the context
export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
