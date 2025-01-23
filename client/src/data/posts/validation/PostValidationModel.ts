import z from 'zod';

export const PostValidationModel = z.object({
  id: z.string(),
  caption: z.string(),
  permalink: z.string(),
  date: z.string(),
  likes: z.number(),
  comments: z.number(),
  userId: z.string(),
})
