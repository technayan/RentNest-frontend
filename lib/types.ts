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

export type NavbarProps = {
  user: IUser;
};

export type IProperty = {
  id: string;
  title: string;
  landlord_id: string;
  category_id: string;
  property_image: string;
  description: string;
  price: string;
  location: string;
  availability_status: "AVAILABLE" | "RENTED";
  isDeleted: boolean;
  isFeatured: boolean;
  created_at: string;
  updated_at: string;
  landLord: ILandlord;
  category: ICategory;
  _count: ICount;
};

export type ILandlord = {
  name: string;
  email: string;
  phone: string;
  profile_photo: string;
};

export type ICategory = {
  category_name: string;
};

export type ICount = {
  reviews: number;
};

export type ICategoryInfo = {
  id: string;
  category_name: string;
  created_at: string;
  updated_at: string;
};
