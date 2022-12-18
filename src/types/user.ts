enum Role {
  admin,
  user,
}

export interface User {
  createdAt: string;
  email: string;
  mobile: string;
  name: string;
  registered: boolean;
  role: Role;
  updatedAt: string;
  _id: string;

  [key: string]: any;
}
