export interface User {
  id: number;
  username: string;
  email: string;
  provider?: string;
  confirmed?: boolean;
  blocked?: boolean;
  createdAt?: string;
  updatedAt?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: any;
  role?: any;
  address?: string;
  profileImage?: string;
  fullName: string;
  verified: boolean;
}