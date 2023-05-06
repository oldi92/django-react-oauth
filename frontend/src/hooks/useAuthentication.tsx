import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoginMutation } from "../services";
import { Credentials } from "../types";
import { AxiosError } from "axios";

interface AuthenticationReturnType {
  isAuthenticated: boolean;
  isLoginLoading: boolean;
  loginError: AxiosError<any>;
  login: (credentials: Credentials) => void;
}

const AuthenticationContext = createContext<any>(null);

const useAuthenticationProvider = (): AuthenticationReturnType => {
  const {
    mutate,
    isLoading: isLoginLoading,
    isSuccess: isLoginSuccess,
    error: loginError,
  } = useLoginMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoginSuccess) {
      setIsAuthenticated(true);
    }
  }, [isLoginSuccess]);

  const handleLogin = (credentials: Credentials) => {
    mutate(credentials);
  };

  return {
    isAuthenticated,
    isLoginLoading,
    loginError,
    login: handleLogin,
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
  const context = useContext(AuthenticationContext);

  if (!context)
    throw new Error(
      "You cant use useAuthentication() outside of <AuthenticatedProvider />"
    );

  return context;
};
