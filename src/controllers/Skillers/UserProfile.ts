import { Request, Response } from 'express';
// import User from '../../models/userModel';
import SkillerProfile from '../../models/skillerModel';

// Get all users with their profiles
export const getAllUsersWithProfiles = async (req: Request, res: Response) => {
    try {
        const usersWithProfiles = await SkillerProfile.find()
          .populate({
            path: 'userId',
            select: 'firstName lastName specialization email', // Select specific fields from the User model
          })
          .select('profilePicture specialization'); // Select fields from the SkillerProfile model
          res.status(200).send({message:'candidates details', data:usersWithProfiles})
      } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
};
};
// Get a single user's profile by ID
export const getUserProfileById = async (req: Request, res: Response) => {
  const { userId } = req.params;
  
  try {
    const profile = await SkillerProfile.findOne({ userId }).populate('userId', 'firstName lastName email');
    if (!profile) {
      return res.status(404).json({ message: 'Profile not found' });
    }
    res.json(profile);
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};
