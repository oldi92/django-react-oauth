import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useGoogleLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useTokenVerifyMutation,
} from "../services";
import { Credentials, GoogleCredentials } from "../types";
import { AxiosError } from "axios";

interface AuthenticationReturnType {
  isAuthenticated: boolean;
  isLoginLoading: boolean;
  loginError: AxiosError<any>;
  login: (credentials: Credentials) => void;
  isTokenVerifyLoading: boolean;
  isTokenVerifySuccess: boolean;
  googleLogin: (credentials: GoogleCredentials) => void;
  isGoogleLoginLoading: boolean;
  isGoogleLoginSuccess: boolean;
  logout: (variables: unknown) => void;
  isLogoutLoading: boolean;
  isLogoutSuccess: boolean;
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
  const {
    mutate: googleLogin,
    isLoading: isGoogleLoginLoading,
    isSuccess: isGoogleLoginSuccess,
  } = useGoogleLoginMutation();
  const {
    mutate: logout,
    isLoading: isLogoutLoading,
    isSuccess: isLogoutSuccess,
  } = useLogoutMutation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoginSuccess || isTokenVerifySuccess || isGoogleLoginSuccess) {
      setIsAuthenticated(true);
    }

    if (isLogoutSuccess) {
      setIsAuthenticated(false);
    }
  }, [
    isLoginSuccess,
    isTokenVerifySuccess,
    isGoogleLoginSuccess,
    isLogoutSuccess,
  ]);

  useEffect(() => {
    tokenVerify(undefined);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isGoogleLoginSuccess) tokenVerify(undefined);
    // eslint-disable-next-line
  }, [isGoogleLoginSuccess]);

  return {
    isAuthenticated,
    isLoginLoading,
    loginError,
    login,
    isTokenVerifyLoading,
    isTokenVerifySuccess,
    googleLogin,
    isGoogleLoginLoading,
    isGoogleLoginSuccess,
    logout,
    isLogoutLoading,
    isLogoutSuccess,
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

export const useAuthentication = (): AuthenticationReturnType => {
  const context = useContext(AuthenticationContext);

  if (!context)
    throw new Error(
      "You cant use useAuthentication() outside of <AuthenticatedProvider />"
    );

  return context;
};
