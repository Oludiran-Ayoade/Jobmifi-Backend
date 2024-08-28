import { Request, Response } from 'express';
import Company from '../../models/companyModel';
import Job from '../../models/jobModel';

// Fetch all companies with their jobs
export const getAllCompaniesWithJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const companies = await Company.find().populate('user'); // Populate user information if needed

    const companiesWithJobs = await Promise.all(companies.map(async (company) => {
      const jobs = await Job.find({ company: company._id });
      return { ...company.toObject(), jobs };
    }));

    res.status(200).json(companiesWithJobs);
  } catch (error) {
    console.error('Error fetching companies with jobs:', error);
    res.status(500).json({ error: 'Failed to fetch companies with jobs' });
  }
};
