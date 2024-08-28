import mongoose, { Document, Schema } from 'mongoose';

interface Experience {
  company: string;
  role: string;
  duration: string;
}

interface SkillerProfileDocument extends Document {
  userId: mongoose.Schema.Types.ObjectId;
  about: string;
  contactMail: string;
  skills: string[];
  profilePicture: string;
  coverImage: string;
  experiences: Experience[];
  cv: string;
}

const ExperienceSchema: Schema = new Schema({
  company: { type: String, required: true },
  role: { type: String, required: true },
  duration: { type: String, required: true },
});

const SkillerProfileSchema: Schema = new Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  about: { type: String, required: true },
  contactMail: { type: String, required: true },
  skills: [{ type: String, required: true }],
  profilePicture: { type: String, required: true },
  coverImage: { type: String, required: true },
  experiences: [ExperienceSchema],
  cv: { type: String, required: true },
  specialization: { type: String, 
    required: true,
    enum: ['Business Development', 'Marketing', 'Web Development', 'Data Science', 'Project Management', 'Health Care'],
  },
});

const SkillerProfile = mongoose.model<SkillerProfileDocument>('SkillerProfile', SkillerProfileSchema);

export default SkillerProfile;
