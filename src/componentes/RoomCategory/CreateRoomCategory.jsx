import React, {useState} from 'react'

export const CreateRoomCategory = ({setRoomCategories,formValues,setValues,handleChange,emptyForm,url, updateCategory}) => {

    const validateForm = () => {
        let hasError = false;
    
        if (!formValues.price <=0) {
            setValues(values => ({ ...values, priceError: true }));
            hasError = true;
        } else {
            setValues(values => ({ ...values, priceError: false }));
        }

        if (formValues.url.trim().length <= 1) {
            setValues(values => ({ ...values, urlError: true }));
            hasError = true;
        } else {
            setValues(values => ({ ...values, urlError: false }));
        }
    
        if (formValues.description.trim().length <= 1) {
            setValues(values => ({ ...values, descriptionError: true }));
            hasError = true;
        } else {
            setValues(values => ({ ...values, descriptionError: false }));
        }
    
        return !hasError;
    };

    const createNewCategory=async(event)=>{
        event.preventDefault();
        if(validateForm){
            const response = await fetch(
                `${url}/new`,{
                    method:"POST",
                    body:JSON.stringify(formValues),
                    headers:{"Content-type": "application/json" }
                }
            );
            if(!response.ok)console.error("Error al crear nueva categoria de habitacion");
            const newCategory= await response.json();
            //console.log(newCategory)
            await setRoomCategories(roomCategories=>[...roomCategories,newCategory])
        }
    }

    return (
    <div className="box">
        <div className="box-title">
            <p>Registrar tipos de habitaciones.</p>
        </div>
        <form className="box-content form-create">
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Nombre de la categoria:
                </label>
                <input type="text"
                    name="name"
                    value={formValues.name || ""}
                    onChange={handleChange}
                />
            </div>
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Precio por noche:
                </label>
                <input type="number"
                    name="price"
                    value={formValues.price || ""}
                    onChange={handleChange}
                />
            </div>
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Descripcion:
                </label>
                <textarea 
                    name="description"
                    value={formValues.description || ""}
                    onChange={handleChange}
                 ></textarea>
            </div>
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Enlace de la foto:
                </label>
                <input type="text"
                    name="url"
                    value={formValues.url || ""}
                    onChange={handleChange}
                />
            </div>
            <div className="input-form-create">
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                Caracteristicas
                </label>
                <div>
                    <label><input type="checkbox" name="television"
                        checked= {formValues.television}
                        onChange={handleChange}/>Television</label><br />
                    <label><input type="checkbox" name="air"
                        checked= {formValues.air}
                        onChange={handleChange}/>Aire acondicionado</label><br />
                    <label><input type="checkbox" name="nocturne"
                        checked= {formValues.nocturne}
                        onChange={handleChange}/>Luz nocturna</label><br />
                    <label><input type="checkbox" name="serviceAlways"
                        checked= {formValues.serviceAlways}
                        onChange={handleChange}/>Servicio a cualquier hora</label><br />
                    <label><input type="checkbox" name="coffeeMaker"
                        checked= {formValues.coffeeMaker}
                        onChange={handleChange}/>Cafetera</label><br />
                    <label><input type="checkbox" name="cooler"
                        checked= {formValues.cooler}
                        onChange={handleChange}/>Mini bar</label><br />
                    <label><input type="checkbox" name="security"
                        checked= {formValues.security}
                        onChange={handleChange}/>Caja de seguridad</label><br />
                    <label><input type="checkbox" name="automatizationLed"
                        checked= {formValues.automatizationLed}
                        onChange={handleChange}/>Leds automatizadas.</label><br />
                    <label><input type="checkbox" name="visitorService"
                        checked= {formValues.visitorService}
                        onChange={handleChange}/>Servicio de habitación</label><br />
                    <label><input type="checkbox" name="clock"
                        checked= {formValues.clock}
                        onChange={handleChange}/>Reloj despertador inteligente</label><br />
                    <label><input type="checkbox" name="laptop"
                        checked= {formValues.laptop}
                        onChange={handleChange}/>Computador portatil</label><br />
                    <label><input type="checkbox" name="dryer"
                        checked= {formValues.dryer}
                        onChange={handleChange}/>Secador de cabello</label><br />
                    <label><input type="checkbox" name="phone"
                        checked= {formValues.phone}
                        onChange={handleChange}/>Telefono.</label><br />
                    <label><input type="checkbox" name="seaView"
                        checked= {formValues.seaView}
                        onChange={handleChange}/>Vista al mar.</label>
                </div>
            </div>
            <div className="input-form-create">
                <label></label>
                {formValues.id === null ?(
                    <button type='button' onClick={(event)=>createNewCategory(event)}>
                        Guardar Tipo De Cama
                        </button>
                ) :(
                    <button type='button'
                    onClick={(event)=>{
                        updateCategory(formValues.id, formValues)
                    }} >Editar</button>
                )
                }
            </div>
        </form>
    </div>
  )
}
