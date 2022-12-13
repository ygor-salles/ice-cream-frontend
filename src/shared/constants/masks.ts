import { EnumRoleUser } from '../dtos/IUserDTO';

/* eslint-disable no-param-reassign */
export default class Mask {
  static currency(text: string): string {
    let value = text;
    value = value.replace(/\D/g, '');
    value = value.replace(/(\d)(\d{2})$/, '$1,$2');
    value = value.replace(/(?=(\d{3})+(\D))\B/g, '.');

    return value;
  }

  static convertCurrency(text: string): number {
    let newString: string;

    if (text.length === 3) {
      newString = `${text.slice(0, 1)}.${text.slice(-2)}`;
    } else if (text.length > 3) {
      newString = text.replace(/[^0-9]/g, '');
      newString = `${newString.substring(0, newString.length - 2)}.${newString.slice(-2)}`;
    } else {
      newString = text;
    }

    return Number(newString);
  }

  static cep(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 9;
    let { value } = e.currentTarget;
    value = value.replace(/\D/g, '');
    value = value.replace(/^(\d{5})(\d)/, '$1-$2');
    e.currentTarget.value = value;
    return e;
  }

  static cpf(e: React.ChangeEvent<HTMLInputElement>) {
    e.currentTarget.maxLength = 14;
    let { value } = e.currentTarget;
    if (!value.match(/^(\d{3}).(\d{3}).(\d{3})-(\d{2})$/)) {
      value = value.replace(/\D/g, '');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d)/, '$1.$2');
      value = value.replace(/(\d{3})(\d{2})$/, '$1-$2');
      e.currentTarget.value = value;
    }
    return e;
  }

  static convertNumberToString(value: number): string {
    return value.toFixed(2).replace('.', ',');
  }

  static convertBooleanToString(value: boolean): string {
    if (value === true) return 'habilitado';
    if (value === false) return 'desabilitado';
    return '';
  }

  static convertTimestampToDateString(value: Date): string {
    return new Intl.DateTimeFormat('pt-BR').format(new Date(value));
  }

  static convertBooleanToStringYesOrNot(value: boolean): string {
    if (value === true) return 'sim';
    if (value === false) return 'não';
    return '';
  }

  static convertEnumToStringRoleUser(value: EnumRoleUser): string {
    if (value === EnumRoleUser.SUPER) return 'admin';
    if (value === EnumRoleUser.NORMAL) return 'comum';
    if (value === EnumRoleUser.EMPLOYEE) return 'funcionário';
    return '';
  }
}
