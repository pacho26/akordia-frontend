import type { FormInstance } from './element.model';
import type { SongCreate } from './song.model';

export interface GenericResponse {
  message: string;
}
export interface GenericErrorResponse {
  error: string;
  message?: string;
}

export interface SubmitFormArgs {
  formRef: FormInstance | null;
  form: SongCreate;
}
