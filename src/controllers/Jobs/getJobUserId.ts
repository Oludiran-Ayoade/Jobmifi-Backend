import { Request, Response } from 'express';
import Job from '../../models/jobModel';
import Company from '../../models/companyModel';


// Get jobs by user ID
export const getJobsByUserId = async (req:Request, res:Response) => {
  try {
    const userId = req.params.userId;

    // Find companies owned by the user
    const companies = await Company.find({ user: userId });

    if (companies.length === 0) {
      return res.status(404).json({ message: 'No companies found for this user' });
    }

    // Extract company IDs
    const companyIds = companies.map(company => company._id);

    // Find jobs for these companies
    const jobs = await Job.find({ company: { $in: companyIds } });

    res.status(200).json(jobs);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Failed to fetch jobs' });
  }
};
