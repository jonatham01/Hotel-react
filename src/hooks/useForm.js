import { useState } from "react";

function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    if(value=="on"){
      setValues({
        ...values,
        [name]: !values[name],
      });
    }else{
      setValues({
        ...values,
        [name]: value,
      });
    }
   

  };
  
  return [values, handleChange,setValues];
}

export default useForm;