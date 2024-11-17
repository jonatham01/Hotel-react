import React, {useState} from 'react'
import useForm from '../../hooks/useForm'

//Este componente maneja todo el formulario de creacion de una nueva categoria de cama
// en los props desestructuramos el metodo que se envia en onCreate
export const CreateBedCategory = ( {onCreate, formValues,setValues,handleChange} ) => {

  const emptyForm = {
        id:null,
        kind: "", //tipo de cama
        measure: "", //medidas
        url: "",  //url de la imagen
        color: "",  //especifica los colores
        kindError: false,
        measureError:false,
        urlErrro:false,
        colorError:false,
        fetchError:''
  };
  const [error, seterror] = useState(false)
  
  //este metodo maneja el fetch a la base de datos
  const handleSubmit = async (event) => {
    event.preventDefault();
    //validamos que los datos esten completos
    if( formValues.kind.trim().length <= 1 ) {
      setValues(values => ({
          ...values,
          kindError: true,
      }));
      seterror(true);
    }else{
      setValues(values => ({
        ...values,
        kindError: false,
    }));
      seterror(false);
    }

    if(formValues.measure.trim().length <= 1){
      setValues(values => ({
        ...values,
        measureError: true,
      }));
      seterror(true);
    }else{
      setValues(values => ({
        ...values,
        measureError: false,
     }));
      seterror(false);
    }

    if(formValues.url.trim().length <= 1){
      setValues(values => ({
        ...values,
        urlError: true,
      }));
     seterror(true);
    }else{
      setValues(values => ({
        ...values,
        urlError: false,
      }));
      seterror(false);
    }

    if(formValues.color.trim().length <= 1){
      setValues(values => ({
        ...values,
        colorError: true,
      }));
      seterror(true);
    }else{
      setValues(values => ({
        ...values,
        colorError: false,
    }));
      seterror(false);
    }

    if(!error){
      //colocamos la url en un espacio en memoria
      const url = `http://localhost:8090/api/categories/new`; 
      //hacemos una peticion a la base de datos.
      const response = await fetch(url, {
        headers: {
          "Content-Type": "application/json", // Tipo de contenido JSON
        },
        // es de tipo post
        method : "POST", 
      //convertimos el objeto javascript a un json y lo enviamos en el body
        body: JSON.stringify(formValues) 
      });

      //si la petion no es ok. se genera un error
      if (!response.ok) {
        throw new Error("Error en la solicitud");
      }
      const newBedCategory = await response.json();
      await onCreate(data => [...data,newBedCategory]);
      await setValues(emptyForm);
    }

   

   
  };

  return (
    <div className="box">
      <div className="box-title">
        <p>Registrar tipo de cama</p>
      </div>
      <form onSubmit={handleSubmit} className='box-content form-create'>
          <div className="item-form-create">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Tipo de cama:
              {formValues.kindError && <p id="error_kind" className='error-message'>Elegir un tipo de cama</p>}
            </label>
            <select
              name="kind"
              value={formValues.kind}
              onChange={handleChange}
              style={{ marginLeft: '8px' }}
            >
              <option value="">Seleccione una opción</option>
              <option value="Sencilla">Sencilla</option>
              <option value="Doble">Doble</option>
              <option value="King">King</option>
            </select>
          </div>

          <div className="item-form-create">
          <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            Medidas:
            {formValues.measureError && <p  className='error-message'>Valor requerido.</p>}
          </label>
            <input
              type="text"
              name="measure"
              value={formValues.measure}
              onChange={handleChange}
            />
          </div>

          <div className="item-form-create">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Color:
              {formValues.colorError && <p className='error-message'>Valor requerido.</p>}
            </label>
            <input
              type="text"
              name="color"
              value={formValues.color}
              onChange={handleChange}
            />
          </div>

         <div className="item-form-create">
            <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Url de la imagen:
              {formValues.urlError && <p className='error-message'>Valor requerido.</p>}
            </label>
            <input
                type="text"
                name="url"
                value={formValues.url}
                onChange={handleChange}
              />
         </div>
        
        <div className="item-form-create">
          <label ></label>
          <button type="submit">Enviar</button>
        </div>
      </form>
    </div>
  )
}
