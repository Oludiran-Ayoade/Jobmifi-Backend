import { Request, Response } from 'express';
import Job from '../../models/jobModel';

// Fetch all jobs
export const getAllJobs = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobs = await Job.find().populate('company')
    res.status(200).json({ jobs });
  } catch (error) {
    console.error('Error fetching jobs:', error);
    res.status(500).json({ error: 'Failed to fetch jobs' });
  }
};
