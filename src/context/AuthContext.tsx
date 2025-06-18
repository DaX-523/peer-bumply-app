import {createContext, ReactNode, useContext, useState} from 'react';

const AuthContext = createContext({
  user: null,
  setUser: (user: any) => {},
});

export const AuthProvider = ({children}: {children: ReactNode}) => {
  const [user, setUser] = useState(null);
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};
