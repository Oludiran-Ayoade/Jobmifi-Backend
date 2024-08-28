import { Request, Response } from 'express';
import Company from '../../models/companyModel';

export const getCompanyByUserId = async (req: Request<{ userId: any }>, res: Response) => {
  try {
    const { userId } = req.params;
    const companies = await Company.find({ user: userId });
    // console.log(userId, companies);

    if (companies.length === 0) {
      return res.status(404).json({ status: false, message: 'Companies not found' });
    }

    res.status(200).json({ data: companies });
  } catch (error) {
    res.status(500).json({ status: false, message: 'Could not retrieve company data' });
  }
};
