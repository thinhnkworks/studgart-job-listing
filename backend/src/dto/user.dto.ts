export interface IUserDTO {
  username: string;
  email: string;
  phone?: string;
  fullName?: string;
  role: "job_seeker" | "recruiter" | "admin" | "company";
  profilePicture?: string;
  address?: string;
  bio?: string;
  lastLogin?: Date;
  isActive: boolean;
  isVerified: boolean;
}
