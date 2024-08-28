import { Request, Response } from 'express';
import Company from '../../models/companyModel';
import Job from '../../models/jobModel';

export const getCompaniesWithJobCount = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const companies = await Company.find({ user: id });

    if (!companies) {
      return res.status(404).json({ status: false, message: 'No companies found for this user.' });
    }

    // Create an array to store promises of fetching jobs for each company
    const companiesWithJobs = await Promise.all(companies.map(async company => {
      const jobs = await Job.find({ company: company._id });
      return {
        _id: company._id,
        name: company.name,
        logo: company.logo,
        location: company.location,
        jobCount: jobs.length,
        jobs: jobs, // Optionally include all job details
      };
    }));

    res.status(200).json({ message: 'Companies fetched successfully', data: companiesWithJobs });
    
  } catch (error) {
    console.error('Error fetching companies:', error);
    res.status(500).json({ status: false, message: 'Failed to fetch companies.' });
  }
};
