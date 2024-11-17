import React, { useState , useEffect} from 'react'
import { CreateBedCategory } from './CreateBedCategory';
import { ShowBedCategories } from './ShowBedCategories';
import '../admin-panel.css';
import useForm from '../../hooks/useForm';

export const BedCategory = () => {

    const [bedCategories, setbedCategories] = useState([]);
    //utilizamos el hook para manejar los useState de cada parte del formulario
    const [formValues, handleChange,setValues] = useForm({
        id:null,
        kind: "", //tipo de cama
        measure: "", //medidas
        url: "",  //url de la imagen
        color: "",  //especifica los colores
        kindError: false,
        measureError:false,
        urlErrror:false,
        colorError:false,
        fetchError:''
    });
    const [classValue,  setclassValue] = useState({
        'okd' : 's',
        'tipo-habitaciones':'ok'
    })
    const param = "tipo-habitaciones";
   // if(param=="tipo-habitaciones") setclassValue(classValue);

   const findCategories = async () => {
    const url = `http://localhost:8090/api/categories/find/all`; 
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la solicitud");
    const data = await response.json();
    setbedCategories(data); // Actualiza el estado directamente con los datos
};

    useEffect(() => {
        // Ejecuta findCategories solo si bedCategories está vacío
        if (bedCategories.length === 0) {
            findCategories();
        }
    }, []);

    const onUpdate = async (id, newValue) => {
        try {
            console.log(newValue);
            const url = `http://localhost:8090/api/categories/put/${id}`;
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(newValue)
            });
            console.log(response);
    
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            
            const updatedBedCategory = await response.json();
            console.log("respuesta");
            console.log(updatedBedCategory);
    
            // Aquí aseguramos que actualizamos correctamente el estado con el nuevo objeto actualizado
            setbedCategories(bedCategories.map(bedCategory => 
                bedCategory.id === id ? updatedBedCategory : bedCategory
            ));
        } catch (error) {
            console.error("Error al modificar la categoría:", error.message);
        }
    };

    
       
    
    return (
        <>
        <header className='top-menu'>
            <p className='web-name'>Hotel-manager</p>
            <div className="options-right">
                <p>Admin</p>
                <p>Sitio web</p>
                <div className='user'>
                    <p>Jonathan</p>
                    <p>Admin</p>
                </div>
            </div>
        </header>

        <div className="content">
            <header className="left-menu">
                    <p >Panel</p>
                    <p >Tipo de camas</p>
                    <p>Camas</p>
                    <p>Habitaciones</p>
                    <p className='on-left-menu'>Tipo de habitaciones</p>
                
            </header>

            <main>
                <div className="main-content">
                    <CreateBedCategory  
                    onCreate={setbedCategories} 
                    formValues={formValues} 
                    setValues={setValues} 
                    handleChange={handleChange}
                    onUpdate={onUpdate} 
                    />
                    <ShowBedCategories list={bedCategories}  setValues={setValues} setbedCategories={setbedCategories} />
                </div>
            </main>
        </div>
        
        </>
    )
} 
