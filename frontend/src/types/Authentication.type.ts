export interface Credentials {
  email: string;
  password: string;
}

export interface GoogleCredentials {
  code: string;
}

export interface Token {
  access_token: string;
  refresh_token: string;
}

export interface User {
  pk: number;
  email: string;
  first_name: string;
  last_name: string;
}

export interface LoginResponse extends Token {
  user: User;
}
