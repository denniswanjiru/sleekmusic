import bcrypt from 'bcrypt';

export default async function hashPassword(password: string) {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hash(password, salt);
  } catch (error: any) {
    throw Error(error?.massage ?? 'unable to hash password');
  }
};

