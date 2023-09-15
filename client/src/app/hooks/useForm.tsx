import { useState } from "react";
import { signUpSchema } from "../utils/zod-validation/formValidation";
import { ZodError } from "zod";

export type DataFormProps = {
  email?: string;
  password?: string;
  "confirm-password"?: string;
};

const useForm = (validation?: string) => {
  const [formData, setFormData] = useState<DataFormProps>({});
  const [validationError, setValidationError] = useState({});

  function validateAndExecute(e: any) {
    e.preventDefault();

    try {
      const isValid = signUpSchema.parse(formData);
      if (isValid) {
        return true;
      }
    } catch (e) {
      if (e instanceof ZodError) {
        setValidationError(formatZodeError(e.errors));
      }
    }
  }

  function addValue(data: any) {
    const { type, value } = data;

    setFormData({
      ...formData,
      [type]: value,
    });
    setValidationError({});
  }

  return { formData, validationError, addValue, validateAndExecute };
};

export default useForm;

function formatZodeError(zodErrors: any) {
  //
  const errorObj = zodErrors.reduce((acc: any, error: any) => {
    const buildObj = (key: string) => {
      return key && { ...acc, [error.path[0]]: error.message };
    };

    acc &&= buildObj(error.validation) || buildObj(error.code) || acc;

    return acc;
  }, {});
  //
  if (!errorObj["confirm-password"] && errorObj["undefined"]) {
    errorObj["confirm-password"] = errorObj["undefined"];
  }

  delete errorObj["undefined"];

  return errorObj;
}
