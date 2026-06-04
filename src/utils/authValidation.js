export const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());

export const isLoginFormValid = ({ email, password }) =>
  isValidEmail(email) && password.length >= 6;

export const isRegisterPasswordValid = (password) =>
  password.length >= 12 &&
  /[A-Z]/.test(password) &&
  /\d/.test(password) &&
  /[^A-Za-z0-9]/.test(password);

export const isRegisterFormValid = ({ firstName, lastName, email, password }) =>
  firstName.trim().length >= 2 &&
  lastName.trim().length >= 2 &&
  isValidEmail(email) &&
  isRegisterPasswordValid(password);
