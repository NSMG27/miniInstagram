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
  data: {
    userId: string;
    email: string;
    username: string;
    name: string;
  };
}
