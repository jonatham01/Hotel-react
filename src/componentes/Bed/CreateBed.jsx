import React from 'react'

export const CreateBed = ({setBeds,formValues, setValues, handleChange, emptyForm, bedCategories}) => {

    const [error, seterror] = useState(false);

    const validateForm =()=>{
        if(formValues.url.trim().lenght<=1){
            setValues(values=>({...values,urlError:true}));
            seterror(true);
        }else{
            setValues(values=>({...values,urlError:false}));
        }
        
        if(formValues.date==null){
            setValues(values=>({...values,dateError:true}));
            seterror(true);
        }else{
            setValues(values=>({...values,dateError:false}));
        }
    }

    const httpResponse = fetch(
        `${url}/new`, {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify(this.formValues)
    }
    );
    
    const createBed= async(event)=> {
        event.preventDefault();
        validateForm();
        if(!error){
            const response = httpResponse;
            if(!response.ok) throw new Error("Error al crear nueva cama");
            const newBed = await response.json();
            await setBeds(data=> [...data, newBed]);
            await setValues(emptyForm);
        }     
    }

  return (
    <div>CreateBed</div>
  )
}
