import React, { useState , useEffect} from 'react'
import '../admin-panel.css';
import useForm from '../../hooks/useForm';

export const BedComponent = () => {

    const url = 'http://localhost:8090/api/beds/'
    const emptyForm = {
        id: null,
        url:'',
        date:null, //Date.now
        urlError:false,
        dateError: false
    };
    const [Beds, setBeds] = useState([]);
    const [bedCategories, setbedCategories] = useState([]);
    const [formValues, handleChange, setValues] = useForm(emptyForm);

    const findBeds= async() => {
        const response = await fetch(`${url}/find/all`);
        if(!response.ok) throw new Error("Error en la solicitud");
        const loadedBeds = response.json;
        setBeds(loadedBeds);
    }
    const findCategories = async () => {
        const url = `http://localhost:8090/api/categories/find/all`; 
        const response = await fetch(url);
        if (!response.ok) throw new Error("Error en la solicitud");
        const data = await response.json();
        // Actualiza el estado directamente con los datos
        setbedCategories(data); 
    };

    useEffect(() => {
      if(Beds.length === 0) findBeds();  
      if(bedCategories.length === 0) findCategories();  
    }, [])

    updateBed = async(id, newBed) => {
        try{
            //realizamos peticion http
            const response = await fetch(
                `${url}/put/${id}`, {
                    headers: {"content-type":"application/json"},
                    method:"PUT",
                    body: JSON.stringify(newBed)
                }
            );
            if(!response.ok)throw new Error(`Error al actualizar cama: ${response.status}`);
            const updatedBed = response.json;
            setBeds(Beds.map(bed => {
                bed.id === id ? updatedBed : bed
            }));
            setValues({...formValues,id:null});
        }catch(error){
            console.error("Error encontrado: ",error.message);
        }
    }
    

  return (
    <div>BedComponent</div>
  )
}
