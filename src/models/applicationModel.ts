import mongoose, { Schema, Document } from 'mongoose';

export interface IApplication extends Document {
  user: mongoose.Types.ObjectId;
  job: mongoose.Types.ObjectId;
  skillers: mongoose.Types.ObjectId;
  company: mongoose.Types.ObjectId;
  coverLetter: string;
  appliedAt: Date;
  status:string;
  title: string; 
  jobCreator: mongoose.Types.ObjectId;
}

const applicationSchema = new Schema<IApplication>({
    job: { type: Schema.Types.ObjectId, ref: 'Job', required: true },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    skillers: { type: Schema.Types.ObjectId, ref: 'SkillerProfile', required: true },
    coverLetter: { type: String, required: true },
    status: { type: String, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
    company: { type: mongoose.Schema.Types.ObjectId, ref: 'Company' },
    appliedAt: { type: Date, default: Date.now },
    jobCreator: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

export default mongoose.model<IApplication>('Application', applicationSchema);
