import { Request, Response } from 'express';
import Job from '../../models/jobModel'

export const getJobsByCompany = async (req: Request, res: Response) => {
    try {
      const { companyId } = req.params;
  
      const jobs = await Job.find({ company: companyId });
      res.status(200).json({ status: true, data: jobs });
    } catch (error) {
      console.error(error);
      res.status(500).json({ status: false, message: 'Could not retrieve jobs' });
    }
  };
  