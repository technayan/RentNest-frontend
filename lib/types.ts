export type IRegisterProps = {
  name: string;
  email: string;
  phone?: string;
  password: string;
  role: "TENANT" | "LANDLORD";
  profile_photo?: string;
};

export type IRegisterResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    role: string;
    profile_photo: string;
    created_at: string;
    updated_at: string;
  };
};

export type ILoginResponse = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
  };
};

export type IUser = {
  success: boolean;
  statusCode: number;
  message: string;
  data: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    status: string;
    role: string;
    profile_photo?: string;
    created_at: string;
    updated_at: string;
  };
};

export type NavbarProps = {
  user: IUser;
};
