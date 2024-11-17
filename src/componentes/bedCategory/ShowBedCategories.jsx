import React from 'react'
import PropTypes from 'prop-types';

export const ShowBedCategories = ({list,  setValues,setbedCategories}) => {

  const onDelete = async (event, id) => {
    try {
        event.preventDefault();
        const url = `http://localhost:8090/api/categories/delete/${id}`;
        const response = await fetch(url, { method: "DELETE" });
        if (!response.ok)throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
        setbedCategories(list.filter((value) => value.id !== id));
    } catch (error) {
        console.error("Error al eliminar la categoría:", error.message);
    }
  };

  const onSelect =  (newValue) => {
    console.log({...newValue,
      kindError: false,
      measureError:false,
      urlErrror:false,
      colorError:false,
      fetchError:''});
        
        setValues({...newValue,
          kindError: false,
          measureError:false,
          urlErrror:false,
          colorError:false,
          fetchError:''});
    
  };

    
  return (
    <div className="box">
      <div className="box-title">
        <p>Registros: Tipo de camas</p>
      </div>
      <table>
        <thead>
          <tr>
            <th>Tipo de cama</th>
            <th>Medidas</th>
            <th>Color</th>
            <th>Imagen</th>
            <th>Modificar</th>
            <th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {list.map((category) => (
            <tr key={category.id}>
              <td>{category.kind}</td>
              <td>{category.measure}</td>
              <td>{category.color}</td>
              <td><img src={category.url} alt={category.kind} /></td>
              <td> 
              <button
                onClick={() =>
                  onSelect({
                    id: category.id,
                    kind: category.kind,
                    measure: category.measure,
                    color: category.color,
                    url: category.url
                  })
                }
              >
                Editar
              </button>
              </td>

              <td> 
                <form
                    onSubmit={(event) => {
                      event.preventDefault(); // Previene el comportamiento por defecto del formulario.
                      onDelete(event, category.id); // Llama a `onDelete` pasando el evento y el ID.
                    }}
                  >
                  <button type="submit">Eliminar</button>
                </form>
          
              </td>
            </tr>
          ))}
        </tbody>
        
      </table>
    </div>
  )
}
ShowBedCategories.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      kind: PropTypes.string.isRequired,
      measure: PropTypes.string.isRequired,
      color: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
};