import { Request, Response } from 'express';
import SkillerProfile from '../../models/skillerModel';
import User from '../../models/userModel';
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

cloudinaryV2.config({
  cloud_name: 'oludiranayoade',
  api_key: '334911159819466',
  api_secret: 'oOIhHZ4XFQrFC6su414SoSNIpu4'
});

const uploadImage = async (base64Image: string, folder: string): Promise<string> => {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryV2.uploader.upload_stream({
      folder: folder,
      quality: 'auto:best',
      allowed_formats: ['jpeg', 'png'],
    }, (error, result) => {
      if (error) {
        console.log(error);
        reject('Image upload failed');
      } else if (result) {
        resolve(result.secure_url);
      }
    });

    uploadStream.end(buffer);
  });
};

const uploadFile = async (base64File: string, folder: string): Promise<string> => {
  const base64Data = base64File.replace(/^data:application\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryV2.uploader.upload_stream({
      folder: folder,
      resource_type: 'raw',
    }, (error, result) => {
      if (error) {
        reject('File upload failed');
      } else if (result) {
        resolve(result.secure_url);
      }
    });

    uploadStream.end(buffer);
  });
};

export const getProfile = async (req: Request, res: Response) => {
  try {
    const userId = req.params.userId;
    
    const profile = await SkillerProfile.findOne({ userId }).populate('userId', 'firstName lastName');
    const user = await User.findById(userId).select('firstName lastName');

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (!profile) {
      return res.status(200).json({ message: 'Profile not found', user });
    }

    res.status(200).json({ profile, user });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

export const updateProfile = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const { about, contactMail, skills, experiences, specialization , profilePicture, coverImage, cv } = req.body;
    // console.log(req.body);
    
    
    let profilePictureUrl = '';
    let coverImageUrl = '';
    let cvUrl = '';

    const existingProfile = await SkillerProfile.findOne({ userId });

    if (profilePicture && (!existingProfile || existingProfile.profilePicture !== profilePicture)) {
      profilePictureUrl = await uploadImage(profilePicture, 'profile_pictures');
    }

    if (coverImage && (!existingProfile || existingProfile.coverImage !== coverImage)) {
      coverImageUrl = await uploadImage(coverImage, 'cover_images');
    }

    if (cv && (!existingProfile || existingProfile.cv !== cv)) {
      cvUrl = await uploadFile(cv, 'cvs');
    }

    const profile = await SkillerProfile.findOneAndUpdate(
      { userId },
      {
        about,
        contactMail,
        skills,
        experiences,
        specialization,
        ...(profilePictureUrl && { profilePicture: profilePictureUrl }),
        ...(coverImageUrl && { coverImage: coverImageUrl }),
        ...(cvUrl && { cv: cvUrl }),
      },
      { new: true, upsert: true }
    );

    res.status(200).json({ profile });
    
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Server error', error });
  }
};
