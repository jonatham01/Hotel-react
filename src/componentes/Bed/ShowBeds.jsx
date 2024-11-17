import React from 'react'
import PropTypes from 'prop-types'

export const ShowBeds = ({url,setBeds,Beds, setValues}) => {

    onDelete = async(event,id) =>{
        event.preventDefault();
        const response = fetch(`${url}/delete/${id}`);
        if(!response.ok) console.error("error al borrar cama");
        setBeds(Beds.filter((value)=> value.id !==id));
    }

    //funcion que al ser activada, actualiza el formulario de registro.
    onSelect = (newValue) => {
        setValues({...newValue, 'urlError':false,'dateError':false});
    }


  return (
    <div>ShowBeds</div>
  )
}


ShowBedCategories.propTypes = {
    beds: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        url: PropTypes.string.isRequired,
        date: PropTypes.date.isRequired
      })
    ).isRequired,
  };