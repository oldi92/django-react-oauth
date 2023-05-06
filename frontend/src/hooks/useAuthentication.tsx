import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useLoginMutation, useTokenVerifyMutation } from "../services";
import { Credentials } from "../types";
import { AxiosError } from "axios";

interface AuthenticationReturnType {
  isAuthenticated: boolean;
  isLoginLoading: boolean;
  loginError: AxiosError<any>;
  login: (credentials: Credentials) => void;
  isTokenVerifyLoading: boolean;
  isTokenVerifySuccess: boolean;
}

const AuthenticationContext = createContext<any>(null);

const useAuthenticationProvider = (): AuthenticationReturnType => {
  const {
    mutate: login,
    isLoading: isLoginLoading,
    isSuccess: isLoginSuccess,
    error: loginError,
  } = useLoginMutation();
  const {
    mutate: tokenVerify,
    isLoading: isTokenVerifyLoading,
    isSuccess: isTokenVerifySuccess,
  } = useTokenVerifyMutation();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoginSuccess) {
      setIsAuthenticated(true);
    }
  }, [isLoginSuccess]);

  const handleLogin = (credentials: Credentials) => {
    login(credentials);
  };

  const handleTokenVerify = () => {
    tokenVerify(undefined);
  };

  useEffect(() => {
    handleTokenVerify();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isTokenVerifySuccess) {
      setIsAuthenticated(true);
    }
  }, [isTokenVerifySuccess]);

  return {
    isAuthenticated,
    isLoginLoading,
    loginError,
    login: handleLogin,
    isTokenVerifyLoading,
    isTokenVerifySuccess,
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
