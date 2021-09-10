import React, { createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";

import { logInWithEmail } from "../api";

type AuthState = {
  isAuthenticated: boolean;
  user?: {
    email: string;
    name: string;
    avatar?: string;
  };
};

type ContextType = {
  auth: AuthState;
  actions: {
    signIn: any;
    signOut: () => void;
  };
};

const authContext = createContext<ContextType>({} as ContextType);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const toast = useToast();

  const [auth, setAuth] = useState<AuthState>({
    isAuthenticated: !!localStorage.getItem("auth"),
  });

  const actions = {
    signIn: useMutation(logInWithEmail, {
      onSuccess: (data) => {
        localStorage.setItem("auth", data.email);
        setAuth({
          isAuthenticated: true,
          user: data,
        });
      },
      onError: () => {
        toast({
          status: "error",
          title: "Incorrect email or password",
        });
      },
    }),
    signOut: () => {
      localStorage.removeItem("auth");
      setAuth({
        isAuthenticated: false,
      });
    },
  };

  return (
    <authContext.Provider
      value={{
        auth,
        actions,
      }}
    >
      {children}
    </authContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(authContext);
};
