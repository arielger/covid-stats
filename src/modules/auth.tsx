import React, { createContext, useContext, useState } from "react";
import { useToast } from "@chakra-ui/react";
import { useMutation } from "react-query";

import { logInWithEmail } from "../api";

type AuthState = {
  isAuthenticated: boolean;
  user?: {
    email: string;
    username: string;
  };
};

const authContext = createContext<{
  auth: AuthState;
  actions: {
    signIn: any;
  };
}>(null!);

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
