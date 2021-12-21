export function validatePassword(password: string) {
  const regEx = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return regEx.test(String(password));
}
