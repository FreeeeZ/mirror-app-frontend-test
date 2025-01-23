import z from 'zod'
import { ValidationException } from '@domain/exceptions/ValidationException';

export const SettingsValidationModel = z.object({
  layout: z.object({
    current: z.string(),
    params: z.record(z.string(), z.record(z.string(), z.number())),
  }),
  template: z.string(),
  navigation: z.string()
})

export function validateSettings(items: unknown) {
  try {
    return SettingsValidationModel.parse(items)
  } catch (e) {
    throw new ValidationException(e)
  }
}