import { Request, Response } from 'express';
import Job from '../../models/jobModel';
import Company from '../../models/companyModel';

export const createJob = async (req: Request, res: Response) => {
  try {
    const { userId, title, category, description, type, companyId, qualifications, skillsRequired, jobResponsibilities, 
      salaryRange 
    } = req.body;
    // console.log(req.body);
    

    const company = await Company.findById(companyId);
    if (!company) {
      return res.status(404).json({ status: false, message: 'Company not found' });
    }

    const job = new Job({
      title,
      category,
      location: company.location,
      description,
      type,
      company: companyId,
      qualifications,
      skillsRequired,
      jobResponsibilities,
      salaryRange,
      user: userId
    });

    await job.save();
    res.status(201).json({ status: true, message: 'Job created successfully', data: job });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Could not create job' });
  }
};
