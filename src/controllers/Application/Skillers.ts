import { Request, Response } from 'express';
import Application from '../../models/applicationModel';

export const SkillersApplications = async (req: Request, res: Response) => {
  const { userId } = req.params;

  try {
    const applications = await Application.find({ user: userId })
      .populate({
        path: 'job',
        populate: {
          path: 'company',
          select: 'name logo'
        }
      })
      .exec();

    res.status(200).send({ applications });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Failed to fetch applications' });
  }
};
