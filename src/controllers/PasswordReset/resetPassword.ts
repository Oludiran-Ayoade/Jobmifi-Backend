import { Request, Response } from 'express';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';
import { CreateUserDto, SendUserDto } from '../../dtos/Dtos.dto';

export const resetPassword = async (req:Request<{}, {}, CreateUserDto>, res:Response<SendUserDto>) => {
  const { newPassword, email, otp } = req.body;
  
  try {
    const user = await User.findOne({ email: email, otp: otp });
   
    if (!user) {
      res.status(400).json({ status: false, message: 'Invalid OTP' });
      return;
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await User.findOneAndUpdate({ email: email }, { password: hashedPassword, otp: null });
    res.status(200).json({ status: true, message: 'Password reset successful' });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Failed to reset password' });
  }
};

