import { Request, Response } from 'express';
import Job from '../../models/jobModel'
import Application from '../../models/applicationModel';
import SkillerProfile from '../../models/skillerModel';


export const JobApplication = async (req:Request, res:Response) => {

  try {
    const { jobId, coverLetter, userId } = req.body;
    // console.log('Received request with jobId:', jobId, 'userId:', userId);
    // const user:any = req.user;
    const job = await Job.findById(jobId).populate('company').populate('user');
    if (!job) {
      return res.status(404).json({ error: 'Job not found' });
    }
    // console.log('Job found:', job);

    // Check if the user has already applied for this job
    const existingApplication = await Application.findOne({ job: jobId, user: userId });
    if (existingApplication) {
    return res.status(400).json({ message: 'You have already applied for this job.' });
    }

    const skillerProfile = await SkillerProfile.findOne({ userId }); 

    if (!skillerProfile) {
      return res.status(404).json({ error: 'Skiller profile not found' });
    }
    

    const application = new Application({
        job: jobId,
        user: userId,
        coverLetter,
        skillers: skillerProfile._id,
        jobCreator: job.user._id,
        appliedAt: new Date()
    });

    await application.save();

    res.status(201).json({ message: 'Application submitted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
    console.log(error);
    
  }
};

