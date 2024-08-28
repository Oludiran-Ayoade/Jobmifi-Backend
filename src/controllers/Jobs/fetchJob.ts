import Job from '../../models/jobModel';
import { Request, Response } from 'express';

 export const fetchJob = async (req:Request, res:Response) => {
 
  try {
    const job = await Job.findById(req.params.id).populate('company');
    if (!job) {
      return res.status(404).json({ message: 'Job not found' });
    }
    res.json(job);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
    console.log(error);
    
  }
};

