import { Request, Response } from 'express';
import Company from '../../models/companyModel';
import Job from '../../models/jobModel';


export const getCompanyById = async (req: Request<{ companyId:string}, {}, {}>, res: Response) => {
  try {

    const { companyId } = req.params; 
    const company = await Company.findById(companyId);

    if (!company) {
      return res.status(404).json({ status: false, message: 'Company not found' });
    }
   
    const jobs = await Job.find({ company: companyId });
    res.status(200).json({ status: true, data: company, jobs: jobs });
  } catch (error) {
    console.error('Error fetching company details:', error);
    res.status(500).json({ status: false, message: 'Failed to fetch company details' });
  }
};
