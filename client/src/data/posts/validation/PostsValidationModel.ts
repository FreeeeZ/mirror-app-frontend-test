import z from 'zod';
import { PostValidationModel } from '@data/posts/validation/PostValidationModel';
import { ValidationException } from '@domain/exceptions/ValidationException';

const PostsValidationModel = z.array(PostValidationModel)

export function validatePostsList(items: unknown) {
  try {
    return PostsValidationModel.parse(items)
  } catch (e) {
    throw new ValidationException(e)
  }
}