import { Request, Response } from 'express';
import Company from '../../models/companyModel';

// Helper function to convert base64 to a buffer for saving images
const base64ToBuffer = (base64: string) => {
  const base64Data = base64.replace(/^data:image\/\w+;base64,/, '');
  return Buffer.from(base64Data, 'base64');
};

export const updateCompany = async (req: Request, res: Response) => {
  try {
    const { companyId } = req.params;
    const {
      name,
      about,
      founded,
      size,
      category,
      location,
      coverImage,
      logo,
      pictures,
      userId,
    } = req.body;

    // Find the company by ID
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ status: false, message: 'Company not found' });
    }

    // Update the company details
    company.name = name;
    company.about = about;
    company.founded = founded;
    company.size = size;
    company.category = category;
    company.location = location;
    company.user = userId;

    // Update the cover image if provided
    if (coverImage) {
      company.coverImage = coverImage;
    }

    // Update the logo if provided
    if (logo) {
      company.logo = logo;
    }

    // Update the pictures if provided
    if (pictures && Array.isArray(pictures)) {
      company.pictures = pictures;
    }

    // Save the updated company details
    await company.save();

    res.status(200).json({ status: true, message: 'Company updated successfully', data: company });
  } catch (error) {
    console.error('Error updating company:', error);
    res.status(500).json({ status: false, message: 'Failed to update company' });
  }
};
