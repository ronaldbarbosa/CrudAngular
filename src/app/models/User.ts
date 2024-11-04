export interface User {
  id?: number;
  name: string;
  email: string;
  password?: string;
  role: string;
  cpf?: string;
  salary: string;
  active: boolean;
}
