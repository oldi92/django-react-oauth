import { FormEvent, ReactNode, createContext, useState } from "react";

interface AuthenticationReturnType {
  isAuthenticated: boolean;
}

const AuthenticationContext = createContext({
  isAuthenticated: false,
});

const useAuthenticationProvider = (): AuthenticationReturnType => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return {
    isAuthenticated,
  };
};

interface Props {
  children: ReactNode | ReactNode[];
}

export const AuthenticationProvider = ({ children }: Props) => {
  const value = useAuthenticationProvider();

  return (
    <AuthenticationContext.Provider value={value}>
      {children}
    </AuthenticationContext.Provider>
  );
};

export const useAuthentication = () => {
  const context = useAuthenticationProvider();

  if (!context)
    throw new Error(
      "You cant use useAuthentication() outside of <AuthenticatedProvider />"
    );

  return context;
};
