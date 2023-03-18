import bcrypt from 'bcrypt';

export default async function(
    password: string,
    hash: string,
): Promise<boolean> {
  try {
    return await bcrypt.compare(password, hash);
  } catch (error) {
    return false;
  }
}
