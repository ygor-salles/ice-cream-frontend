import { ToastType } from 'shared/components/snackBar/enum';
import { EnumRoleUser } from 'shared/dtos/IUserDTO';

export interface IAuthResponse {
  token: string;
}

export interface IDescribedUser {
  email: string;
  name: string;
  role: EnumRoleUser;
  iat: number;
  exp: number;
  sub: string;
}

export interface IContext extends IDescribedUser {
  authenticate: (email: string, password: string) => Promise<IDescribedUser | null>;
  logout: () => void;
}

export interface IDrawerOption {
  icon: string;
  path: string;
  label: string;
}

export interface IDrawerContextData {
  isDrawerOpen: boolean;
  toggleDrawerOpen: () => void;
  drawerOptions: IDrawerOption[];
  setDrawerOptions: (newDrawerOptions: IDrawerOption[]) => void;
}

export interface IThemeContextData {
  themeName: 'light' | 'dark';
  toggleTheme: () => void;
}

export interface ToastContextData {
  addToast(message: string, type: ToastType): void;
  removeToast(): void;
}

export interface IToast {
  open: boolean;
  message?: string;
  type?: ToastType;
}
