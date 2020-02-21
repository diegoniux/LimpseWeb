export interface LoginInterface {
  objResultadoSP: ObjResultadoSP;
  objUsuario?: ObjUsuario;
  objPerfil?: ObjPerfil;
  objEstatusUsuario?: ObjEstatusUsuario;
}

interface ObjEstatusUsuario {
  idEstatusUsuario: number;
  estatusUsuario: string;
}

interface ObjPerfil {
  idPerfil: number;
  perfil: string;
  activo: boolean;
}

interface ObjUsuario {
  idUsuario: number;
  usuario: string;
  idPerfil: number;
  idEstatusUsuario: number;
  password?: any;
  email: string;
}

interface ObjResultadoSP {
  result: number;
  errorMessage?: any;
  friendlyMessage?: any;
  id: number;
}
