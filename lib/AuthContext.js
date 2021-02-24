import React from 'react';
import { useRouter } from 'next/router';

export const AuthContext = React.createContext(null);

export const AuthProvider = ({ value, children }) => {
  const [user, setUser] = React.useState(value);
  return <AuthContext.Provider value={{ user, setUser }}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => React.useContext(AuthContext);

export const useAuthUser = () => useAuthContext().user;

export const useAuthOnly = () => {
  const user = useAuthUser();
  const router = useRouter();

  React.useEffect(() => {
    if (!user) router.replace('/login').catch(console.error);
  }, [user, router]);

  return user;
};
