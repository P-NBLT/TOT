import { useState } from "react";

export type DataFormProps = {
  email?: string;
  password?: string;
  confirmPassword?: string;
};

const useForm = () => {
  const [formData, setFormData] = useState<DataFormProps>({});

  function addValue(data: any) {
    const { type, value } = data;

    setFormData({
      ...formData,
      [type]: value,
    });
  }

  return { formData, addValue };
};

export default useForm;
