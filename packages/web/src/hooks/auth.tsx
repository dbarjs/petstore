import React, { createContext, useCallback, useState, useContext } from 'react';

import api from '../services/api';

interface AuthState {
  token: string;
  user: User;
}

interface SignInCredentials {
  email: string;
  password: string;
}

interface User {
  name: string;
  email: string;
  password: string;
}

interface AuthContextData {
  user: User;
  token: string;
  signIn(credentials: SignInCredentials): Promise<void>;
  signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC = ({ children }) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem('@PetStore:token');
    const user = localStorage.getItem('@PetStore:user');

    if (token && user) {
      return {
        token,
        user: JSON.parse(user) as User,
      };
    }

    return {} as AuthState;
  });

  const signIn = useCallback(async ({ email, password }) => {
    const response = await api.post('sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    localStorage.setItem('@PetStore:token', token);
    localStorage.setItem('@PetStore:user', JSON.stringify(user));

    setData({ token, user });
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem('@PetStore:token');
    localStorage.removeItem('@PetStore:user');

    setData({} as AuthState);
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user: data.user,
        token: data.token,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used withn an AuthProvider');
  }

  return context;
}

export { AuthProvider, useAuth };
