import { Schema, model, Document } from 'mongoose';
import mongoose from 'mongoose';

export interface IJob extends Document {
  title: string;
  category: string;
  location: string;
  description: string;
  type: string;
  company: mongoose.Types.ObjectId;
  qualifications: string[];
  skillsRequired: string[];
  jobResponsibilities: string[];
  salaryRange: string;
  user: mongoose.Types.ObjectId;
  // company: any;
}

const jobSchema = new Schema<IJob>({
  title: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['Business Development', 'Construction', 'Customer Service', 'Finance', 'Health Care', 'Human Resources', 'Project Management', 'Software Development'], 
    required: true 
  },
  location: { type: String, required: true },
  description: { type: String, required: true },
  type: { 
    type: String, 
    enum: ['full-time', 'hybrid', 'part-time', 'remote', 'contract'], 
    required: true 
  },
  company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company', required: true },
  qualifications: { type: [String], required: true },
  skillsRequired: { type: [String], required: true },
  jobResponsibilities: { type: [String], required: true },
  salaryRange: { type: String, required: true },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  // company: { type: Schema.Types.ObjectId, ref: 'Company', required: true }
});

export default model<IJob>('Job', jobSchema);
