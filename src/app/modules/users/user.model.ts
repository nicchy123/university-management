import { Schema, model } from 'mongoose';
import { IUser, IUserMethods, UserModel } from './user.interface';
import config from '../../../config';
import bcrypt from 'bcrypt';

const userSchema = new Schema<IUser, Record<string, never>, IUserMethods>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    student: {
      type: Schema.Types.ObjectId,
      ref: 'Student',
    },
    faculty: {
      type: Schema.Types.ObjectId,
      ref: 'Faculty',
    },
    admin: {
      type: Schema.Types.ObjectId,
      ref: 'Admin',
    },
    needsPasswordChange: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  },
);

userSchema.methods.isUserExist = async function (
  id: string,
): Promise<Partial<IUser | null>> {
  const user = await User.findOne(
    { id },
    { id: 1, needsPasswordChange: 1, password: 1, role: 1 },
  );
  return user;
};
userSchema.methods.isPasswordMatched = async function (
  givenPassword: string,
  savedPassword: string,
): Promise<Partial<boolean>> {
  return await bcrypt.compare(givenPassword, savedPassword);
};

userSchema.pre('save', async function (next) {
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bycrypt_salt_rounds),
  );
  next();
});

export const User = model<IUser, UserModel>('User', userSchema);
