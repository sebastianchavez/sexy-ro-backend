export enum Message {
  DEFAULT_EXCEPTION = 'Existen problemas de conexión, por favor intente más tarde',
  INVALID_PASSWORD = 'Contraseña inválida',
  DISABLED_USER = 'Usuario deshabilitado',
  INVALID_USER = 'Usuario inválido',
  DUPLICATE_EMAIL = 'Ya existe un jugador con este email',
  DUPLICATE_EMAIL_ADMIN = 'Ya existe un administrador con este email',
  DUPLICATE_EMAIL_USER = 'Ya existe un jugador con este email o usuario',
  DUPLICATE_USER = 'Ya existe un jugador con este usuario',
  INVALID_SERVER = 'Servidor inválido',
  IS_NOT_EMPTY_DTO = '{{value}} no debe venir vacío',
  IS_STRING_DTO = '{{value}} debe ser un campo tipo texto',
  IS_EMAIL_DTO = '{{value}} debe ser un email válido',
  MIN_LENGTH_DTO = '{{value}} debe tener un largo mínimo de {{length}}',
  IS_NUMBER_DTO = '{{value}} debe ser un campo numérico',
  INVALID_ADMIN = 'Admin inválido',
  EVENT_NOT_EXISTS = 'Eventento no existe'
}
