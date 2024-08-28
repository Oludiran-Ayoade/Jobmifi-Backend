import {  Document, Schema } from 'mongoose';

// Create User Dto
export interface CreateUserDto {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    role: number;
    userOTP?: number;
    newPassword: string;
    otp: number;

    // create company
    userId: string;
    user: string;
    name: string;
    contactmail: string;
    coverImage: string;
    about: string;
    founded: Date;
    logo: string;
    size: number;
    category: string;
    location: string;
    pictures: any[];
    files: {
      [fieldname: string]: Express.Multer.File[];
    };

}

// Send User Dto
export interface SendUserDto {
    status: boolean;
    message: string;
    token?: string;
    role?: number;
    user?: IUser;
    data?: any;
    cometChatToken?: string;
}

// IUser Dto
export interface IUser extends Document {
    id?: string;
    firstName: string;
    lastName: string;
    email?: string;
    password: string;
    role?: number;
    validatePassword(password: string): Promise<boolean>;
  }

// user.dto.ts
export interface UserDTO extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  role: number;
  otp?: string;
  specialization?: string;
  user?: string;
  otpSentAt: Date;
}

// Company DTO
export interface ICompany extends Document {
  user: Schema.Types.ObjectId;
  name: string;
  coverImage: string;
  contactmail:string;
  about: string;
  founded: Date;
  logo: string;
  size: number;
  jobs: any;
  pictures: string[];
  category: string;
  location: string;
}


