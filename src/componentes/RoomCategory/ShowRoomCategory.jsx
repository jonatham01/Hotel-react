import React from 'react'

export const ShowRoomCategory = ({url, setValues, setRoomCategories, RoomCategories}) => {
  
    const onDelete = async(event,id) => {
        event.preventDefault();
        const response = await fetch(`${url}/delete/${id}`,{method:"DELETE"});
        if(!response.ok) console.error("error al borrar categoria de habitación");
        const filtered = await RoomCategories.filter((value)=>{return value.id!==id});
        await setRoomCategories(filtered);
    }

    const onSelect = (newCategory) =>{
        setValues({
            ...newCategory,
            nameError:false,
            priceError:false,
            urlError:false,
            descriptionError:false
        })
    }
  
    return (
    <div className="box">
        <div className="box-title">
            <p>Registros: Tipos de Habitaciones.</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Foto</th>
                    <th>Nombre</th>
                    <th>Precio por noche</th>
                    <th>Descripción</th>
                    <th>Caracteristicas</th>
                    <th>Modificar</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {RoomCategories.map( (category)=>(
                    <tr key={category.id}>
                        <td>
                            <img src={category.url} alt="imagen" /><br />
                            <a href={category.url}>Abrir imagen</a>
                        </td>
                        <td>{category.name}</td>
                        <td> {category.price} </td>
                        <td> {category.description} </td>
                        <td> 
                            {category?.television && "television. "} 
                            {category?.air && "aire acondicionado. "} 
                            {category?.nocturne && "Luz nocturna. "} 
                            {category?.serviceAlways && "Servicio permanente. "} 
                            {category?.coffeeMaker && "Cafetera. "} 
                            {category?.cooler && "Mini Bar. "} 
                            {category?.security && "Caja de seguridad. "} 
                            {category?.automatizationLed && "Luces automatizadas."} 
                            {category?.visitorService && "Servicio a la habitacion."} 
                            {category?.clock && "Despertador. "} 
                            {category?.laptop && "Portatil. "} 
                            {category?.dryer && "Secadora. "} 
                            {category?.seaView && "Vista al mar."} 
                        </td>
                        <td>
                            <button onClick={(event)=>onSelect(category)}
                            type="button">Modificar</button>
                        </td>
                        <td>
                            <button onClick={(event)=>onDelete(event,category.id)}
                            type="button">Eliminar</button>
                        </td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    </div>
  )
}
