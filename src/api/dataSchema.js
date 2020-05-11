import { string, object, number } from 'yup';

export const userSchema = object().shape({
  id: number(),
  email: string().email(),
});