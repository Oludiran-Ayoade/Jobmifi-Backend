import { Request, Response } from 'express';
import Job from '../../models/jobModel';

// Fetch job by ID
export const getJobById = async (req: Request, res: Response): Promise<void> => {
     const { jobId } = req.params;
    //  console.log(req.params);
  try {
    const job = await Job.findById(jobId);
    if (!job) {
      res.status(404).json({ status: false, message: 'Job not found' });
      return;
    }

    res.status(200).json({status: true, data: job});
  } catch (error) {
    res.status(500).json({ status: false, message: 'Error fetching job', error });
  }
};