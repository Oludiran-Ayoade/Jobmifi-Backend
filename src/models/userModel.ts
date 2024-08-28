import mongoose, { Schema } from 'mongoose';
import bcrypt from 'bcrypt';
import { UserDTO } from '../dtos/Dtos.dto';

const userSchema: Schema<UserDTO> = new Schema({
  firstName: { type: String, required: [true, 'First name is required'] },
  lastName: { type: String, required: [true, 'Last name is required'] },
  email: { type: String, required: [true, 'Email is required'], unique: true },
  password: { type: String, required: true, minlength: [6, 'Password must be at least 6 characters'] },
  role: { type: Number, default: 0 },
  otp: { type: String },
  otpSentAt: { type: Date },
  specialization: { type: String, default: '' },
}, {
    timestamps: true
});

const saltRounds = 10;

userSchema.pre<UserDTO>('save', async function (next) {
  const user = this;
  if (!user.isModified('password')) {
    return next();
  }

  try {
    const hashedPassword = await bcrypt.hash(user.password, saltRounds);
    user.password = hashedPassword;
    next();
  } catch (err: any) {
    return next(err);
  }
});

userSchema.methods.validatePassword = async function (password: string): Promise<boolean> {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model<UserDTO>('User', userSchema);

export default User;
