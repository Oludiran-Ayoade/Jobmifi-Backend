import { Request, Response } from 'express';
import Company from '../../models/companyModel';
import { CreateUserDto, SendUserDto } from '../../dtos/Dtos.dto';

// Fetch all companies
export const getAllCompanies = async (req: Request<{}, {}, CreateUserDto>, res: Response<SendUserDto>) => {
  try {
    const companies = await Company.find();

    if (!companies || companies.length === 0) {
      return res.status(404).json({ status: false, message: 'No companies found' });
    }

    res.status(200).json({ status: true, message: 'Successfully fetched all companies', data: companies });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Could not retrieve companies data' });
  }
};
