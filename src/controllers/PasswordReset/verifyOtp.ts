import { Request, Response } from "express";
import { CreateUserDto, SendUserDto } from "../../dtos/Dtos.dto";
import User from "../../models/userModel";

// Route to verify OTP entered by the user
export const verifyOtp = async (req:Request<{}, {}, CreateUserDto>, res:Response<SendUserDto>) => {
  const { email, userOTP } = req.body;
  

  try {
    // Fetch the user from the database
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ status: false, message: 'User not found' });
    }
    
    // Check if the user's OTP matches the provided OTP
    if (user.otp !== userOTP) {
      return res.status(400).json({ status: false, message: 'Invalid OTP' });
     
    }
    // Check if the OTP has expired (60 seconds)
    const currentTime: any = new Date();
    const otpSentTime: any = user.otpSentAt; // Assuming you have a field 'otpSentAt' in your user schema
    const timeDifference = currentTime - otpSentTime
    const otpExpirationTime = 60000; // 60 seconds in milliseconds    

    if (timeDifference > otpExpirationTime) {
      return res.status(400).json({ status: false, message: 'OTP has expired, Generate another OTP' });
    }

    res.status(200).json({ status: true, message: 'OTP verified successfully' });
  } catch (error) {
    console.error('Error verifying OTP:', error);
    res.status(500).json({ status: false, message: 'Failed to verify OTP' });
  }
};

