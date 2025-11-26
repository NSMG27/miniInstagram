export interface Auth {
  email: string;
  password: string;
}

export interface LoginResponse {
  status: number;
  message: string;
  data: {
    token: string;
    user: {
      email: string;
      role: string;
      fullname: string;
      username: string;
    }
  };
}