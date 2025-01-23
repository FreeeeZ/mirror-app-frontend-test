import z from 'zod';
import { UserValidationModel } from '@data/users/validation/UserValidationModel';
import { ValidationException } from '@domain/exceptions/ValidationException';

const UsersValidationModel = z.array(UserValidationModel)

export function validateUsersList(items: unknown) {
  try {
    return UsersValidationModel.parse(items)
  } catch (e) {
    throw new ValidationException(e)
  }
}
