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
