import { EstadoInterface } from './estado.interface';

export interface InfoApp {
  titulo?: string;
  email?: string;
  nombre_corto?: string;
  nombre_largo?: string;
  Linkedin?: string;
  IdAplicativo?: number;
  Estados?: EstadoInterface[];
}
