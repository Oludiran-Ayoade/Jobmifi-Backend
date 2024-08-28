import { Request, Response } from 'express';
import Company from '../../models/companyModel';
import { v2 as cloudinaryV2 } from 'cloudinary';
import dotenv from 'dotenv';
import { CreateUserDto, SendUserDto } from '../../dtos/Dtos.dto';
dotenv.config();

cloudinaryV2.config({
  cloud_name: 'oludiranayoade',
  api_key: '334911159819466',
  api_secret: 'oOIhHZ4XFQrFC6su414SoSNIpu4',
});

const uploadImage = async (base64Image: string, folder: string): Promise<string> => {
  const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
  const buffer = Buffer.from(base64Data, 'base64');

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinaryV2.uploader.upload_stream(
      {
        folder: folder,
        quality: 'auto:best',
        allowed_formats: ['jpeg', 'png'],
      },
      (error, result) => {
        if (error) {
          reject('Image upload failed');
        } else if (result) {
          resolve(result.secure_url);
        }
      }
    );

    uploadStream.end(buffer);
  });
};

export const updateCompany = async (
  req: Request<{ id: string }, {}, CreateUserDto>,
  res: Response<SendUserDto>
) => {
  try {
    const { name, about, founded, size, category, location, coverImage, logo, pictures } = req.body;
    const updates: any = { name, about, founded, size, category, location };
    // console.log(req.body);

    if (coverImage) {
      updates.coverImage = await uploadImage(coverImage, 'company_cover_images');
    }

    if (logo) {
      updates.logo = await uploadImage(logo, 'company_logos');
    }

    if (pictures && Array.isArray(pictures)) {
      updates.pictures = await Promise.all(
        pictures.map((base64Image: string) => uploadImage(base64Image, 'company_pictures'))
      );
    }

    const company = await Company.findByIdAndUpdate(req.params.id, updates, { new: true });
    if (!company) {
      return res.status(404).json({ status: false, message: 'Company not found' });
    }

    res.status(200).json({ status: true, message: 'Company updated successfully', data: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Could not update company data' });
  }
};
