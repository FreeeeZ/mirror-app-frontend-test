import { ApplicationError } from '@errors/ApplicationError';

export class ValidationException extends ApplicationError {
  constructor(error: unknown) {
    const message = error ? String(error) : 'Validation Error'

    super()
    this.message = message

    console.error(this.message, this.stack)
  }
}
