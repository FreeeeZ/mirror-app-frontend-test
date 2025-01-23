import { IError } from '@errors/IError';

export abstract class ApplicationError extends Error implements IError {}
