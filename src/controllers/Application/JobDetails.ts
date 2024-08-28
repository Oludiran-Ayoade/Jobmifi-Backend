import { Request, Response } from 'express';
import Job from '../../models/jobModel';

export const getJobDetails = async (req:Request, res:Response) => {
  try {
    const { jobId } = req.params;
    const job = await Job.findById(jobId).populate('company', 'name logo');;

    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    res.status(200).json({ job });
  } catch (error) {
    console.error('Error fetching job details:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

