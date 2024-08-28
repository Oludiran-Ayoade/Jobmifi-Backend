import { Request, Response } from 'express';
import Application from '../../models/applicationModel';

export const Employer = async (req: Request, res: Response) => {
    
    const userId = req.params.userId;   

    try {
        const applications = await Application.find({ jobCreator: userId })
            .populate({
                path: 'job',
                select: 'title salaryRange',
                populate: {
                    path: 'company',
                    select: 'name logo category location',
                }
            })
            .populate({
                path: 'skillers',
                select: 'profilePicture contactMail skills specialization userId',
                populate: {
                    path: 'userId',
                    model: 'User',
                    select: 'firstName lastName email'
                }
            })
            .exec();


        res.status(200).json(applications);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while fetching applications.' });
    }
};

// Update application status
export const updateApplicationStatus = async (req: Request, res: Response) => {
    const { applicationId, status } = req.body;
    // console.log(req.body);
    
    try {
        const updatedApplication = await Application.findByIdAndUpdate(
            applicationId,
            { status },
            { new: true }
        )
        .populate({
            path: 'job',
            select: 'title salaryRange',
            populate: {
                path: 'company',
                select: 'name logo category location',
            }
        })
        .populate({
            path: 'skillers',
            select: 'profilePicture contactMail skills specialization userId',
            populate: {
                path: 'userId',
                model: 'User',
                select: 'firstName lastName email'
            }
        })
        .exec();
        if (!updatedApplication) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json(updatedApplication);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while updating application status.' });
    }
};

// Delete an application
export const deleteApplication = async (req: Request, res: Response) => {
    const { applicationId } = req.params;
    
    try {
        const result = await Application.findByIdAndDelete(applicationId);
        if (!result) {
            return res.status(404).json({ message: 'Application not found' });
        }
        res.status(200).json({ message: 'Application deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while deleting application.' });
    }
};
