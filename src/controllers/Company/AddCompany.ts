import { Request, Response } from 'express';
import Company from '../../models/companyModel';
import { v2 as cloudinaryV2 } from 'cloudinary';
import { CreateUserDto, SendUserDto } from '../../dtos/Dtos.dto';
import dotenv from 'dotenv';
 dotenv.config();
// Ensure Cloudinary is configured
cloudinaryV2.config({
  cloud_name: 'oludiranayoade',
  api_key: '334911159819466',
  api_secret: 'oOIhHZ4XFQrFC6su414SoSNIpu4'
});


export const createCompany = async (req: Request<{}, {}, CreateUserDto>, res: Response<SendUserDto>) => {
  try {
    const { userId, name, about,contactmail , founded, size, category, location, coverImage, logo, pictures } = req.body;
    
    // console.log(req.body);

    if (!userId || !coverImage || !logo || !pictures || !Array.isArray(pictures)) {
      return res.status(400).json({ status: false, message: 'All file fields are required.' });
    }

    const uploadImage = async (base64Image: string, folder: string): Promise<string> => {
      // Remove the data URL prefix and convert to a buffer
      const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');

      return new Promise((resolve, reject) => {
        const uploadStream = cloudinaryV2.uploader.upload_stream({
          folder: folder,
          quality: 'auto:best', // High quality setting
          allowed_formats: ['jpeg', 'png'] // Allowed image formats
        }, (error, result) => {
          if (error) {
            reject('Image upload failed');
          } else if (result) {
            resolve(result.secure_url);
          }
        });

        // End the stream with the buffer data
        uploadStream.end(buffer);
      });
    };

    const coverImageUrl = await uploadImage(coverImage, 'company_cover_images');
    const logoUrl = await uploadImage(logo, 'company_logos');
    const picturesUrls = await Promise.all(
      pictures.map((base64Image: string) => uploadImage(base64Image, 'company_pictures'))
    );

    const company = new Company({
      user: userId,
      name,
      coverImage: coverImageUrl,
      about,
      contactmail,
      founded,
      logo: logoUrl,
      size,
      pictures: picturesUrls,
      category,
      location
    });

    await company.save();
    res.status(201).json({ status: true, message: 'Company added successfully', data: company });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Could not save Company Data' });
  }
};
