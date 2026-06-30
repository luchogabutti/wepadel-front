import { isValidEmail } from './auth';

const NAME_PATTERN = /^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]{2,}$/;

export const getProfileFieldError = (field, { firstName, lastName, email }) => {
  switch (field) {
    case 'firstName':
      if (!firstName.trim()) return 'Ingresá tu nombre';
      if (!NAME_PATTERN.test(firstName.trim())) return 'El nombre solo puede contener letras';
      return '';
    case 'lastName':
      if (!lastName.trim()) return 'Ingresá tu apellido';
      if (!NAME_PATTERN.test(lastName.trim())) return 'El apellido solo puede contener letras';
      return '';
    case 'email':
      if (!email.trim()) return 'Ingresá tu email';
      if (!isValidEmail(email)) return 'Ingresá un email válido';
      return '';
    default:
      return '';
  }
};

export const isProfileFormValid = (form) =>
  !getProfileFieldError('firstName', form) &&
  !getProfileFieldError('lastName', form) &&
  !getProfileFieldError('email', form);
