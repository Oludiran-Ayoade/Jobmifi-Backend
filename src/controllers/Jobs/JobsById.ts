import { Request, Response } from 'express';
import Job from '../../models/jobModel';

// Fetch a job by ID
export const getJobByIdOf = async (req: Request, res: Response): Promise<void> => {
  try {
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate('company').exec();

    if (!job) {
      res.status(404).json({ error: 'Job not found' });
      return;
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error('Error fetching job:', error);
    res.status(500).json({ error: 'Failed to fetch job' });
  }
};
