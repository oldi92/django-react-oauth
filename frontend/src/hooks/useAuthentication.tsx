import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useGoogleConnectMutation,
  useGoogleLoginMutation,
  useLoginMutation,
  useLogoutMutation,
  useTokenVerifyMutation,
} from "../services";
import { Credentials, GoogleCredentials, User } from "../types";
import { AxiosError } from "axios";

interface AuthenticationReturnType {
  isAuthenticated: boolean;
  isLoginLoading: boolean;
  loginError: AxiosError<any>;
  login: (credentials: Credentials) => void;
  user: User;
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
    data: loginData,
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
    data: googleLoginData,
    isLoading: isGoogleLoginLoading,
    isSuccess: isGoogleLoginSuccess,
    isError: isGoogleLoginError,
  } = useGoogleLoginMutation();
  const {
    mutate: googleConnect,
    isLoading: isGoogleConnectLoading,
    isSuccess: isGoogleConnectSuccess,
  } = useGoogleConnectMutation();
  const {
    mutate: logout,
    isLoading: isLogoutLoading,
    isSuccess: isLogoutSuccess,
  } = useLogoutMutation();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>({
    pk: 0,
    email: "",
    first_name: "",
    last_name: "",
  });

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
    const user = loginData?.data.user;
    const userStored = localStorage.getItem("user");

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    } else if (userStored) {
      const userSerialized = JSON.parse(userStored);
      setUser(userSerialized);
    }
  }, [loginData?.data.user]);

  useEffect(() => {
    tokenVerify(undefined);
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (isGoogleLoginSuccess) tokenVerify(undefined);
    // eslint-disable-next-line
  }, [isGoogleLoginSuccess]);

  useEffect(() => {
    const user = googleLoginData?.data.user;

    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
      setUser(user);
    }
  }, [googleLoginData?.data.user]);

  // const handleGoogleLogin = async (credentials: GoogleCredentials) => {
  //   try {
  //     await googleLogin(credentials);
  //   } catch (error) {
  //     console.log("GOOGLE LOGIN ERROR ", error);

  //     // await googleConnect(credentials);
  //   }
  // };

  return {
    isAuthenticated,
    isLoginLoading,
    loginError,
    login,
    user,
    isTokenVerifyLoading,
    isTokenVerifySuccess,
    // googleLogin: handleGoogleLogin,
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
