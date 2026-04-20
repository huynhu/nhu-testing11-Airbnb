export type SignUpRequest = {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: string;
  gender: boolean;
  role: string;
};

export type SignInRequest = {
  email: string;
  password: string;
};
export type SignInResponse = {
  statusCode: number;
  content: {
    user: {
      id: number;
      name: string;
      email: string;
      password: string;
      phone: string;
      birthday: string;
      avatar: string;
      gender: boolean;
      role: string;
    };
    token: string;
  };
  dateTime: string;
};
