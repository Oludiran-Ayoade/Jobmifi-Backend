import { Schema, model  } from 'mongoose';
import { ICompany } from '../dtos/Dtos.dto';
import mongoose from 'mongoose';


const companySchema = new Schema<ICompany>({
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  name: { type: String, required: true },
  coverImage: { type: String, required: true },
  about: { type: String, required: true },
  founded: { type: Date, required: true },
  contactmail: { type: String, required: true },
  logo: { type: String, required: true },
  size: { type: Number, required: true },
  pictures: { type: [String], required: true },
  jobs: [{ type: Schema.Types.ObjectId, ref: 'Job' }] ,
  category: { type: String, enum: ['Business development', 'Construction', 'Customer Service', 'Finance', 'Health Care', 'Human Resources', 'Marketing and Communication', 'Software Development', 'Project Management'], required: true },
  location: { type: String, enum: ['lagos', 'cairo', 'london', 'america', 'china', 'oslo', 'berlin', 'canada', 'ireland', 'germany'], required: true }
});

export default model<ICompany>('Company', companySchema);
