import { useState } from "react";

export function useFormFields(initialState) {
  const [fields, setValues] = useState(initialState);

  return [
    fields,
    (e) => {
      setValues({
        ...fields,
        [e.target.id]: e.target.value,
      });
    }
  ]
}
