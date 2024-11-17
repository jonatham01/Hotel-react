
import React, {useState} from 'react'
import PropTypes from 'prop-types'

export const ShowBeds = ({url,setBeds,Beds, setValues,bedCategories}) => {

    const onDelete = async(event,id) =>{
        event.preventDefault();
        const response = await fetch(`${url}/delete/${id}`,{method:"DELETE"});
        if(!response.ok) console.error("error al borrar cama");
        await setBeds(Beds.filter((value)=> value.id !==id));
    }

    //funcion que al ser activada, actualiza el formulario de registro.
    const onSelect = (newValue) => {
        setValues({
            ...newValue, 
            urlError: false,
            dateError: false,
        });
    };

    


  return (
    <div className="box">
        <div className="box-title">
            <p>Registros: Camas</p>
        </div>
        <table>
            <thead>
                <tr>
                    <th>Recibo</th>
                    <th>Fecha de compra</th>
                    <th>Categoria</th>
                    <th>Modificar</th>
                    <th>Borrar</th>
                </tr>
            </thead>
            <tbody>
                {Beds.map((bed)=>(
                    <tr key={bed.id}>
                        <td> <img src={bed.url} alt="" /><br /> <a href={bed.url}>abrir</a> </td>
                        <td> {bed.date} </td>
                        <td>
                            Identificador: { bed.bedCategory.id} <br />
                            { bed.bedCategory.kind } <br /> 
                            { bed.bedCategory.measure} <br />
                            { bed.bedCategory.color }
                        </td>
                        
                        <td>
                            <button
                                onClick={(event)=>{
                                    event.preventDefault();
                                    onSelect({
                                    id:bed.id,
                                    date:bed.date,
                                    url:bed.url,
                                    badCategoryId:bed.bedCategory.id
                                    })
                                }}
                            >
                                Editar
                            </button>
                        </td>
                        <td>
                            <form onSubmit={(event)=> {
                                event.preventDefault();
                                onDelete(event,bed.id);
                            }}>
                            <button type='submit'>Eliminar</button>
                            </form>
                        </td>
                    </tr>
                ))
                }
            </tbody>
        </table>
    </div>
  )
}

/*
ShowBeds.propTypes = {
    beds: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        date: PropTypes.Da
      })
    ).isRequired,
  };^*/