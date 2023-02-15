export const validateEmail = (email: string): boolean => {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  //   /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
  const valide = regex.test(email);
  return valide;
};
