export const validateEmail = (email: string): boolean => {
  const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
  //   /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
  const valide = regex.test(email);
  return valide;
};

export const validateZipCode = (zipCode: string): boolean => {
  let code = zipCode;
  if (code.includes(" ")) {
    code = code.replace(" ", "");
  }
  if (code.length > 5) return false;

  const regex = /[0-9]{5}/;
  const validation = regex.test(code);
  return validation;
};

export const validatePersonalNumber = (personalnumber: string): boolean => {
  let num = personalnumber;
  if (num && num.includes("-")) {
    num = num.replace("-", "");
  }
  if (num.length > 10 || num.length == 0) return false;
  const regex = /[0-9]{10}/;
  return regex.test(num);
};

type RequestBody = {
  zipCode?: string;
  personalnumber?: string;
  email?: string;
  firstname?: string;
  lastname?: string;
  address?: string;
  city?: string;
  country?: string;
};

export const validateText = (body: { [key: string]: string }) => {
  const errors = [];
  const properties: string[] = [
    "zipCode",
    "personalnumber",
    "email",
    "firstname",
    "lastname",
    "address",
    "city",
    "country",
  ];

  // properties.map((pro) => {
  //   return body[pro];
  // });
  for (let property of properties) {
    if (!body[property] || body[property].length == 0) {
      errors.push({ error: `${property} should have valid value` });
    }
  }
  return errors;
};
