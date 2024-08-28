import { Request, Response } from 'express';
import sendEmail from '../../middlewares/NodemailerUtils';

export const sendAcceptanceEmail = async (req: Request, res: Response) => {
  try {
    const { applicantEmail, applicantName, companyName, jobTitle } = req.body;

    const subject = 'Congratulations!';
    const text = `Dear ${applicantName},\n\nCongratulations! You have been accepted for the role of ${jobTitle} at ${companyName}. We look forward to working with you.\n\nBest regards,\n${companyName}`;

    await sendEmail(applicantEmail, subject, text);
    res.status(200).json({ message: 'Acceptance email sent' });
  } catch (error) {
    console.error('Error sending acceptance email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const sendRejectionEmail = async (req: Request, res: Response) => {
  try {
    const { applicantEmail, applicantName, companyName, jobTitle } = req.body;
    // console.log(req.body);
    const subject = 'Application Status';
    const text = `Dear Mr/Ms ${applicantName},\n\nWe regret to inform you that your application for the role of ${jobTitle} at ${companyName} has been rejected. We wish you all the best in your future endeavors.\n\nBest regards,\n${companyName}`;

    await sendEmail(applicantEmail, subject, text);
    res.status(200).json({ message: 'Rejection email sent' });
  } catch (error) {
    console.error('Error sending rejection email:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
