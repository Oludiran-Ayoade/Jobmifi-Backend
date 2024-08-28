import { Request, Response } from 'express';
import User from '../../models/userModel';
import bcrypt from 'bcrypt';
// import { ChangePasswordDto } from '../dtos/Dtos.dto';

export const changePassword = async (req: Request, res: Response) => {
  const { oldPassword, newPassword, confirmPassword, email } = req.body;
  // console.log(req.body);
  
  // Check if new password matches confirm password
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: 'New password and confirm password must match' });
  }

  try {
    // Find the user by email (assuming you have a user authentication middleware that sets req.user)
    const user = await User.findOne({ email: email });
    // const user = await User.findOne({ email: email, otp: otp });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Compare old password with stored hash
    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Incorrect old password' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update user's password in the database
    await User.findOneAndUpdate({ email: email }, { password: hashedPassword });

    res.status(200).json({ message: 'Password changed successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to change password' });
  }
};
