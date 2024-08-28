import { Request, Response } from 'express';
import Company from '../../models/companyModel';
import { CreateUserDto, SendUserDto } from '../../dtos/Dtos.dto';

export const deleteCompany = async (req: Request<{id: string}, {}, CreateUserDto>, res: Response<SendUserDto>) => {
  try {
    const companyId = req.params.id;

    const company = await Company.findByIdAndDelete(companyId);

    if (!company) {
      return res.status(404).json({ status: false, message: 'Company not found' });
    }

    res.status(200).json({ status: true, message: 'Company deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ status: false, message: 'Could not delete company' });
  }
};
