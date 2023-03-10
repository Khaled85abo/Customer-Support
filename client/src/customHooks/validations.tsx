import { useEffect, useState } from "react";
import { ValidationType } from "../types/validations";

const validations: {
  email: (email: string) => string;
  name: (name: string) => string;
} = {
  email: (email: string) => {
    const regex = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
    //   /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/;
    const valide = regex.test(email);
    if (valide) return "";
    return "Email Is not valide";
  },
  name: (name: string) => {
    const regex =
      /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,.'-]+$/;
    const valide = regex.test(name);
    if (valide) return "";
    return "Name Is not valide, Should be at least 2characters and written in english ";
  },
};
type Valid = keyof typeof validations;
function useValidation({
  input,
  validation,
}: {
  input: string;
  validation: ValidationType;
}) {
  const [error, setError] = useState("");
  const [info, setInfo] = useState("");
  const res = validations[validation](input);
  useEffect(() => {
    console.log("validation hook");

    if (input.length > 2) {
      setError(res);
    }
  }, [res]);
  return [error];
}
export default useValidation;
