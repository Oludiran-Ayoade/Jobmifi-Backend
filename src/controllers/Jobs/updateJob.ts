import { Request, Response } from 'express';
import Job from '../../models/jobModel';

// Update job details
export const updateJob = async (req:Request, res:Response) => {
  const { id } = req.params;
  // console.log(req.params);
  try {
    const job = await Job.findById(id);
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }

    Object.assign(job, req.body);

    await job.save();
    res.status(200).json(job);
  } catch (error) {
    res.status(500).json({ message: 'Error updating job', error });
  }
};

