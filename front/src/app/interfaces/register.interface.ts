export interface Register {
  name: string;
  email: string;
  username: string;
  password: string;
  agreeToPolicies: boolean;
}

export interface RegisterResponse {
  status: number;
  message: string;
  token: string;
  user: {
    userId: string;
    email: string;
    username: string;
    name: string;
  };
}
