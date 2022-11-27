export interface LoginForm {
  username: string;
  password: string;
  expiresInMins: number;
}

export interface LoginResponse {
  id: number;
  firstName: string;
  lastName: string;
  token: number;
}
