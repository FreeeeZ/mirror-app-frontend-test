import z from 'zod';

export const UserValidationModel = z.object({
  id: z.string(),
  username: z.string(),
  postId: z.string(),
})
