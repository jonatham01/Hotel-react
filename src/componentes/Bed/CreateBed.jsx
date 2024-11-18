import React, {useState} from 'react'

export const CreateBed = ({
    setBeds,formValues, setValues, 
    handleChange, emptyForm, bedCategories,url,updateBed}) => {

    const [error, seterror] = useState(false);

    const validateForm = () => {
        let hasError = false;
    
        if (!formValues.url.trim()) {
            setValues(values => ({ ...values, urlError: true }));
            hasError = true;
        } else {
            setValues(values => ({ ...values, urlError: false }));
        }
    
        if (!formValues.date) {
            setValues(values => ({ ...values, dateError: true }));
            hasError = true;
        } else {
            setValues(values => ({ ...values, dateError: false }));
        }
    
        return hasError;
    };

    
    
    const createNewBed= async(event)=> {
        
        event.preventDefault();
        validateForm();
        if(!validateForm()){
            const response = await fetch(
                `${url}/new`, {
                method: "POST",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify(formValues)
            });
            if(!response.ok) throw new Error("Error al crear nueva cama");
            const newBed = await response.json();
            await setBeds(data=> [...data, newBed]);
            await setValues(emptyForm);
        }     
    }

  return (
    <div className="box">
        <div className="box-title">
            <p>Registrar cama</p>
        </div>
        <form  className="box-content form-create">
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Url:
                </label>
                <input type="text"
                    name="url"
                    value={formValues.url || ""}
                    onChange={handleChange}
                />
            </div>
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Fecha:
                </label>
                <input type="datetime-local" 
                    name="date"
                    value={formValues.date || ""}    
                    onChange={handleChange}
                />
            </div>
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Categoria:
                </label>
                <select 
                    name="badCategoryId"
                    value={formValues.badCategoryId || ""}
                    onChange={handleChange}
                >
                    <option value="">Seleccione una opción</option>
                    {bedCategories.map((Category)=>(
                        <>
                        
                        <option value={Category.id}>
                            id{Category.id}-{Category.kind}-{Category.measure}-{Category.color}
                            </option>
                        </>
                    ))
                    }
                </select>
            </div>
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>Habitación</label>
                <select name="habitacion">
                    <option >Seleccionar</option>
                </select>
            </div>
            <div className="input-form-create">
                <label></label>
                {formValues.id === null ? (
                    <button
                        type="button" // Evita conflictos con onSubmit
                        onClick={(event)=>createNewBed(event)}
                    >
                        Guardar nuevo
                    </button>
                ) : (
                    <button
                        type="button"
                        onClick={(event) => {
                            event.preventDefault();
                            updateBed(formValues.id, {
                                id: formValues.id,
                                url: formValues.url,
                                date: new Date(formValues.date).toISOString(), //.toISOString()
                                badCategoryId: formValues.badCategoryId,
                            });
                        }}
                    >
                        Editar registro
                    </button>
                )}
            </div>
        </form>
    </div>
  )
}
