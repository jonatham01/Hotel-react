import React, { useState , useEffect} from 'react'
import { CreateBedCategory } from './CreateBedCategory';
import { ShowBedCategories } from './ShowBedCategories';
import '../admin-panel.css';
import useForm from '../../hooks/useForm';

export const BedCategory = () => {

    //manejar del estado del listado todas las categorias
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

   const findCategories = async () => {
    const url = `http://localhost:8090/api/categories/find/all`; 
    const response = await fetch(url);
    if (!response.ok) throw new Error("Error en la solicitud");
    const data = await response.json();
    // Actualiza el estado directamente con los datos
    setbedCategories(data); 
    };


    // Ejecuta findCategories solo si bedCategories está vacío
    useEffect(() => {  
        if (bedCategories.length === 0) {
            findCategories();
        }
    }, []);


    //metodo para actualizar el tipo de cama en la bd
    const onUpdate = async (id, newValue) => { 
        try {
            const url = `http://localhost:8090/api/categories/put/${id}`;
            const response = await fetch(url, {
                headers: {
                    "Content-Type": "application/json",
                },
                method: "PUT",
                body: JSON.stringify(newValue)
            });
            if (!response.ok) throw new Error(`Error en la solicitud: ${response.status} ${response.statusText}`);
            const updatedBedCategory = await response.json();
        
            setbedCategories(bedCategories.map(bedCategory => 
                bedCategory.id === id ? updatedBedCategory : bedCategory
            ));
            setValues({...formValues,id:null});
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
                <p className='on-left-menu'><Link className='no-underline' to="/">Panel</Link></p>
                <p ><Link className='no-underline' to="/tipocamas">Tipos de camas</Link></p>
                <p><Link className='no-underline' to="/camas">Camas</Link></p>
                <p>Habitaciones</p>
                <p ><Link className='no-underline' to="/tipohabitaciones">Tipos de habitaciones</Link></p>
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
