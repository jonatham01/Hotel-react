import React, { useState , useEffect} from 'react'
import '../admin-panel.css';
import useForm from '../../hooks/useForm';
import {ShowBeds} from './ShowBeds';
import {CreateBed} from './CreateBed';

export const BedComponent = () => {

    const url = 'http://localhost:8090/api/beds'
    const emptyForm = {
        id: null,
        url:"",
        date:"", //Date.now
        badCategoryId:"",
        urlError:false,
        dateError: false
    };
    const [Beds, setBeds] = useState([]);
    const [bedCategories, setbedCategories] = useState([]);
    const [formValues, handleChange, setValues] = useForm({
        id: null,
        url:"",
        date:null, //Date.now
        badCategoryId:'',
        urlError:false,
        dateError: false
    });

    const findBeds= async() => {
        const response = await fetch(`${url}/find/all`);
        if(!response.ok) {throw new Error("Error en la solicitud");}
        const loadedBeds = await response.json();
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
        const fetchData = async () => {
            if (Beds.length === 0) await findBeds();  
            if (bedCategories.length === 0) await findCategories();
        };
        fetchData();
    }, []); 

    const updateBed = async (id, newBed) => {
        try {
            const response = await fetch(`${url}/put/${id}`, {
                headers: { "content-type": "application/json" },
                method: "PUT",
                body: JSON.stringify(newBed),
            });
            if (!response.ok) throw new Error(`Error al actualizar cama: ${response.status}`);
            const updatedBed = await response.json(); 
            setBeds((data) =>
                data.map((bed) => {
                    if (bed.id === id) {
                        return updatedBed; 
                    }
                    return bed;  
                })
            );
            setValues(emptyForm);
        } catch (error) {
            console.error("Error encontrado: ", error.message);
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
                    <CreateBed
                        setBeds={setBeds}
                        formValues={formValues} 
                        setValues={setValues}
                        handleChange={handleChange} 
                        emptyForm={emptyForm}
                        bedCategories={bedCategories}
                        url={url}
                        updateBed={updateBed}
                    />
                    <ShowBeds 
                        url={url}
                        setBeds={setBeds}
                        Beds={Beds}
                        setValues={setValues}
                        bedCategories={bedCategories}
                    />
                </div>
            </main>

        </div>
    </>
  )
}
